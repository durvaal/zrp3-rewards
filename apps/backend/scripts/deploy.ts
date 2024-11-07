import { ethers } from "hardhat";

const main = async () => {
  // Obter o provider padrão
  const provider = ethers.getDefaultProvider();

  // Obter os signers (contas)
  const [deployer] = await ethers.getSigners();
  
  // Obter o saldo da conta do deployer
  const accountBalance = await provider.getBalance(deployer.address);

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  // Fazer o deploy do contrato
  const Token = await ethers.deployContract("ZRP3Rewards");
  
  // Aguardar o contrato ser implantado
  const portal = await Token.waitForDeployment();

  console.log("ZRP3Rewards address: ", portal.target);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
