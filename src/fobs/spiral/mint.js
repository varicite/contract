const { AccountId, PrivateKey, Client, } = require('@hashgraph/sdk');
require('dotenv').config({ path: '../../../.env' });
const createNFT = require('../../createNFT');
const mintNFT = require('../../mintNFT');

const metaData = 'ipfs://bafybeibuunoqpe65j3hu7ezjm3yqkn64y4tq7xdttc3lfcweg76bsjrixi';
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const mint = async (contractId) => {
  const { tokenId, tokenIdSolidityAddr } = await createNFT(
    client,
    contractId,
    'Varicite Fob Spiral',
    'VARICITE_FOB',
    'Varicite Fob Spiral'
  );
  const serial = await mintNFT(client, contractId, tokenIdSolidityAddr, metaData);
  const outMessage = `ContractID : ${contractId}, tokenId: ${tokenId}, serial:  ${serial}`;
  console.log(outMessage);
  process.exit(1);
};

const contractId1 = '0.0.14971695';
mint(contractId1);
