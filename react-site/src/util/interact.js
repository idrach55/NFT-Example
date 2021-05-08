import detectEthereumProvider from '@metamask/detect-provider';

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const contractABI = require('../MyNFT.json').abi
const contractAddress = "0x0C03E84aceB83Dbd2F4f75D43AE23ff96851F9d7";

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
                status: "",
                address: accounts
            }
        } catch(err) {
            return {
                connectedStatus: false,
                status: "(!) Connect to Metamask using the button on the top right."
            }
        } 
    } else {
        // If the provider is not detected, detectEthereumProvider resolves to null.
        return {
            connectedStatus: false,
            status: "(!) You must install Metamask into your browser: https://metamask.io/download.html"
        }
    }
}

async function loadContract() { 
    return new web3.eth.Contract(contractABI, contractAddress);
};

export const mintNFT = async(color) => {

    if (color.trim() == "") { 
        return {
            success: false,
            status: "(!) Please enter a color.",
        }
    }
  
    // Set up metadata.
    /*
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "(!) Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  
    */

    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    /*
    to: required except during contract publications.
    from: must match user's active address.
    */
    const transactionParameters = {
        to: contractAddress, 
        from: window.ethereum.selectedAddress, 
        'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, "", color).encodeABI()
    };
  
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "(!) Something went wrong: " + error.message
        }
    }
}