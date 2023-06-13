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
	'ipfs://bafybeiea52yxiyue4tcmamnui3pkgik6yhafx4cirahvnj7ujphxt24icm',
	'ipfs://bafybeiaav2scs2cfgqpajgysz43d7bstyn45apugvhivsxx4e266bazvmy',
	'ipfs://bafybeihou6shq3d5bwpz3f4f7e2wa76cybgjt2dcr2ytjmfqalaxlwnxmm'
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
	const s3 = await mintNFT(client, contractId, tokenIdSolidityAddr, logoMetaData[2])
	// console.log(`serial: ${serial}`);
	// logoMetaData.forEach(async metaData => {
	// 		console.log(`serial `);
	// 		const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, metaData)
	// 		console.log(`serial: ${serial}`);
	// 	});
	// const serial = await mintNFT(client, contractId, tokenIdSolidityAddr)
	console.log(
		`ContractID : ${contractId} : tokenId: ${tokenId} : serial:  ${serial} `,
		`serial: ${s2}, ${s3}`
	);
	process.exit(1)
})()
