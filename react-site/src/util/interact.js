const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

//const contractABI = require('../contract-abi.json')
//const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 


export const connectWallet = async (onAccountChanged, onDisconnect) => {
    if (window.ethereum) {
        try {
            const address = await window.ethereum.enable();
            const obj = {
                status: true,
                statusMsg: "",
                address: address
            }
            window.ethereum.on('accountsChanged', onAccountChanged);
            window.ethereum.on('disconnect', onDisconnect);
            return obj;
             
        } catch (error) {
            return {
                status: false,
                statusMsg: "(!) Connect to Metamask using the button on the top right."
            }
        }
        
      } else {
        return {
            status: false,
            statusMsg: "(!) You must install Metamask in your browser: https://metamask.io/download.html"
        }
      } 
};

async function loadContract() { 
    //return new web3.eth.Contract(contractABI, contractAddress);
};