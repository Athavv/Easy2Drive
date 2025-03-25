-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 26 mars 2025 à 00:30
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
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `identifiant` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('admin') NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom`, `identifiant`, `mot_de_passe`, `role`) VALUES
(1, 'THEVAKUMAR', 'admin', '$2y$10$0B9eCvkGzFXXiXN8ax9WdOmJJ1pGDAym0C3wsrxQyeRjAkN7nWMhS', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `autoecole`
--

CREATE TABLE `autoecole` (
  `id_autoecole` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `identifiant` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('autoecole') NOT NULL DEFAULT 'autoecole'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `autoecole`
--

INSERT INTO `autoecole` (`id_autoecole`, `nom`, `adresse`, `telephone`, `identifiant`, `mot_de_passe`, `role`) VALUES
(1, 'Autoecole pipi', '12 Rue de Paris, 75000 Paris', '0102030405', 'autoecole_paris', 'motdepasse1', 'autoecole'),
(2, 'Autoecole Lyon', '25 Avenue de la République, 69000 Lyon', '0203040506', 'autoecole_lyon', 'motdepasse2', 'autoecole'),
(3, 'Autoecole kakawanda', '44 Boulevard de la Libération, 13000 Marseille', '0304050607', 'autoecole_marseille', 'motdepasse3', 'autoecole'),
(4, 'Autoecole Lille', '56 Rue de la Gare, 59000 Lille', '0405060708', 'autoecole_lille', 'motdepasse4', 'autoecole'),
(5, 'Autoecole Toulouse', '78 Rue du Capitole, 31000 Toulouse', '0506070809', 'autoecole_toulouse', 'motdepasse5', 'autoecole');

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id_avis` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `date_commentaire` datetime DEFAULT current_timestamp(),
  `date_depot` date DEFAULT NULL,
  `statut` enum('En attente','Publié','Refusé') DEFAULT 'En attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id_avis`, `id_eleve`, `commentaire`, `date_commentaire`, `date_depot`, `statut`) VALUES
