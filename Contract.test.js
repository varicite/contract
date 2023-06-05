const fs = require('fs');
const { 
    AccountId,
    PrivateKey,
    Client,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: __dirname + '/.env' });
const Contract = require('./Contract');

// TODO mock the client, remove the timeout value
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('./binaries/NFTCreator_sol_NFTCreator.bin');

test('Contract', async() => {
    const contract = await Contract(client, bytecode)
    expect(contract).toBeTruthy();
}, 1000 * 30);