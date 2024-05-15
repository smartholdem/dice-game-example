# Dice Game Web3 example NodeJS on SmartHoldem blockchain

Simple example dice game on SmartHoldem blockchain

## Requirements 
- NodeJS 18+
- OS Windows, Linux or MacOS

## Rules for players

Double your bet by guessing a random number, less than 127 or greater than 128.
The game does not have its own UI and works through the SmartHoldem wallet.

To participate in the game, simply send a bet from 2 to 500 to the game bank address SRcse8VH9uqC4DterMfghvtaHdLhHJ9Gi2 and 
set memo with one symbol + (plus) equivalent > 128 or - (minus) equivalent < 127.
the bet is played in the block in which your transaction fell.

- min bet 1 STH
- max bet 500 STH
- symbol - = <127
- symbol + = >128 (example memo https://explorer.smartholdem.io/#/transaction/22de7a868deb6f97ffd158d608d5806dc7f8c52529bfc66f2c37375c8d7c02d1)

# Verify

To check the blockchain random winning number you can also use https://hasher.smartholdem.io/#/hex-to-bytes

Just copy the Block ID of your transaction is example https://explorer.smartholdem.io/#/transaction/22de7a868deb6f97ffd158d608d5806dc7f8c52529bfc66f2c37375c8d7c02d1

Block ID 8eed48eeeef803c10c7107f89cbaf76efa6aae500ad3bf2378919afc70f5eef8

and paste hash in https://hasher.smartholdem.io/#/hex-to-bytes

the first number received is the result of the drawing, example 142

## How it works for developers
- Random numbers are produced by the blockchain as a hexadecimal block hash sequence
- git clone https://github.com/smartholdem/dice-game-example.git
- rename config.json.example to config.json
- enter in config.json your gameBankAddress SmartHoldem Address example: SRcse8VH9uqC4DterMfghvtaHdLhHJ9Gi2
- enter gameBankSecret phrase for Game Bank Address in config.json
