-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 19 mars 2025 à 22:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `easy2drive`
--

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `id_eleve` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `date_inscription` date DEFAULT NULL,
  `npeh` varchar(20) DEFAULT NULL,
  `etg` enum('B1','B','BE','C','D','CE','DE','C1','D1','C1E','D1E') DEFAULT NULL,
  `identifiant` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `genre` enum('Homme','Femme','Autre') NOT NULL,
  `id_autoecole` int(11) NOT NULL,
  `role` enum('eleve') NOT NULL DEFAULT 'eleve'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`id_eleve`, `nom`, `prenom`, `date_naissance`, `adresse`, `date_inscription`, `npeh`, `etg`, `identifiant`, `mot_de_passe`, `genre`, `id_autoecole`, `role`) VALUES
(1, 'THEVAKUMAR', 'Aathavan', '2005-09-16', 'Dugny, 93440', '2025-02-10', '2', 'B1', 'aathavan123', '$2y$10$St1pudNYsmcjLln34yqMku.JOpt1sQmITDchefnRoOitKVtXdhK8S', 'Homme', 1, 'eleve'),
(2, 'DUPONT', 'Marie', '1999-05-20', 'Paris, 75001', '2025-01-15', '56', 'B', 'marie1999', '$2y$10$V.7xOsk0BnZi9HW2E3lH9eZcrBNS4t/tJB0SvO8yC620SY6nxw0L6', 'Femme', 2, 'eleve'),
(3, 'MARTIN', 'Pierre', '1998-11-12', 'Lyon, 69003', '2025-01-10', '1', 'C', 'pierre98', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Homme', 2, 'eleve'),
(4, 'LEROY', 'Sophie', '2000-07-08', 'Marseille, 13008', '2025-02-05', '4', 'BE', 'sophie2000', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Femme', 3, 'eleve'),
(5, 'GARCIA', 'Julien', '2001-03-25', 'Lille, 59000', '2025-01-22', '5', 'D', 'julien01', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Homme', 4, 'eleve'),
(6, 'PERRIN', 'Emma', '2004-12-10', 'Toulouse, 31000', '2025-02-08', '6', 'DE', 'emma04', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Femme', 5, 'eleve'),
(7, 'MARCHAND', 'Lucas', '2002-04-14', 'Paris, 75002', '2025-01-17', '7', 'C1', 'lucas02', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Homme', 1, 'eleve'),
(8, 'RODRIGUEZ', 'Isabella', '2003-06-30', 'Marseille, 13009', '2025-02-20', '8', 'D1', 'isabella03', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Femme', 3, 'eleve'),
(9, 'FERNANDES', 'Carlos', '2002-02-28', 'Lyon, 69001', '2025-01-18', '9', 'C1E', 'carlos02', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Homme', 2, 'eleve'),
(10, 'Doe', 'John', '1995-06-15', '123 Rue de Paris', '2025-03-13', '15', 'B1', 'johndoe123', '$2y$10$VlTpgcyy2oGJ3MaFl2DcYO7I47IYuZWs4K7ipggGL7/9FJrRIwuNC', 'Homme', 1, 'eleve');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id_eleve`),
  ADD UNIQUE KEY `identifiant` (`identifiant`),
  ADD UNIQUE KEY `npeh` (`npeh`),
  ADD KEY `id_autoecole` (`id_autoecole`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `eleve_ibfk_1` FOREIGN KEY (`id_autoecole`) REFERENCES `autoecole` (`id_autoecole`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
