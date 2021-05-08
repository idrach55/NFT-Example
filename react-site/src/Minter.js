import './App.css';
import { useEffect, useState } from "react";
import { connectWallet, mintNFT } from "./util/interact.js";

const Minter = (props) => {
    const [isConnected, setConnectedStatus] = useState(false);
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [txLink, setTxLink] = useState("");
    const [color, setColor] = useState("");


    useEffect(async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({method: "eth_accounts"})
                if (accounts.length) {
                    setConnectedStatus(true);
                    setWallet(accounts[0]);
                } else {
                    // User rejects Metamask connection.
                    setConnectedStatus(false);
                }
            } catch {
                // Metamask not detected.
                setConnectedStatus(false);
            }
        }
    });

    const connectWalletPressed = async () => {
        if (isConnected) return;

        const walletResponse = await connectWallet();
        setConnectedStatus(walletResponse.connectedStatus);
        setStatus(walletResponse.status);
        if (isConnected) {
            setWallet(walletAddress);

            // TOOD: The below isn't working.
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log("Account change!");
            });
        }
    };

    const onMintPressed = async () => {
        const { success, status } = await mintNFT(color);
        if (success) {
            setColor("");
            setTxLink(status);
        } else {
            setStatus(status);
        }
    };

    return (
    <div className="Minter">
        <button id="walletButton" onClick={connectWalletPressed}>
            {isConnected ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
            ) : (
            <span>Connect Wallet</span>
            )}
        </button>

        <br></br>
        <h1 id="title">Hyperworks NFT Minter</h1>
        <p>
        Simply add your asset's color, then press "Mint."
        </p>
        <form>
            <h2>Color: </h2>
            <input
                type="text"
                placeholder="e.g. #FFAA00"
                onChange={(event) => setColor(event.target.value)}
            />
        </form>
        <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
        </button>
        <p id="status" style={{ color: "red" }}>
        {status}
        </p>
        {txLink != "" ? (
        <p>
        Check out your transaction on <a href={"https://ropsten.etherscan.io/tx/" + txLink} target="_blank">Etherscan</a>
        </p>
        ) : (
        <p></p>
        )}
    </div>
    );
};

export default Minter;
