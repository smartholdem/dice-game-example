const {Transactions, Managers, Utils} = require("@smartholdem/crypto");
const {Connection} = require("@smartholdem/client");
const jsonReader = require("jsonfile");
const axios = require('axios');
let lastHeight = 0;
const config = jsonReader.readFileSync('./config.json');

// init blockchain connection
const client = new Connection("https://node1.smartholdem.io/api");
Managers.configManager.setFromPreset("mainnet");
Managers.configManager.setHeight(1000000);


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
        .sign(payload.secret); //
    txs.push(transaction.build().toJson());
    console.log('Prepared tx', txs[0]);
    let broadcastResponse = {};
    try {
        broadcastResponse = (await client.api("transactions").create({ transactions: txs })).body.data;
    } catch (e) {
        console.log("err: tx send");
    }
    return broadcastResponse;
}


// Game Start
async function start() {

}


await start();
