/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "./tasks/deployMerkleDistributor";
import { vars } from "hardhat/config";

export default {
  solidity: {
    compilers: [
      {
        version: '0.6.11',
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 200,
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
      chainId: vars.has("TENDERLY_CHAIN_ID") ? parseInt(vars.get("TENDERLY_CHAIN_ID")) : 1,
      url: vars.has("TENDERLY_RPC_URL") ? vars.get("TENDERLY_RPC_URL") : "",
      accounts: vars.has("TENDERLY_PRIVATE_KEY") ? [vars.get("TENDERLY_PRIVATE_KEY")] : [],
    },
    mainnet: {
      url: vars.has("ETH_RPC_URL") ? vars.get("ETH_RPC_URL") : "",
      accounts: vars.has("ETH_PRIVATE_KEY") ? [vars.get("ETH_PRIVATE_KEY")] : [],
    },
  },
}