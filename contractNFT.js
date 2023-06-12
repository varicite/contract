const {
  AccountId,
  ContractCreateFlow,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Hbar,
} = require('@hashgraph/sdk');

const contract = async (client, bytecode) => {
  const createContract = new ContractCreateFlow()
    .setGas(4000000)
    .setBytecode(bytecode);
  const createContractTx = await createContract.execute(client);
  const createContractRx = await createContractTx.getReceipt(client);
  const contractId = createContractRx.contractId;
  console.log(`contractId: ${contractId}`);
  return contractId;

  // // Create NFT from precompile
  // const createToken = new ContractExecuteTransaction()
  //   .setContractId(contractId)
  //   .setGas(4000000) // Increase if revert
  //   .setPayableAmount(50) // Increase if revert 1 50 100
  //   .setFunction("createNft",
  //     new ContractFunctionParameters()
  //       .addString("Varicite Logo") // NFT name
  //       .addString("Symbol") // NFT symbol
  //       .addString("The logo of Varicite, a producer of fobs.") // NFT memo
  //       .addInt64(250) // NFT max supply
  //       .addInt64(7000000) // Expiration: Needs to be between 6999999 and 8000001
  //   );
  // const createTokenTx = await createToken.execute(client);
  // const createTokenRx = await createTokenTx.getRecord(client);
  // const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
  // const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);
  // console.log(`tokenId: ${tokenId}`);
  // // IPFS URI
  // // metadata = "ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json";
  // metadata = 'bafybeih7peh6mbh63iwmx6n3jallwad3sfdh6sp7qfet7nxn6fedae5zd4'
  // // Mint NFT
  // const mintToken = new ContractExecuteTransaction()
  //   .setContractId(contractId)
  //   .setGas(4000000)
  //   .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
  //   .setFunction("mintNft",
  //     new ContractFunctionParameters()
  //       .addAddress(tokenIdSolidityAddr) // Token address
  //       .addBytesArray([Buffer.from(metadata)]) // Metadata
  //   );
  // const mintTokenTx = await mintToken.execute(client);
  // const mintTokenRx = await mintTokenTx.getRecord(client);
  // const serial = mintTokenRx.contractFunctionResult.getInt64(0);
  // console.log(`Minted NFT with serial: ${serial} \n`);

  // return tokenId;
}

module.exports = contract;
