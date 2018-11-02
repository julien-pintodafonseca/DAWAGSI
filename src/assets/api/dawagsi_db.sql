-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 02 nov. 2018 à 16:19
-- Version du serveur :  5.6.41-log
-- Version de PHP :  7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `skydefrc_dawagsi`
--

-- --------------------------------------------------------

--
-- Structure de la table `Annotation`
--

CREATE TABLE `Annotation` (
  `id` int(11) NOT NULL COMMENT 'ID de l''annotation',
  `tag` varchar(100) NOT NULL COMMENT 'Tag de l''annotation',
  `position` text NOT NULL COMMENT 'Données de position de l''annotation'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Editor`
--

CREATE TABLE `Editor` (
  `id` int(11) NOT NULL COMMENT 'ID de l''éditeur',
  `name` varchar(100) NOT NULL COMMENT 'Nom de l''éditeur'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Image`
--

CREATE TABLE `Image` (
  `id` int(11) NOT NULL COMMENT 'ID de l''image',
  `path` varchar(255) NOT NULL COMMENT 'Chemin de l''image',
  `name` varchar(100) NOT NULL COMMENT 'Nom de l''image',
  `editeur` int(11) NOT NULL COMMENT 'ID de l''éditeur lié à l''image',
  `annotations` text NOT NULL COMMENT 'ID des annotations liées à l''image',
  `relations` text NOT NULL COMMENT 'ID des relations liées à l''image'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `List`
--

CREATE TABLE `List` (
  `id` int(11) NOT NULL COMMENT 'ID de la liste',
  `name` varchar(100) NOT NULL COMMENT 'Nom de la liste',
  `description` varchar(255) NOT NULL COMMENT 'Description de la liste',
  `images` text NOT NULL COMMENT 'ID des images appartenant à la liste'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Relation`
--

CREATE TABLE `Relation` (
  `id` int(11) NOT NULL COMMENT 'ID de la relation',
  `predicate` varchar(100) NOT NULL COMMENT 'Action de relation',
  `annotation1` int(11) NOT NULL COMMENT 'ID de la première annotation de la relation',
  `annotation2` int(11) NOT NULL COMMENT 'ID de la seconde annotation de la relation'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Annotation`
--
ALTER TABLE `Annotation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Editor`
--
ALTER TABLE `Editor`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `List`
--
ALTER TABLE `List`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Relation`
--
ALTER TABLE `Relation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Annotation`
--
ALTER TABLE `Annotation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''annotation';

--
-- AUTO_INCREMENT pour la table `Editor`
--
ALTER TABLE `Editor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''éditeur';

--
-- AUTO_INCREMENT pour la table `Image`
--
ALTER TABLE `Image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''image';

--
-- AUTO_INCREMENT pour la table `List`
--
ALTER TABLE `List`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la liste';

--
-- AUTO_INCREMENT pour la table `Relation`
--
ALTER TABLE `Relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la relation';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
