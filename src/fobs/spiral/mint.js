const fs = require('fs');
const { AccountId, PrivateKey, Client, } = require('@hashgraph/sdk');
require('dotenv').config({ path: '../../../.env' });
const contract = require('../../contractNFT');
const createNFT = require('../../createNFT');
const mintNFT = require('../../mintNFT');

const metaData = 'ipfs://TODOXXX';

const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('../../../binaries/NFTCreator_sol_NFTCreator.bin');

const mint = async () => {
    const contractId = await contract(client, bytecode);
    const { tokenId, tokenIdSolidityAddr } = await createNFT(
        client,
        contractId,
        'Varicite Fob Spiral',
        'VARICITE_FOB',
        'Varicite Fob Spiral'
    );
    const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, metaData)
    const outMessage = `ContractID : ${contractId}, tokenId: ${tokenId}, serial:  ${serial}`
    console.log(outMessage);
    process.exit(1)
};
mint();
