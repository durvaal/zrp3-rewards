"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import { requestZRPoints, getZRPoints } from "./libs/ethers";
import styles from "./page.module.css";

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [userAddress, setUserAddress] = useState<string>("");
  const [points, setPoints] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Função para conectar à carteira (MetaMask ou qualquer outra)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        console.log("Solicitando contas da carteira...");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const connectedAddress = accounts[0];
        setWalletAddress(connectedAddress);
        setUserAddress(connectedAddress); // Preenche o endereço do usuário automaticamente
        console.log("Carteira conectada com sucesso:", connectedAddress);
      } catch (error) {
        console.error("Erro ao conectar à carteira:", error);
      }
    } else {
      console.log("Carteira Ethereum não encontrada. Instale o MetaMask.");
    }
  };

  const handleRequestZRPoints = async () => {
    if (!walletAddress) {
      console.error("Erro: Conecte a carteira primeiro.");
      return;
    }

    if (amount <= 0) {
      console.error("Quantidade deve ser maior que 0.");
      return;
    }

    try {
      console.log(`Requisitando ${amount} ZRPoints para o endereço ${walletAddress}...`);
      await requestZRPoints(amount);
      console.log(`${amount} ZRPoints requisitados com sucesso!`);
    } catch (error) {
      console.error("Erro ao requisitar ZRPoints:", error);
    }
  };

  const handleGetZRPoints = async () => {
    // Verifica se o endereço do usuário foi fornecido e se é um endereço válido
    if (!userAddress) {
      console.error("Erro: Por favor, insira um endereço válido.");
      return;
    }

    try {
      console.log(`Consultando ZRPoints para o endereço ${userAddress}...`);
      const userPoints = await getZRPoints(userAddress);
      const pointsValue = userPoints.toString();
      setPoints(pointsValue);
      console.log(`ZRPoints para o endereço ${userAddress}: ${pointsValue}`);
    } catch (error) {
      console.error("Erro ao consultar ZRPoints:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className={styles.title}>ZRP3 Rewards</h1>

        {/* Conectar à Carteira */}
        <div className={styles.ctas}>
          {!walletAddress ? (
            <Button onClick={connectWallet} className={styles.primaryBtn}>
              Conectar Carteira
            </Button>
          ) : (
            <p className={styles.walletAddress}>Carteira conectada: {walletAddress}</p>
          )}
        </div>

        {/* Requisitar ZRPoints */}
        <div className={styles.ctas}>
          <h2>Requisitar ZRPoints</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Quantidade de ZRPoints"
            className={styles.input}
          />
          <Button onClick={handleRequestZRPoints} className={styles.primaryBtn}>
            Requisitar ZRPoints
          </Button>
        </div>

        {/* Consultar ZRPoints de Usuário */}
        <div className={styles.ctas}>
          <h2>Consultar ZRPoints de Usuário</h2>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Endereço do usuário"
            className={styles.input}
          />
          <Button onClick={handleGetZRPoints} className={styles.primaryBtn}>
            Consultar Pontos
          </Button>

          {points !== null && <p className={styles.points}>O usuário tem {points} ZRPoints.</p>}
        </div>

        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Image
              aria-hidden
              src="/file-text.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
        </footer>
      </main>
    </div>
  );
}
