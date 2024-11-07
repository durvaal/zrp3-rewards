# ZRP3 Rewards App Documentation

Welcome to the **ZRP3 Rewards** app! This project allows users to interact with the Ethereum blockchain to request and check their ZRPoints balance. Below is a guide on how to set up and contribute to this project.

## Overview

The app consists of two main parts:

1.  **Frontend**: A React/Next.js application that interacts with the Ethereum blockchain via MetaMask to request and check ZRPoints.
2.  **Backend**: A smart contract built with Solidity that allows users to request ZRPoints and check their balance.

## Frontend

### Features

- **Connect Wallet**: Users can connect their MetaMask wallet (or another Ethereum-compatible wallet) to interact with the app.
- **Request ZRPoints**: Users can request ZRPoints, which are added to their account in the smart contract.
- **Check ZRPoints Balance**: Users can input an address and check the ZRPoints balance for that address.

### Setup and Installation

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run the Development Server**:
    ```bash
    pnpm run dev
    ```
    > This will start the development server at `http://localhost:3000`.

### Usage

- **Connect to Wallet**: Click the **Conectar Carteira** button to connect your wallet. The address of the connected wallet will be displayed once the connection is successful.
- **Request ZRPoints**: Enter the number of ZRPoints you want to request and click **Requisitar ZRPoints**.
- **Check ZRPoints Balance**: Enter a wallet address and click **Consultar Pontos** to check the ZRPoints balance.

### File Structure

- `pages/index.tsx`: Main page where users interact with the app.
- `libs/ethers.ts`: Contains the functions to request and check ZRPoints via the Ethereum blockchain.
- `styles/page.module.css`: Styling for the page.

### Dependencies

- **React** and **Next.js** for the frontend framework.
- **ethers.js** for Ethereum blockchain interaction.
- **@repo/ui** for UI components.

### Example of Frontend Code

  ```typescript
  import { useState } from "react";
  import { Button } from "@repo/ui/button";
  import { requestZRPoints, getZRPoints } from "./libs/ethers";
  import styles from "./page.module.css";

  export default function Home() {
    const [amount, setAmount] = useState<number>(0);
    const [userAddress, setUserAddress] = useState<string>("");
    const [points, setPoints] = useState<number | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = async () => { ... };
    const handleRequestZRPoints = async () => { ... };
    const handleGetZRPoints = async () => { ... };

    return (
      <div className={styles.page}>
        {/* Your JSX code */}
      </div>
    );
  }
  ```

Backend
-------

### Features

-   **Request ZRPoints**: Users can request ZRPoints, which are added to their account.
-   **Get ZRPoints Balance**: Check the ZRPoints balance for any given address.

### Setup and Installation

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run the Development Node**:
    ```bash
    pnpm run hardhat:dev
    ```

3.  **Deploy the Contract**: Deploy the contract to the local blockchain or a public testnet (Sepolia).

-   **Deploy to Local Network**:
      ```bash
      pnpm run deploy:local
      ```

-   **Deploy to Sepolia**:
      ```bash
      pnpm run deploy:sepolia
      ```

### Smart Contract Code

  ```solidity
  // SPDX-License-Identifier: UNLICENSED

  pragma solidity ^0.8.27;

  import "hardhat/console.sol";

  contract ZRP3Rewards {
      mapping(address => uint256) private zrPoints;

      event ZRPointsRequested(address indexed user, uint256 amount);

      constructor() {
          console.log("Contract deployed successfully!");
      }

      function requestZRPoints(uint256 amount) external {
          require(amount > 0, "Amount must be greater than zero");
          zrPoints[msg.sender] += amount;
          emit ZRPointsRequested(msg.sender, amount);
          console.log("ZRPoints requested: %s for %s", amount, msg.sender);
      }

      function getZRPoints(address user) external view returns (uint256) {
          return zrPoints[user];
      }
  }
  ```

### Dependencies

-   **Hardhat** for Ethereum development.
-   **@typechain/ethers-v5** and **@typechain/hardhat** for TypeChain support.
-   **dotenv** for managing environment variables.

### Example of Backend Code

  ```typescript
  import { ethers } from "hardhat";

  async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const ZRP3Rewards = await ethers.getContractFactory("ZRP3Rewards");
    const contract = await ZRP3Rewards.deploy();
    console.log("ZRP3Rewards contract deployed to:", contract.address);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  ```

How to Contribute
-----------------

1.  **Fork the Repository**: Click the "Fork" button on GitHub to create your own copy of this repository.
2.  **Clone the Repository**: Clone your fork to your local machine:
    ```bash
    git clone https://github.com/durvaal/zrp3-rewards.git
    ```

3.  **Create a Branch**: Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature-name
    ```

4.  **Make Changes**: Implement your changes and test them locally.
5.  **Commit and Push**:
    ```bash
    git commit -am "Add new feature"
    git push origin feature-name
    ```

6.  **Create a Pull Request**: Go to your GitHub fork and create a pull request with your changes.

License
-------

This project is licensed under the **MIT License**.

Contact
-------

For any questions or issues, please open an issue on GitHub or contact the project maintainers.

