const { AccountId, PrivateKey, Client, } = require('@hashgraph/sdk');
require('dotenv').config({ path: '../../../.env' });
const createNFT = require('../../createNFT');
const mintNFT = require('../../mintNFT');

const metaDatas = [
  [],
  'ipfs://bafybeibuunoqpe65j3hu7ezjm3yqkn64y4tq7xdttc3lfcweg76bsjrixi', // done
  'ipfs://bafybeihpi35eflottxk3owr2446bsj2j7lxul5nyfv5mndinvyophcmwxa',
  'ipfs://bafybeiasq6cied7z4kqfgntz75tmwuxmetk36egskyiy55vrpuvgpjs4xu',
  'ipfs://bafybeidxujycq7gewgnkq3yk5uthjl75dtf2tocyr5cbqzgi3dwe6dv64q',
  'ipfs://bafybeicza3mx6muda2clg3dns2jvwytuykr2q27olguth4teja4gyvrlum',
  'ipfs://bafybeic2djms4o5z6y7sw33byhlsdglyq3l4atff7llr543s3kjg6dqx7y',
  'ipfs://bafybeifcj5nxbqyw4snr2nagx4syc4zm5tyohltrthmdl5ylif5abmsytm',
  'ipfs://bafybeiaugopkaguenxbsua6iskzx6ndedtndhggtpliyaf7dqk5k2r4pqu',
  'ipfs://bafybeigyhqply7eus65s4dvqhvfjoq3jmk7ntxzub6fw4vxadpnde4mvhu',
  'ipfs://bafybeiefjgiushfledt3vooqxvygc6pexs2dtm7flsqqu3nfoqrsx6w3k4',
]

const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const mint = async (contractId) => {
  if (!process.argv[2]) return;
  const seriesNum = process.argv[2];
  const { tokenId, tokenIdSolidityAddr } = await createNFT(
    client,
    contractId,
    'Varicite Fob Spiral',
    'VARICITE_FOB',
    'Varicite Fob Spiral'
  );
  const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, metaDatas[seriesNum]);
  const outMessage = `ContractID : ${contractId}, tokenId: ${tokenId}, serial:  ${serial}`;
  console.log(outMessage);
  process.exit(1);
};

const contractId1 = '0.0.14971695';
mint(contractId1);
