import { ethers } from "hardhat";
import { ZRP3Rewards } from "../typechain";

/**
 * O que está acontecendo aqui é que a Hardhat criará uma rede Ethereum local para o contrato.
 * Quando o script for concluído, a rede local será destruída.
 * Toda vez que o script for executado, começaremos com um estado limpo, o que facilita a depuração de erros.
 */
const main = async () => {
  // Obter os signers. Para fazer o deploy de algo na blockchain, precisamos ter um endereço de carteira!
  // A Hardhat faz isso para nós magicamente em segundo plano, mas aqui pegamos o endereço da carteira do proprietário do contrato
  // e também pegamos um endereço aleatório da carteira e chamamos de randomPerson.
  const [owner, randomPerson] = await ethers.getSigners();

  // Implantar o contrato ZRP3Rewards
  const ZRP3RewardsContract = await ethers.deployContract("ZRP3Rewards");
  await ZRP3RewardsContract.waitForDeployment();

  console.log("Contrato implantado em:", ZRP3RewardsContract.target);
  console.log("Contrato implantado por:", owner.address);

  // Verificar ZRPoints do proprietário (owner) antes de requisitar
  let ownerPoints = await ZRP3RewardsContract.getZRPoints(owner.address);
  console.log("ZRPoints do proprietário antes da requisição:", ownerPoints.toString());

  // Requisitar ZRPoints para o proprietário
  let requestTxn = await ZRP3RewardsContract.requestZRPoints(100);  // Requisitar 100 ZRPoints
  await requestTxn.wait();

  // Verificar ZRPoints do proprietário após a requisição
  ownerPoints = await ZRP3RewardsContract.getZRPoints(owner.address);
  console.log("ZRPoints do proprietário após a requisição:", ownerPoints.toString());

  // Verificar ZRPoints de uma pessoa aleatória
  let randomPersonPoints = await ZRP3RewardsContract.getZRPoints(randomPerson.address);
  console.log("ZRPoints da pessoa aleatória:", randomPersonPoints.toString());

  // Requisitar ZRPoints para a pessoa aleatória
  // Aqui estamos fazendo o cast de BaseContract para o tipo específico ZRP3Rewards
  const ZRP3RewardsContractTyped = ZRP3RewardsContract.connect(randomPerson) as any as ZRP3Rewards;

  let randomPersonTxn = await ZRP3RewardsContractTyped.requestZRPoints(50);  // Requisitar 50 ZRPoints
  await randomPersonTxn.wait();

  // Verificar ZRPoints da pessoa aleatória após a requisição
  randomPersonPoints = await ZRP3RewardsContract.getZRPoints(randomPerson.address);
  console.log("ZRPoints da pessoa aleatória após a requisição:", randomPersonPoints.toString());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
