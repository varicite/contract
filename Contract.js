const {
  ContractCreateFlow,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Hbar,
} = require('@hashgraph/sdk');

const Contract = async (client, bytecode) => {
  const createContract = new ContractCreateFlow()
    .setGas(4000000)
    .setBytecode(bytecode);
  const createContractTx = await createContract.execute(client);
  const createContractRx = await createContractTx.getReceipt(client);
  const contractId = createContractRx.contractId;
  console.log(`contractId: ${contractId}`);

  // Create NFT from precompile
  const createToken = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(4000000) // Increase if revert
    .setPayableAmount(50) // Increase if revert 1 50 100
    .setFunction("createNft",
      new ContractFunctionParameters()
        .addString("Name") // NFT name
        .addString("Symbol") // NFT symbol
        .addString("memo") // NFT memo
        .addUint32(250) // NFT max supply
        .addUint32(7000000) // Expiration: Needs to be between 6999999 and 8000001
    );
  const createTokenTx = await createToken.execute(client);
  const createTokenRx = await createTokenTx.getRecord(client);
  const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
  const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);
  console.log(`tokenId: ${tokenId}`);

}

module.exports = Contract;
