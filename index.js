const {Transactions, Managers, Utils} = require("@smartholdem/crypto");
const {Connection} = require("@smartholdem/client");
const jsonReader = require("jsonfile");
const axios = require('axios');
const {Buffer} = require("node:buffer");
const config = jsonReader.readFileSync('./config.json');
let successTransactions = jsonReader.readFileSync('./successTxs.json'); // load old transactions
// init blockchain connection
const client = new Connection("https://node1.smartholdem.io/api");
Managers.configManager.setFromPreset("mainnet");
Managers.configManager.setHeight(1000000);


let lastTxs = {};
let txTimer = null;

// transfer amount to winner
async function txTransfer(payload) {
    const txs = [];
    const senderWallet = await client.api("wallets").get(payload.sender);
    const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);
    const transaction = Transactions.BuilderFactory.transfer()
        .fee((1e8 * 1).toString()) // fee
        .version(2)
        .nonce(senderNonce.toFixed()) // nonce
        .recipientId(payload.recipientId) // winner address
        .amount((payload.amount * 1e8).toFixed(0)) // amount win
        .vendorField(payload.memo) // message for winner
        .sign(config['gameBankSecret']); //
    txs.push(transaction.build().toJson());
    console.log('Prepared tx', txs[0]);
    let broadcastResponse = {};
    try {
        broadcastResponse = (await client.api("transactions").create({transactions: txs})).body.data;
    } catch (e) {
        console.log("err: tx send");
    }
    return broadcastResponse;
}

async function getTransactions() {
    let result = null;
    try {
        result = (await axios.get('https://node0.smartholdem.io/api/transactions?recipientId=' + config['gameBankAddress'] + '&page=1&limit=50&type=0')).data.data;
    } catch (e) {
        console.log('err get transactions')
    }
    return result;
}

async function calcRNG(blockId) {
    return (await Uint8Array.from(Buffer.from(blockId, 'hex')));
}

// Game Start
async function start() {
    let txs = [];
    clearInterval(txTimer);
    txTimer = setInterval(async () => {
        const walletTransactions = await getTransactions();
        for (let i = 0; i < walletTransactions.length; i++) {
            // if gaming transaction & new transaction
            if ((walletTransactions[i].vendorField === '127' || walletTransactions[i].vendorField === '128') && !successTransactions[walletTransactions[i].id]) {
                const rngResult = (await calcRNG(walletTransactions[i].blockId))[0];
                let isWin = walletTransactions[i].vendorField === '127' ? rngResult < 127 : rngResult > 128;
                const amountWin = isWin ? (walletTransactions[i].amount / 1e8 * 2) - 1 : 0; // win x2, -1 STH Fee
                const tx = {
                    txId: walletTransactions[i].id,
                    blockId: walletTransactions[i].blockId,
                    playerAddress: walletTransactions[i].sender,
                    amount: walletTransactions[i].amount / 1e8,
                    bet: walletTransactions[i].vendorField,
                    randomNumber: rngResult,
                    isWin: isWin,
                    amountWin: amountWin,
                };
                successTransactions[tx.txId] = tx;
                jsonReader.writeFileSync('./successTxs.json', successTransactions, ); // save old results in file
            }
        }
        console.log('new txs', txs);
        txs = [];
    }, 10000)
}


start();
