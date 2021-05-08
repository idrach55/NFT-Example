# Hardhat Networks
* Run locally on <b>hardhat</b> at http://127.0.0.1:8545. It has its own private keys which can be imported to Metamask to connect. 
* Run on <b>Ropsten</b> test net using Alchemy to connect. Don't use the Hardhat private key on here since it might have interference from other users. Create a new Metamask account and copy that private key to <code>.env.development.local</code>.

# Some routines to run
* <code>npx hardhat node</code> launches the local network.
* <code>npx hardhat console --network local</code> launches a console connected to the local network.
* <code>npx hardhat run scripts/deploy.js --network local</code> runs the contract deployment to the local network. Exclude the <code>--network</code> flag to use the default (ie Ropsten.)