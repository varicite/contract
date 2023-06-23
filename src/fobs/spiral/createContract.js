const fs = require('fs');
const { AccountId, PrivateKey, Client, } = require('@hashgraph/sdk');
require('dotenv').config({ path: '../../../.env' });
const contract = require('../../contractNFT');

const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('../../../binaries/NFTCreator_sol_NFTCreator.bin');

const createContract = async () => {
    const contractId = await contract(client, bytecode);
    console.log(`contractId : ${contractId}`);
    process.exit(1)
};
const id = createContract();
