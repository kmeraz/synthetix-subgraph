const fs = require('fs');
const path = require('path');

const includedSubgraphs = fs.readdirSync(path.join(__dirname, '../subgraphs')).reduce((acc, val) => {
  if (val.endsWith('.js') && val !== 'main.js') {
    acc.push(val.slice(0, -3));
  }
  return acc;
}, []);

const dataSources = {};
const templates = {};

for (const included of includedSubgraphs) {
  const def = require(`./${included}`);

  for (const ds of def.dataSources) {
    dataSources[ds.name] = ds;
  }

  if (def.templates) {
    for (const tl of def.templates) {
      templates[tl.name] = tl;
    }
  }
}

module.exports = {
  specVersion: '0.0.2',
  description: 'Synthetix Subgraph',
  repository: 'https://github.com/Synthetixio/synthetix-subgraph',
  schema: {
    file: './main.graphql',
  },
  dataSources: Object.values(dataSources),
  templates: Object.values(templates),
};
