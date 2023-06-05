const fs = require('fs');
const { AccountId,
    PrivateKey,
    Client,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: __dirname + '/.env' });
const contract = require('./Contract')

const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('./binaries/NFTCreator_sol_NFTCreator.bin');

const func = (async () => {
    const contractId = await contract(client, bytecode)
    console.log(`Contract created with ID:: ${contractId} \n`);

    process.exit(1)
})()
