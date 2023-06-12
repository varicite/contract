const { validator, defaultVersion } = require('@hashgraph/nft-utilities');

const metadata = {
    name: "Varicite Logo",
    type: "image/svg+xml",
    creator: "Varicite",
    image: "https://bafybeih7peh6mbh63iwmx6n3jallwad3sfdh6sp7qfet7nxn6fedae5zd4.ipfs.dweb.link/logo.svg"
};

const issues = validator( metadata , defaultVersion);
console.log(issues)