const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const nftAddress = "0x15B8092db1a9fBB4001c46eD2a191E764C1Ab59f";

  const nft = await hre.ethers.getContractAt("MyNFT", nftAddress);

  const tx = await nft.mint();
  await tx.wait();

  console.log("NFT minted by:", deployer.address);
}

main().catch((error) => {
  console.error("Minting failed:", error);
  process.exitCode = 1;
});
