const {
    AccountId,
    ContractExecuteTransaction,
    ContractFunctionParameters,
} = require('@hashgraph/sdk');

const createNFT = async (
    client,
    contractId,
    name = 'name',
    symbol = 'symbol',
    memo = 'memo',
    maxSupply = 250
) => {
    // Create NFT from precompile
    const createToken = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(4000000)
        .setPayableAmount(50)
        .setFunction("createNft",
            new ContractFunctionParameters()
                .addString(name) // NFT name
                .addString(symbol) // NFT symbol
                .addString(memo) // NFT memo
                .addInt64(maxSupply) // NFT max supply
                .addInt64(7000000) // Expiration: Needs to be between 6999999 and 8000001
        );
    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
    const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

    return { tokenIdSolidityAddr, tokenId };
}

module.exports = createNFT;
