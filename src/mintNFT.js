const {
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
  } = require('@hashgraph/sdk');
  
  const mintNFT = async (client, contractId, tokenIdSolidityAddr, metadata) => {
    const mintToken = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(4000000)
      .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
      .setFunction("mintNft",
        new ContractFunctionParameters()
          .addAddress(tokenIdSolidityAddr) // Token address
          .addBytesArray([Buffer.from(metadata)]) // Metadata
      );
    const mintTokenTx = await mintToken.execute(client);
    const mintTokenRx = await mintTokenTx.getRecord(client);
    const serial = mintTokenRx.contractFunctionResult.getInt64(0);
  
    return serial;
  }
  
  module.exports = mintNFT;
  