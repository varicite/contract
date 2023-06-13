const fs = require('fs');
const { AccountId,
	PrivateKey,
	Client,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

const contract = require('./contractNFT');
const createNFT = require('./createNFT');
const mintNFT = require('./mintNFT');
const logoA = require('./meta-data/logo-a.json')
const logoB = require('./meta-data/logo-b.json')
const logoC = require('./meta-data/logo-c.json')

// const logoMetaData = [logoA, logoB, logoC];
// a series of IPFS URLS
const logoMetaData = [
	'bafybeiaf4rmlcjt3wv63bc56ttwkpo54wl6c3wwlhuurobygirmwzygpmm',
	'bafybeifahcftlyfjt7n4ugzmwjnztkmskriczslojim5mrlojkpo5f4ufi',
	'bafybeihnfi3adwgbzyllfpdvcmo3rlr3m2nkkkfceiheu2aoiohyoky7ta'
];
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const bytecode = fs.readFileSync('../binaries/NFTCreator_sol_NFTCreator.bin');

const func = (async () => {
	const contractId = await contract(client, bytecode);
	const { tokenId, tokenIdSolidityAddr } = await createNFT(
		client,
		contractId,
		'Varicite Logo',
		'VARICITE_LOGO',
		'A Varicite logo'
	);
	const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, logoMetaData[0])
	const s2 = await mintNFT(client, contractId, tokenIdSolidityAddr, logoMetaData[1])
	// console.log(`serial: ${serial}`);
	// logoMetaData.forEach(async metaData => {
	// 		console.log(`serial `);
	// 		const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, metaData)
	// 		console.log(`serial: ${serial}`);
	// 	});
	// const serial = await mintNFT(client, contractId, tokenIdSolidityAddr)
	console.log(
		`ContractID : ${contractId} : tokenId: ${tokenId} : serial:  ${serial} `,
		`serial: ${s2}`
	);
	process.exit(1)
})()
