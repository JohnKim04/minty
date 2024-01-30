// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender){
        _tokenIdCounter = 0;
    }

    function safeMint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        console.log("Attempting to mint NFT to %s by %s", recipient, msg.sender);
        uint256 newItemId = _tokenIdCounter++;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        console.log("Successfully minted NFT #%d to %s", newItemId, recipient);

        return newItemId;
    }
}
