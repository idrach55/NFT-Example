const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

let MyNFT;
let contract;
let owner;
let addr1;
let addr2;
let addrs;

// `beforeEach` will run before each test, re-deploying the contract every
// time. It receives a callback, which can be async.
/*
beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    MyNFT = await ethers.getContractFactory("MyNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been mined.
    contract = await MyNFT.deploy();
});
*/

describe("MyNFT", function() {
    it("deploys successfully", async () => {
        MyNFT = await ethers.getContractFactory("MyNFT");
        contract = await MyNFT.deploy();

        await contract.deployed();
        expect(await contract.symbol()).to.equal("NFT");
    });
    it("mints successfully", async () => {
        const response = await contract.mintNFT("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "", "#FFFFFF");
        
        const supply = await contract.totalSupply()
        expect(String(supply)).to.equal("1");

        const owner = await contract.ownerOf(1)
        expect(String(owner).toLowerCase()).to.equal("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
        expect(await contract.colorOf(1)).to.equal("#FFFFFF");
    })
    it("keeps colors unique", async () => {
        await expect(contract.mintNFT("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "", "#FFFFFF")).to.be.rejectedWith(Error);
    })
});