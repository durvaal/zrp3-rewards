// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract ZRP3Rewards {
    // Mapeamento de endereços para quantidade de ZRPoints
    mapping(address => uint256) private zrPoints;

    // Evento para logar a requisição de pontos
    event ZRPointsRequested(address indexed user, uint256 amount);

    constructor() {
        console.log("Ueba, eu sou um contrato e eu sou inteligente");
    }

    // Função para requisitar ZRPoints (simula a adição de pontos)
    function requestZRPoints(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        zrPoints[msg.sender] += amount; // Adiciona os pontos ao usuário

        // Emite um evento para indicar que a requisição foi bem-sucedida
        emit ZRPointsRequested(msg.sender, amount);

        console.log("ZRPoints requisitados: %s para %s", amount, msg.sender);
    }

    // Função para ler a quantidade de ZRPoints de um endereço
    function getZRPoints(address user) external view returns (uint256) {
        return zrPoints[user];
    }
}
