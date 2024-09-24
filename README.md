# @uniswap/merkle-distributor

[![Tests](https://github.com/Uniswap/merkle-distributor/workflows/Tests/badge.svg)](https://github.com/Uniswap/merkle-distributor/actions?query=workflow%3ATests)
[![Lint](https://github.com/Uniswap/merkle-distributor/workflows/Lint/badge.svg)](https://github.com/Uniswap/merkle-distributor/actions?query=workflow%3ALint)

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

## Generate Merkle Tree

`npx ts-node  scripts/generate-merkle-root.ts -i "input-json-file" -s "seed" -n "number-of-addresses`

## Deploy Merkle distributor

First, set-up the configuration variables using Harhad:

`npx hardhat vars set XXX_PRIVATE_KEY`

`npx hardhat vars get XXX_RPC_URL`

Note: Replace `XXX` above with either `TENDERLY` or `ETH` depending on where you want to deploy. This is done in order to be explicit and to avoid mixing keys.

Deploy the `MerkleDistributor` contract:
 - 1st param: the address of the token to be airdropped
 - 2nd param: the merkleRoot hash
 - --network param: can be either `tenderly` or `mainnet`

`npx hardhat deployMerkleDistributor 'tokenAddress' 'merkleHash' --network 'targetNetwork'`

