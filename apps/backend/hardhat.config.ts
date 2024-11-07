import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  typechain: {
    outDir: "typechain",  // Pasta onde os tipos gerados serão armazenados
    target: "ethers-v5",  // Usar o ethers.js para gerar os tipos
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",  // Usa a variável de ambiente
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],  // Usa a chave privada
    },
  },
};

export default config;
