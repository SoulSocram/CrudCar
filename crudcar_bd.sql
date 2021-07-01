-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Jul-2021 às 18:08
-- Versão do servidor: 10.4.19-MariaDB
-- versão do PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crudcar_bd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `carros`
--

CREATE TABLE `carros` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `ano_fabricacao` varchar(10) NOT NULL,
  `placa` varchar(100) NOT NULL,
  `cor` varchar(100) NOT NULL,
  `chassi` varchar(100) NOT NULL,
  `data_compra` varchar(10) NOT NULL,
  `valor_compra` double NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `carros`
--

INSERT INTO `carros` (`id`, `modelo`, `marca`, `ano_fabricacao`, `placa`, `cor`, `chassi`, `data_compra`, `valor_compra`, `status`) VALUES
(1, 'UNO', 'Fiat', '2021-03', 'HZO-6200', 'Cinza', 'xxxxxxx', '2021-06-30', 10000, 'Vendido'),
(2, 'Palio', 'Fiat', '2021-03', 'HZO-6233', 'Vermelho', 'xxxxxxx', '2021-06-25', 15000, 'Vendido'),
(3, 'Punto', 'Fiat', '2021-06', 'GSVDAQHBD', 'Vermelho', 'shuahd4543654das', '2021-07-17', 40000, 'Disponível'),
(4, 'Civic', 'Honda', '2021-03', 'GSVDAQHBD', 'Cinza', 'yyyyyy', '2021-07-13', 20000, 'Vendido');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `data_venda` varchar(10) NOT NULL,
  `valor_venda` double NOT NULL,
  `comissao` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`id`, `data_venda`, `valor_venda`, `comissao`) VALUES
(1, '2021-06-16', 30000, 3000),
(2, '2021-07-30', 27000, 2700),
(4, '2021-07-02', 15000, 1500);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `carros`
--
ALTER TABLE `carros`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `carros`
--
ALTER TABLE `carros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
