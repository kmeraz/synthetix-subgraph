
const snx = require('synthetix')

const contractsToLoad = {
  'Exchanger': { type: 'exchanger', version: 0 },
  'ProxyERC20': { type: 'synthetix', target: 'Synthetix', version: 0 }
}

const filterContractsToLoad = name => !!contractsToLoad[name]

const exports2 = Object.values(
  snx.getVersions({
    network: 'mainnet',
  })
)
.filter(version => {
  if(!version.block) {
    console.error(version.tag + ' is missing `block`')
    return false
  }
  return true
})
.map(({ contracts, block }) => {
  // Filter only contracts we track.
  return Object.entries(contracts)
    .filter(([contractName,]) => !!contractsToLoad[contractName])
    .map(([ contractName, contract ]) => {
      const { address } = contract

      let info = contractsToLoad[contractName]
      let name = info.target ? info.target : contractName
      if (info.version > 0) {
        name += `_v${info.version}`
      }
      info.version += 1

      return {
        prod: block,
        test: null,
        type: info.type,
        name: `${name}`,
        address: `'${address}'`,
      }
    })
})
.flat()

// console.log(exports2)

module.exports = [
  {
    prod: 10557958,
    test: null,
    type: 'exchanger',
    name: 'Exchanger',
    address: "'0x439502C922ADA61FE49329248B7A8ecb31C0b329'",
  },
  {
    prod: 10772592,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v2',
    address: "'0x1d53a13D78766C0Db6eF73eC0ae1138eA2b6f5D4'",
  },
  {
    prod: 11012438,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v3',
    address: "'0xc4942df0d3c561c71417BBA09d2DEA7a3CC676Fb'",
  },
  {
    prod: 11239644,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v4',
    address: "'0x300F0f100389282b51F1Bc486D8c2ad22B6C4E42'",
  },
  {
    prod: 11247235,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v5',
    address: "'0xd3970a9D35d2Be3aaf62D2b5B2be3Ee303aC4228'",
  },
  {
    prod: 11363405,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v6',
    address: "'0x93b434b2e21d0F4E3ed1e9efa3Aa254A6D863B2A'",
  },
  {
    prod: 11513107,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v7',
    address: "'0x0bfDc04B38251394542586969E2356d0D731f7DE'",
  },
  {
    prod: 12286894,
    test: null,
    type: 'exchanger',
    name: 'Exchanger_v8',
    address: "'0x585fD19eBa8F1a81F37C5eb322FD4b8D911367e8'",
  },
  {
    prod: 10782000,
    test: null,
    type: 'synthetix',
    name: 'Synthetix',
    address: "'0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'",
  },
];
