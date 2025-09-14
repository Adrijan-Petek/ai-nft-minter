import { ethers } from "hardhat";
import { run } from "hardhat";

async function main() {
  console.log("Deploying AIArtNFT contract...");

  const AIArtNFT = await ethers.getContractFactory("AIArtNFT");
  const aiArtNFT = await AIArtNFT.deploy();

  await aiArtNFT.deployed();

  console.log(`AIArtNFT deployed to: ${aiArtNFT.address}`);

  // Verify contract on Etherscan (for Sepolia)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract on Etherscan...");
    try {
      await run("verify:verify", {
        address: aiArtNFT.address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});