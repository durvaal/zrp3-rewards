"use client";

import { ethers } from "ethers";
import { abi } from "./contracts/ZRP3Rewards.json";

// Endereço do contrato implantado
const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS || "";

// ABI do contrato gerado após o deploy
const contractABI = abi;

let provider: ethers.providers.Web3Provider | undefined;
let contract: ethers.Contract | undefined;

const getContract = () => {
  console.log(contractAddress)
  if (!provider) {
    // Detecta o provedor de rede (Metamask, por exemplo)
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  
  if (!contract) {
    // Cria uma instância do contrato
    contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
  }

  return contract;
};

export const requestZRPoints = async (amount: number) => {
  try {
    const contract = getContract();
    const tx = await contract.requestZRPoints(amount);
    await tx.wait();
    console.log(`Pontos requisitados: ${amount}`);
  } catch (error) {
    console.error("Erro ao requisitar pontos", error);
  }
};

export const getZRPoints = async (userAddress: string) => {
  try {
    const contract = getContract();
    const points = await contract.getZRPoints(userAddress);
    console.log(`Pontos de ${userAddress}: ${points}`);
    return points;
  } catch (error) {
    console.error("Erro ao obter pontos", error);
  }
};
