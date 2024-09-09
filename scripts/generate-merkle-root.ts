import { program } from 'commander'
import fs from 'fs'
import { parseBalanceMap } from '../src/parse-balance-map'
import { keccak256 } from 'ethereumjs-util'
import { utils } from 'ethers'

const sfc32 = (a: number, b: number, c: number, d: number) => () => {
  a = a | 0
  b = b | 0
  c = c | 0
  d = d | 0
  const t = (a + b | 0) + d | 0
  d = d + 1 | 0
  a = b ^ b >>> 9
  b = c + (c << 3) | 0
  c = (c << 21) | (c >>> 11)
  c = c + t | 0
  return (t >>> 0) / 4294967296
}

program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing a map of account addresses to string balances')
  .requiredOption(
    '-s, --seed <number>',
    'You must sepcify a random seed!'
  )
  .requiredOption(
    '-n, --num <number>',
    'You must sepcify the number random addresses!'
  )

program.parse(process.argv)

const scalingFactor1: number = 0xffffffffffffffffff; // this is a multiplier to shift the decimal part and get a large integer number

// generate the pseudo-random number by providing the given seed
const initSeed = utils.solidityKeccak256(['uint256'], [program.seed]);
if (initSeed.length !== 66) throw new Error('Invalid hash length');

//slice the string to get 4 different init seeds for the rng algorithm
const seed1 = initSeed.slice(2,18); //skip "0x"
const seed2 = initSeed.slice(18, 34);
const seed3 = initSeed.slice(34, 50);
const seed4 = initSeed.slice(50, 66);

// get the pseudo-random number
const getRand = sfc32(parseInt(seed1, 16), parseInt(seed2, 16), parseInt(seed3, 16), parseInt(seed4, 16));

let json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }))
if (typeof json !== 'object') throw new Error('Invalid JSON')

console.log("Addresses generated:");

for(let i=0; i < program.num; i++) {
  const ranNum = getRand() * scalingFactor1 // use a scaling factor because we get a float
  const ranNumBig = BigInt(ranNum); // cast into a BigInt
  const keccacHash = utils.solidityKeccak256(['uint256'], [ranNumBig]);
  console.log(utils.solidityKeccak256(['uint256'], [keccacHash]));
  const slice = keccacHash.slice(0,42); // get the first 20 bytes + the 0x prefix
  json[slice] ="0"; // insert to json; the token amount must be 0
}

// check again
if (typeof json !== 'object') throw new Error('Invalid JSON')
console.log(JSON.stringify(parseBalanceMap(json)))

// update the json with the new addresses
fs.writeFileSync(program.input, JSON.stringify(json, null, "\t"), { encoding: 'utf8' });