(1, 1, 'seffsefesfsef', '2025-03-22 17:36:34', '2025-03-22', 'Publié'),
(3, 1, 'Très bon auto-école !', '2025-03-23 12:33:52', NULL, 'Refusé'),
(4, 1, 'dzdz', '2025-03-23 12:33:56', NULL, 'En attente'),
(5, 1, 'dzdz', '2025-03-23 12:33:56', NULL, 'En attente'),
(6, 1, 'dzddcsqcwcws', '2025-03-23 12:34:34', NULL, 'En attente'),
(7, 1, 'test', '2025-03-23 12:35:35', NULL, 'En attente'),
(8, 1, 'Très DZDZ caca-école !', '2025-03-23 12:54:06', NULL, 'En attente'),
(9, 1, 'dzdz', '2025-03-23 12:54:50', NULL, 'En attente'),
(11, 1, 'dzdzzqdzqzdq', '2025-03-23 12:55:39', NULL, 'En attente'),
(12, 1, 'sasaa', '2025-03-23 12:55:46', NULL, 'En attente'),
(13, 1, 'lol caca lol', '2025-03-23 12:57:00', NULL, 'En attente'),
(14, 1, 'Trèfefes DZDZ caca-école !', '2025-03-23 13:10:51', NULL, 'En attente'),
(15, 2, 'dzdz DZDZ caca-école !', '2025-03-23 13:11:04', NULL, 'Publié'),
(16, 1, 'zdzd', '2025-03-23 13:16:12', NULL, 'En attente'),
(17, 1, 'yes', '2025-03-23 13:16:28', NULL, 'En attente'),
(18, 2, 'dalut c mari', '2025-03-23 13:19:13', NULL, 'Publié'),
(21, 1, 'zddzssss', '2025-03-25 21:32:22', NULL, 'Publié'),
(22, 1, 'dzdz', '2025-03-26 00:07:30', NULL, 'En attente');

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
(1, 'THEVAKUMAR', 'Aathavan', '2005-09-16', 'Dugny, 93440', '2025-02-10', '2', 'B1', 'aathavan123', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 1, 'eleve'),
(2, 'DUPONT', 'Marie', '1999-05-20', 'Paris, 75001', '2025-01-15', '56', 'B', 'marie1999', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 2, 'eleve'),
(3, 'MARTIN', 'Pierre', '1998-11-12', 'Lyon, 69003', '2025-01-10', '1', 'C', 'pierre98', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 2, 'eleve'),
(4, 'asas', 'Sophie', '2000-07-08', 'Marseille, 13008', '2025-02-05', '4', 'BE', 'sophie2000', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 3, 'eleve'),
(5, 'GARCIA', 'Julien', '2001-03-25', 'Lille, 59000', '2025-01-22', '5', 'D', 'julien01', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 4, 'eleve'),
(6, 'PERRIN', 'Emma', '2004-12-10', 'Toulouse, 31000', '2025-02-08', '6', 'DE', 'emma04', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 5, 'eleve'),
(7, 'MARCHAND', 'Lucas', '2002-04-14', 'Paris, 75002', '2025-01-17', '7', 'C1', 'lucas02', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 1, 'eleve'),
(8, 'RODRIGUEZ', 'Isabella', '2003-06-30', 'Marseille, 13009', '2025-02-20', '8', 'D1', 'isabella03', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 3, 'eleve'),
(9, 'FERNANDES', 'Carlos', '2002-02-28', 'Lyon, 69001', '2025-01-18', '9', 'C1E', 'carlos02', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 2, 'eleve'),
(10, 'Doe', 'John', '1995-06-15', '123 Rue de Paris', '2025-03-13', '15', 'B1', 'johndoe123', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 1, 'eleve'),
(35, 'DOE', 'JOHN', '2010-10-10', '2 allée Jean Lurçat', '2025-03-25', '68495', NULL, 'LUC', '$2y$10$vqbM4EtKl.YSyRghKSG9mecfbch0yiyocqKAW2VlCnn8CZvhVT4lu', 'Homme', 5, 'eleve');

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `id_test` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `theme` varchar(100) DEFAULT NULL,
  `date_test` date DEFAULT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` between 0 and 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`id_test`, `id_eleve`, `theme`, `date_test`, `score`) VALUES
(1, 1, 'dzdzd', '2025-03-18', 85),
(2, 1, 'lol', '2025-03-18', 40),
(4, 5, 'akkalaand', '2025-03-18', 5),
(6, 1, 'zdzdz', '2025-03-22', 0),
(7, 1, 'zzz', '2025-03-22', 5),
(8, 1, 'akkalaand', '2025-03-25', 10),
(9, 1, 'ssa', '2025-03-25', 5),
(10, 1, ',oà', '2025-03-25', 74),
(11, 1, 'dzdzqdq', '2025-03-25', 2),
(12, 1, 'lij', '2025-03-25', 11),
(13, 1, 'bnbn', '2025-03-25', 10),
(14, 1, 'nom', '2025-03-25', 20);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `identifiant` (`identifiant`);

--
-- Index pour la table `autoecole`
--
ALTER TABLE `autoecole`
  ADD PRIMARY KEY (`id_autoecole`),
  ADD UNIQUE KEY `identifiant` (`identifiant`);

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id_avis`),
  ADD KEY `id_eleve` (`id_eleve`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id_eleve`),
  ADD UNIQUE KEY `identifiant` (`identifiant`),
  ADD UNIQUE KEY `npeh` (`npeh`),
  ADD KEY `id_autoecole` (`id_autoecole`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id_test`),
  ADD KEY `id_eleve` (`id_eleve`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `autoecole`
--
ALTER TABLE `autoecole`
  MODIFY `id_autoecole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id_avis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE;

--
-- Contraintes pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `eleve_ibfk_1` FOREIGN KEY (`id_autoecole`) REFERENCES `autoecole` (`id_autoecole`) ON DELETE CASCADE;

--
-- Contraintes pour la table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
