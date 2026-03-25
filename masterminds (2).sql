-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/03/2026 às 04:19
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `masterminds`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `partidas`
--

CREATE TABLE `partidas` (
  `id` int(11) NOT NULL,
  `id_usuario` varchar(100) NOT NULL,
  `pontuacao` int(20) NOT NULL,
  `tentativas` int(11) NOT NULL,
  `estado_completo` varchar(500) NOT NULL,
  `tempo` time NOT NULL,
  `resposta_correta` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `partidas`
--

INSERT INTO `partidas` (`id`, `id_usuario`, `pontuacao`, `tentativas`, `estado_completo`, `tempo`, `resposta_correta`, `created_at`) VALUES
(1, '1', 0, 0, '', '00:00:00', '', '2026-03-21 14:42:13'),
(2, '1', 0, 1, '', '00:00:00', '', '2026-03-21 14:42:19'),
(3, '1', 0, 2, '', '00:00:00', '', '2026-03-21 14:42:25'),
(4, '1', 0, 3, '', '00:00:00', '', '2026-03-21 14:42:30'),
(5, '1', 0, 4, '', '00:00:00', '', '2026-03-21 14:42:35'),
(6, '1', 0, 0, '', '00:00:00', '', '2026-03-21 14:51:59'),
(7, '1', 0, 1, '', '00:00:00', '', '2026-03-21 14:52:02'),
(8, '1', 0, 0, '', '00:00:00', '', '2026-03-21 15:12:57'),
(9, '1', 0, 1, '', '00:00:00', '', '2026-03-21 15:13:12'),
(10, '1', 0, 2, '', '00:00:00', '', '2026-03-21 15:13:15'),
(11, '1', 0, 3, '', '00:00:00', '', '2026-03-21 15:13:17'),
(12, '1', 0, 4, '', '00:00:00', '', '2026-03-21 15:13:20'),
(13, '1', 0, 5, '', '00:00:00', '', '2026-03-21 15:13:22'),
(14, '1', 0, 6, '', '00:00:00', '', '2026-03-21 15:13:24'),
(15, '1', 0, 7, '', '00:00:00', '', '2026-03-21 15:13:27'),
(16, '1', 0, 8, '', '00:00:00', '', '2026-03-21 15:13:29'),
(17, '1', 0, 9, '', '00:00:00', '', '2026-03-21 15:13:32'),
(18, '1', 0, 9, '', '00:00:00', '', '2026-03-21 15:15:25'),
(19, '1', 10, 1, '', '00:00:00', '', '2026-03-21 15:19:45'),
(20, '1', 10, 1, '', '00:00:00', '', '2026-03-21 15:49:58'),
(21, '1', 10, 1, '', '00:00:00', '', '2026-03-21 15:52:06'),
(22, '1', 10, 1, '', '00:00:00', '', '2026-03-21 15:54:15'),
(23, '1', 10, 1, '', '00:00:00', '', '2026-03-21 15:56:07'),
(24, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:05:41'),
(25, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:15:37'),
(26, '1', 0, 9, '', '00:00:00', '', '2026-03-21 16:35:33'),
(27, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:36:02'),
(28, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:36:56'),
(29, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:39:51'),
(30, '1', 10, 1, '', '00:00:00', '', '2026-03-21 16:56:36'),
(31, '1', 5, 6, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"verde\", \"verde\", \"verde\"], [\"verde\"', '00:00:00', '[\"verde\", \"amarelo\", \"verde\", \"vermelho\"]', '2026-03-21 17:27:47'),
(32, '1', 7, 4, '[[\"verde\", \"amarelo\", \"verde\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"azul', '00:00:00', '[\"amarelo\", \"azul\", \"verde\", \"amarelo\"]', '2026-03-21 17:31:13'),
(33, '1', 9, 2, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"],', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:28'),
(34, '1', 9, 2, '[[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:32'),
(35, '1', 9, 2, '[[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:34'),
(36, '1', 9, 2, '[[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:35'),
(37, '1', 9, 2, '[[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:37'),
(38, '1', 9, 2, '[[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:00:49'),
(39, '2', 10, 1, '[[\"verde\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"azul\", \"vermelho\", \"vermelho\", \"verde\"]]', '00:00:00', '[\"azul\", \"vermelho\", \"vermelho\", \"verde\"]', '2026-03-21 18:01:54'),
(40, '1', 7, 4, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"vermelho\", \"verde\", \"azul\"], [\"verde\",', '00:00:00', '[\"amarelo\", \"vermelho\", \"amarelo\", \"vermelho\"]', '2026-03-21 19:59:01'),
(41, '1', 5, 6, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"azul\", \"vermelho\", \"vermelho\", \"verde\"], [\"verde\", \"verde\", \"verde\", \"azul\"], [\"amarelo\", \"verde\", \"verde\", \"azul\"], [\"verde\", \"amarelo\", \"amarelo\", \"amarelo\"], [\"verde\", \"azul\", \"amarelo\", \"amarelo\"], [\"verde\", \"amarelo\", \"azul\", \"amarelo\"]]', '00:00:00', '[\"verde\", \"amarelo\", \"azul\", \"amarelo\"]', '2026-03-21 20:44:34'),
(42, '1', 10, 1, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"vermelho\", \"amarelo\", \"amarelo\"]]', '00:00:00', '[\"verde\", \"vermelho\", \"amarelo\", \"amarelo\"]', '2026-03-21 21:39:38'),
(43, '2', 9, 2, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"amarelo\", \"amarelo\", \"azul\", \"vermelho\"]]', '00:00:00', '[\"amarelo\", \"amarelo\", \"azul\", \"vermelho\"]', '2026-03-22 01:34:17'),
(44, '2', 9, 2, '[[\"amarelo\", \"amarelo\", \"azul\", \"vermelho\"]]', '00:00:00', '[\"amarelo\", \"amarelo\", \"azul\", \"vermelho\"]', '2026-03-22 01:34:24'),
(45, '2', 10, 1, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"amarelo\", \"azul\", \"verde\", \"amarelo\"]]', '00:00:00', '[\"amarelo\", \"azul\", \"verde\", \"amarelo\"]', '2026-03-22 01:36:18'),
(46, '2', 7, 4, '[[\"vermelho\", \"verde\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"azul\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"amarelo\", \"vermelho\", \"vermelho\"], [\"azul\", \"azul\", \"amarelo\", \"verde\"], [\"verde\", \"amarelo\", \"azul\", \"azul\"]]', '00:00:00', '[\"verde\", \"amarelo\", \"azul\", \"azul\"]', '2026-03-22 01:54:30'),
(47, '2', 3, 8, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"amarelo\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"verde\", \"verde\"], [\"verde\", \"vermelho\", \"vermelho\", \"verde\"], [\"azul\", \"vermelho\", \"azul\", \"vermelho\"], [\"vermelho\", \"azul\", \"vermelho\", \"azul\"], [\"vermelho\", \"azul\", \"vermelho\", \"amarelo\"], [\"vermelho\", \"amarelo\", \"vermelho\", \"azul\"], [\"vermelho\", \"verde\", \"vermelho\", \"azul\"]]', '00:00:00', '[\"vermelho\", \"verde\", \"vermelho\", \"azul\"]', '2026-03-23 17:23:01'),
(48, '1', 5, 6, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"vermelho\", \"verde\"], [\"verde\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"verde\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"verde\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"azul\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"amarelo\", \"vermelho\"]]', '00:00:00', '[\"vermelho\", \"vermelho\", \"amarelo\", \"vermelho\"]', '2026-03-23 17:30:24'),
(49, '1', 8, 3, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"verde\", \"verde\", \"verde\"], [\"verde\", \"azul\", \"azul\", \"azul\"], [\"azul\", \"verde\", \"amarelo\", \"amarelo\"]]', '00:00:00', '[\"azul\", \"verde\", \"amarelo\", \"amarelo\"]', '2026-03-23 21:06:34'),
(50, '1', 8, 3, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"azul\", \"verde\", \"verde\"], [\"verde\", \"verde\", \"verde\", \"verde\"], [\"azul\", \"azul\", \"verde\", \"verde\"]]', '00:00:00', '[\"azul\", \"azul\", \"verde\", \"verde\"]', '2026-03-24 01:05:19'),
(51, '1', 8, 3, '[[\"azul\", \"azul\", \"verde\", \"verde\"]]', '00:00:00', '[\"azul\", \"azul\", \"verde\", \"verde\"]', '2026-03-24 01:05:23'),
(52, '2', 4, 7, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"verde\", \"azul\", \"amarelo\"], [\"verde\", \"vermelho\", \"amarelo\", \"azul\"], [\"azul\", \"azul\", \"vermelho\", \"verde\"], [\"amarelo\", \"vermelho\", \"verde\", \"verde\"], [\"verde\", \"amarelo\", \"amarelo\", \"vermelho\"], [\"verde\", \"amarelo\", \"amarelo\", \"vermelho\"], [\"azul\", \"amarelo\", \"amarelo\", \"vermelho\"]]', '00:00:15', '[\"azul\", \"amarelo\", \"amarelo\", \"vermelho\"]', '2026-03-24 21:57:14'),
(53, '2', 4, 7, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"verde\", \"verde\"], [\"verde\", \"verde\", \"vermelho\", \"vermelho\"], [\"verde\", \"amarelo\", \"vermelho\", \"azul\"], [\"verde\", \"azul\", \"vermelho\", \"amarelo\"], [\"azul\", \"azul\", \"vermelho\", \"vermelho\"], [\"amarelo\", \"azul\", \"vermelho\", \"vermelho\"], [\"azul\", \"amarelo\", \"vermelho\", \"vermelho\"]]', '00:00:11', '[\"azul\", \"amarelo\", \"vermelho\", \"vermelho\"]', '2026-03-24 22:13:23'),
(54, '2', 7, 4, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"verde\", \"verde\", \"verde\", \"verde\"], [\"verde\", \"amarelo\", \"azul\", \"azul\"], [\"verde\", \"amarelo\", \"azul\", \"amarelo\"], [\"verde\", \"azul\", \"azul\", \"azul\"]]', '00:00:36', '[\"verde\", \"azul\", \"azul\", \"azul\"]', '2026-03-24 22:22:24'),
(55, '3', 5, 6, '[[\"vermelho\", \"vermelho\", \"vermelho\", \"vermelho\"], [\"vermelho\", \"vermelho\", \"verde\", \"azul\"], [\"verde\", \"vermelho\", \"vermelho\", \"azul\"], [\"azul\", \"vermelho\", \"vermelho\", \"verde\"], [\"verde\", \"azul\", \"vermelho\", \"vermelho\"], [\"verde\", \"verde\", \"vermelho\", \"vermelho\"], [\"verde\", \"vermelho\", \"amarelo\", \"vermelho\"]]', '00:00:00', '[\"verde\", \"vermelho\", \"amarelo\", \"vermelho\"]', '2026-03-24 23:00:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `placar`
--

CREATE TABLE `placar` (
  `id` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `pontuacao` int(100) NOT NULL,
  `tentativas` int(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `placar`
--

INSERT INTO `placar` (`id`, `id_usuario`, `pontuacao`, `tentativas`, `created_at`) VALUES
(1, 1, 6, 5, '2026-03-18 23:16:27'),
(4, 1, 10, 1, '2026-03-21 00:51:39'),
(5, 1, 10, 1, '2026-03-21 13:52:47'),
(6, 1, 10, 1, '2026-03-21 13:52:57'),
(7, 1, 7, 4, '2026-03-21 14:30:21'),
(8, 1, 10, 1, '2026-03-21 15:03:40'),
(9, 1, 10, 1, '2026-03-21 15:15:55'),
(10, 1, 11, 0, '2026-03-21 15:16:02'),
(11, 1, 11, 0, '2026-03-21 15:16:19'),
(12, 1, 10, 1, '2026-03-21 15:19:45'),
(13, 1, 10, 1, '2026-03-21 15:49:58'),
(14, 1, 10, 1, '2026-03-21 15:52:06'),
(15, 1, 10, 1, '2026-03-21 15:54:15'),
(16, 1, 10, 1, '2026-03-21 15:56:07'),
(17, 1, 10, 1, '2026-03-21 16:05:40'),
(18, 1, 10, 1, '2026-03-21 16:15:37'),
(19, 1, 10, 1, '2026-03-21 16:36:02'),
(20, 1, 10, 1, '2026-03-21 16:36:56'),
(21, 1, 10, 1, '2026-03-21 16:39:51'),
(22, 1, 10, 1, '2026-03-21 16:56:36'),
(23, 1, 2, 9, '2026-03-21 17:14:43'),
(24, 1, 5, 6, '2026-03-21 17:27:47'),
(25, 1, 7, 4, '2026-03-21 17:31:13'),
(26, 1, 9, 2, '2026-03-21 18:00:28'),
(27, 1, 9, 2, '2026-03-21 18:00:32'),
(28, 1, 9, 2, '2026-03-21 18:00:34'),
(29, 1, 9, 2, '2026-03-21 18:00:35'),
(30, 1, 9, 2, '2026-03-21 18:00:37'),
(31, 1, 9, 2, '2026-03-21 18:00:49'),
(32, 2, 10, 1, '2026-03-21 18:01:54'),
(33, 1, 7, 4, '2026-03-21 19:59:01'),
(34, 1, 5, 6, '2026-03-21 20:44:34'),
(35, 1, 10, 1, '2026-03-21 21:39:38'),
(36, 2, 9, 2, '2026-03-22 01:34:17'),
(37, 2, 9, 2, '2026-03-22 01:34:24'),
(38, 2, 10, 1, '2026-03-22 01:36:18'),
(39, 2, 7, 4, '2026-03-22 01:54:30'),
(40, 2, 3, 8, '2026-03-23 17:23:01'),
(41, 1, 5, 6, '2026-03-23 17:30:24'),
(42, 1, 8, 3, '2026-03-23 21:06:34'),
(43, 1, 8, 3, '2026-03-24 01:05:19'),
(44, 1, 8, 3, '2026-03-24 01:05:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pontuacao_total` int(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `senha`, `email`, `pontuacao_total`, `created_at`) VALUES
(1, 'esparrell', '123456', '', 314, '2026-03-21 02:20:28'),
(2, 'gabs', '123456', '', 48, '2026-03-21 02:21:25');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `placar`
--
ALTER TABLE `placar`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `partidas`
--
ALTER TABLE `partidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de tabela `placar`
--
ALTER TABLE `placar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
