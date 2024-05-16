# Dice Game Web3 example NodeJS on SmartHoldem blockchain

Simple example dice game on SmartHoldem blockchain.

## What does this example demonstrate?

- no centralized server or static IP required
- no vulnerable smart contracts
- connection to the blockchain
- storage of game statistics
- selection of winners
- getting a random number from the blockchain
- sending STH to the winner
- receiving game transactions

## Requirements 
- NodeJS 18+
- OS Windows, Linux or MacOS

## Rules for players

Double your bet by guessing a random number, less than 127 or greater than 128.
The game does not have its own UI and works through the SmartHoldem wallet https://wallet.smartholdem.io

To participate in the game, simply send a bet from 2 to 500 to the game bank address `SRcse8VH9uqC4DterMfghvtaHdLhHJ9Gi2` and 
set memo with one symbol `+` (plus) equivalent > 128 or `-` (minus) equivalent < 127.
the bet is played in the block in which your transaction fell.

- min bet 2 STH
- max bet 500 STH
- symbol `-` = <127
- symbol `+` = >128 (example with memo https://explorer.smartholdem.io/#/transaction/22de7a868deb6f97ffd158d608d5806dc7f8c52529bfc66f2c37375c8d7c02d1)

- Dice trtansactions in https://wallet.smartholdem.io

![dice-tx](https://github.com/smartholdem/dice-game-example/assets/9394904/687fb180-110e-4185-b7ad-cc60190632f5)

- bet 10 STH on number < 127 from wallet

![dice-127](https://github.com/smartholdem/dice-game-example/assets/9394904/44ffc3ea-b747-45a1-a3d4-89e6a4af82f2)

- bet 10 STH on number > 128 from wallet

![dice-128](https://github.com/smartholdem/dice-game-example/assets/9394904/31133e56-b990-40c1-8e45-aea5cd0d5fd0)


# Verify

To check the blockchain random winning number you can also use https://hasher.smartholdem.io/#/hex-to-bytes

Just copy the Block ID of your transaction is example https://explorer.smartholdem.io/#/transaction/22de7a868deb6f97ffd158d608d5806dc7f8c52529bfc66f2c37375c8d7c02d1

Block ID `8eed48eeeef803c10c7107f89cbaf76efa6aae500ad3bf2378919afc70f5eef8`

and paste hash in https://hasher.smartholdem.io/#/hex-to-bytes

the first number received is the result of the drawing, example `142`

## How it works for developers
- Random numbers are produced by the blockchain as a hexadecimal block hash sequence
- Every 10 seconds the application checks for new game transactions
- rename config.json.example to config.json
- enter in config.json your gameBankAddress SmartHoldem Address example: SRcse8VH9uqC4DterMfghvtaHdLhHJ9Gi2
- enter gameBankSecret phrase for Game Bank Address in config.json for payments winners
- file successTxs.json stores old transactions to avoid duplication

Run:
```
git clone https://github.com/smartholdem/dice-game-example.git
cd dice-game-example
npm install
node index.js
```

Run in background mode:
```
npm install -g forever
forever start index.js
forever list
forever stop index.js // stop script
```
