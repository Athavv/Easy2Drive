-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 19 mars 2025 à 23:27
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
(1, 'Autoecole Paris', '12 Rue de Paris, 75000 Paris', '0102030405', 'autoecole_paris', 'motdepasse1', 'autoecole'),
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
  `id_autoecole` int(11) DEFAULT NULL,
  `contenu` text DEFAULT NULL,
  `date_depot` date DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `statut` enum('En attente','Publié','Refusé') DEFAULT 'En attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 'LEROY', 'Sophie', '2000-07-08', 'Marseille, 13008', '2025-02-05', '4', 'BE', 'sophie2000', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 3, 'eleve'),
(5, 'GARCIA', 'Julien', '2001-03-25', 'Lille, 59000', '2025-01-22', '5', 'D', 'julien01', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 4, 'eleve'),
(6, 'PERRIN', 'Emma', '2004-12-10', 'Toulouse, 31000', '2025-02-08', '6', 'DE', 'emma04', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 5, 'eleve'),
(7, 'MARCHAND', 'Lucas', '2002-04-14', 'Paris, 75002', '2025-01-17', '7', 'C1', 'lucas02', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 1, 'eleve'),
(8, 'RODRIGUEZ', 'Isabella', '2003-06-30', 'Marseille, 13009', '2025-02-20', '8', 'D1', 'isabella03', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Femme', 3, 'eleve'),
(9, 'FERNANDES', 'Carlos', '2002-02-28', 'Lyon, 69001', '2025-01-18', '9', 'C1E', 'carlos02', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 2, 'eleve'),
(10, 'Doe', 'John', '1995-06-15', '123 Rue de Paris', '2025-03-13', '15', 'B1', 'johndoe123', '$2y$10$k0cvpPBEgujvC0AqE3IJXuvUX5Z77ujPy4yvP7UxEH150j4w/NuTa', 'Homme', 1, 'eleve');

-- --------------------------------------------------------

--
-- Structure de la table `examenblanc`
--

CREATE TABLE `examenblanc` (
  `id_examen` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `date_examen` date DEFAULT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` between 0 and 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id_inscription` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `id_autoecole` int(11) DEFAULT NULL,
  `date_inscription` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 1, 'cACA TEST', '2025-03-18', 40),
(2, 1, 'lol', '2025-03-18', 40),
(3, 1, '', '2025-03-18', 0),
(4, 5, 'akkalaand', '2025-03-18', 5);

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
-- Index pour la table `examenblanc`
--
ALTER TABLE `examenblanc`
  ADD PRIMARY KEY (`id_examen`),
  ADD KEY `id_eleve` (`id_eleve`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id_inscription`),
  ADD KEY `id_eleve` (`id_eleve`),
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
  MODIFY `id_avis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `examenblanc`
--
ALTER TABLE `examenblanc`
  MODIFY `id_examen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Contraintes pour la table `examenblanc`
--
ALTER TABLE `examenblanc`
  ADD CONSTRAINT `examenblanc_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE;

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscription_ibfk_2` FOREIGN KEY (`id_autoecole`) REFERENCES `autoecole` (`id_autoecole`) ON DELETE CASCADE;

--
-- Contraintes pour la table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
