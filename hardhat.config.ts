/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
require("./tasks/deployMerkleDistributor");

const { vars } = require("hardhat/config");

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      settings: {
        debug: {
          revertStrings: 'debug',
        },
      },
    },
    tenderly: {
      chainId: 1,
      url: vars.has("TENDERLY_RPC_URL") ? vars.get("TENDERLY_RPC_URL") : "",
      accounts: vars.has("TENDERLY_PRIVATE_KEY") ? [vars.get("TENDERLY_PRIVATE_KEY")] : [],
    },
    mainnet: {
      url: vars.has("ETH_RPC_URL") ? vars.get("ETH_RPC_URL") : "",
      accounts: vars.has("ETH_PRIVATE_KEY") ? [vars.get("ETH_PRIVATE_KEY")] : [],
    },
  },
}
