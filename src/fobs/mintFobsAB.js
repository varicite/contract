const fs = require('fs');
const { AccountId, PrivateKey, Client, } = require('@hashgraph/sdk');
require('dotenv').config({ path: '../../.env' });
const contract = require('./../contractNFT');
const createNFT = require('./../createNFT');
const mintNFT = require('./../mintNFT');

const fobAMetaData = 'ipfs://bafybeia6yuuorpdzcr2pf7me64qcqnh4pbucveg3lwp4gxnldjplwz5pxq';
const fobBMetaData = 'ipfs://bafybeif767ehownkgnbw7dc3cbqzjzedelimmkdjzif3c5fkwwprf6tjpa';
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('../../binaries/NFTCreator_sol_NFTCreator.bin');

const func = (async () => {
	const contractId = await contract(client, bytecode);
	const { tokenId, tokenIdSolidityAddr } = await createNFT(
		client,
		contractId,
		'Varicite Fob',
		'VARICITE_FOB',
		'Varicite Fob'
	);
	const serialA = await mintNFT(client, contractId, tokenIdSolidityAddr, fobAMetaData)
	const serialB = await mintNFT(client, contractId, tokenIdSolidityAddr, fobBMetaData)
	const outMessage = `ContractID : ${contractId}, 
	tokenId: ${tokenId}, serial:  ${serialA}, ${serialB}`

	console.log(outMessage);
	process.exit(1)
})()
