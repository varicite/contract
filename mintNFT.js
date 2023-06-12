const {
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
  } = require('@hashgraph/sdk');
  
  const mintNFT = async (client, contractId, tokenIdSolidityAddr) => {
    // this need to be a JSON object TODO
    metadata = 'bafybeih7peh6mbh63iwmx6n3jallwad3sfdh6sp7qfet7nxn6fedae5zd4'
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
  