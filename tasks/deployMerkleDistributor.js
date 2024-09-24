import "@nomiclabs/hardhat-ethers";

async function deployMerkleDistributor(tokenAddress, merkleRoot) {
  const MerkleDistributor = await ethers.getContractFactory('MerkleDistributor')
  const merkleDistributor = await MerkleDistributor.deploy(
    tokenAddress,
    merkleRoot
  )
  await merkleDistributor.deployed()
  console.log(`merkleDistributor deployed at ${merkleDistributor.address}`)
}

task("deployMerkleDistributor", "Deploys the Merkle distributor contract")
  .addPositionalParam("tokenAddress", "The airdropped token address")
  .addPositionalParam("merkleRoot", "The merkle root hash")
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile");
    await deployMerkleDistributor(taskArgs.tokenAddress, taskArgs.merkleRoot).catch(async (error) => {
      console.error(error);
      process.exitCode = 1;
  })
});