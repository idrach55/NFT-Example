import detectEthereumProvider from '@metamask/detect-provider';

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

//const contractABI = require('..//MyNFT.json')
//const contractAddress = "0x0C03E84aceB83Dbd2F4f75D43AE23ff96851F9d7";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

// New Metamask connection logic.
export const connectWallet = async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum

        // Access the decentralized web!
        console.log('Ethereum successfully detected!');

        try {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            console.log('Connected to wallet at ' + accounts[0]);
            return {
                connectedStatus: true,
                statusMsg: "",
                address: accounts
            }
        } catch(err) {
            return {
                connectedStatus: false,
                statusMsg: "(!) Connect to Metamask using the button on the top right."
            }
        } 
    } else {
        // If the provider is not detected, detectEthereumProvider resolves to null.
        return {
            connectedStatus: false,
            statusMsg: "(!) You must install Metamask into your browser: https://metamask.io/download.html"
        }
    }
}

async function loadContract() { 
    //return new web3.eth.Contract(contractABI, contractAddress);
};