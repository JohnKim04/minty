import { expect } from "chai";
import { ethers } from "hardhat";

const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyNFT contract", function () {
  async function deployMyNFTFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const MyNFTFactory = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFTFactory.deploy();
    await myNFT.waitForDeployment();

    return { myNFT, owner, addr1, addr2 };
  }

  describe("Minting", function () {
    it("Allows the owner to mint an NFT", async function () {
      const { myNFT, owner } = await loadFixture(deployMyNFTFixture);
      const tokenURI = "https://example.com/nft";
      await myNFT.safeMint(owner.address, tokenURI);
      
      expect(await myNFT.tokenURI(0)).to.equal(tokenURI);
    });

    it("Prevents non-owners from minting", async function () {
      const { myNFT, addr1 } = await loadFixture(deployMyNFTFixture);
      const tokenURI = "https://example.com/nft";      

      await expect(myNFT.connect(addr1).safeMint(addr1.address, tokenURI)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Ownership", function () {
    it("Assigns the owner of minted NFT correctly", async function () {
      const { myNFT, owner } = await loadFixture(deployMyNFTFixture);
      const tokenURI = "https://example.com/nft";
      await myNFT.safeMint(owner.address, tokenURI);
      
      expect(await myNFT.ownerOf(0)).to.equal(owner.address);
    });
  });

  // Additional tests can be added here
});
