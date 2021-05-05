import './App.css';
import { useEffect, useState } from "react";
import { connectWallet } from "./util/interact.js";

const Minter = (props) => {
    const [isConnected, setConnectedStatus] = useState(false);
    const [walletAddress, setWallet] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

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
        setStatusMsg(walletResponse.statusMsg);
        if (isConnected) {
            setWallet(walletAddress);

            // TOOD: The below isn't working.
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log("Account change!");
            });
            window.ethereum.on("disconnect", onDisconnect);
        }
    };

    const onDisconnect = async (error) => {
        setConnectedStatus(false);
        setStatusMsg("(!) Connect to Metamask using the top right button.");
        setWallet("");
    }

    const onMintPressed = async () => {
        /*
        const { success, status } = await mintNFT(url, name, description);
        setStatus(status);
        setConnectedStatus(success)
        if (success) {
            setName("");
            setDescription("");
            setURL("");
        }
        */
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
        <p id="statusMsg" style={{ color: "red" }}>
        {statusMsg}
        </p>
    </div>
    );
};

export default Minter;
