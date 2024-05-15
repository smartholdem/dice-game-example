const {Transactions, Managers, Utils} = require("@smartholdem/crypto");
const {Connection} = require("@smartholdem/client");

const client = new Connection("https://node1.smartholdem.io/api");
Managers.configManager.setFromPreset("mainnet");
Managers.configManager.setHeight(1000000);


async function start() {

}


await start();
