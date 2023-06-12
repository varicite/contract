const { ContractCreateFlow } = require('@hashgraph/sdk');

const contract = async (client, bytecode) => {
  const createContract = new ContractCreateFlow()
    .setGas(4000000)
    .setBytecode(bytecode);
  const createContractTx = await createContract.execute(client);
  const createContractRx = await createContractTx.getReceipt(client);
  const contractId = createContractRx.contractId;

  return contractId;
}

module.exports = contract;
