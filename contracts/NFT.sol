// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint public tokenIdCounter;

    constructor() ERC721("MyNFT" , "MNFT") {}

    function mint() external {
        _safeMint(msg.sender , tokenIdCounter);
        tokenIdCounter++;
    }
}