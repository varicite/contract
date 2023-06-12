const {
    AccountId,
    ContractExecuteTransaction,
    ContractFunctionParameters,
} = require('@hashgraph/sdk');

const createNFT = async (client, contractId) => {
    // Create NFT from precompile
    const createToken = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(4000000) // Increase if revert
        .setPayableAmount(50) // Increase if revert 1 50 100
        .setFunction("createNft",
            new ContractFunctionParameters()
                .addString("TEST name") // NFT name
                .addString("TEST Symbol") // NFT symbol
                .addString("TEST memo") // NFT memo
                .addInt64(250) // NFT max supply
                .addInt64(7000000) // Expiration: Needs to be between 6999999 and 8000001
        );
    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
    const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

    return { tokenIdSolidityAddr, tokenId };
}

module.exports = createNFT;
