const { validator, defaultVersion } = require('@hashgraph/nft-utilities');

const logoA = require('./meta-data/logo-a.json')
const logoB = require('./meta-data/logo-b.json')
const logoC = require('./meta-data/logo-c.json')
const logos = [logoA, logoB, logoC];

logos.forEach(logo => console.log(validator(logo, defaultVersion)))
