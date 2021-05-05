// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (uint256 => string) private _colors;
    mapping (string => bool) private _colorExists;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI, string memory color)
        public onlyOwner
        returns (uint256)
    {
        require(!_colorExists[color]);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _colors[newItemId] = color;
        _colorExists[color] = true;

        return newItemId;
    }

    function colorOf(uint256 tokenId) 
        public view
        returns (string memory)
    {
        return _colors[tokenId];
    }
}