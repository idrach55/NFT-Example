async function main() {
    // We get the contract to deploy
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const contract = await MyNFT.deploy();

    console.log("MyNFT deployed to:", contract.address);
}
  
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });