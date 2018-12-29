-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  sam. 01 déc. 2018 à 20:32
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

CREATE TABLE IF NOT EXISTS `Annotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''annotation',
  `image` int(11) NOT NULL COMMENT 'ID de l''image comportant l''annotation',
  `tag` varchar(100) NOT NULL COMMENT 'Tag de l''annotation',
  `x` varchar(100) NOT NULL COMMENT 'Position X de l''annotation',
  `y` varchar(100) NOT NULL COMMENT 'Position Y de l''annotation',
  `width` varchar(100) NOT NULL COMMENT 'Longueur de l''annotation',
  `height` varchar(100) NOT NULL COMMENT 'Hauteur de l''annotation',
  PRIMARY KEY (`id`),
  KEY `Annotation_ibfk_1` (`image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `Editor`
--

CREATE TABLE IF NOT EXISTS `Editor` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''éditeur',
  `name` varchar(100) NOT NULL COMMENT 'Nom de l''éditeur',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `Image`
--

CREATE TABLE IF NOT EXISTS `Image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''image',
  `list` int(11) NOT NULL COMMENT 'ID de la liste comportant l''image',
  `originalName` varchar(100) NOT NULL COMMENT 'Nom original du fichier image',
  `generatedName` varchar(100) NOT NULL COMMENT 'Nom md5 du fichier image',
  `editor` int(11) DEFAULT NULL COMMENT 'ID de l''éditeur lié à l''image',
  PRIMARY KEY (`id`),
  KEY `Image_ibfk_1` (`list`),
  KEY `Image_ibfk_2` (`editor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `List`
--

CREATE TABLE IF NOT EXISTS `List` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la liste',
  `name` varchar(100) NOT NULL COMMENT 'Nom de la liste',
  `description` varchar(255) DEFAULT NULL COMMENT 'Description de la liste',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `Relation`
--

CREATE TABLE IF NOT EXISTS `Relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la relation',
  `image` int(11) NOT NULL COMMENT 'ID de l''image de la relation',
  `predicate` varchar(100) NOT NULL COMMENT 'Prédicat de relation',
  `annotation1` int(11) NOT NULL COMMENT 'ID de la première annotation de la relation',
  `annotation2` int(11) NOT NULL COMMENT 'ID de la seconde annotation de la relation',
  PRIMARY KEY (`id`),
  KEY `Relation_ibfk_1` (`image`),
  KEY `Relation_ibfk_2` (`annotation1`),
  KEY `Relation_ibfk_3` (`annotation2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Annotation`
--
ALTER TABLE `Annotation`
  ADD CONSTRAINT `Annotation_ibfk_1` FOREIGN KEY (`image`) REFERENCES `Image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Image`
--
ALTER TABLE `Image`
  ADD CONSTRAINT `Image_ibfk_1` FOREIGN KEY (`list`) REFERENCES `List` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Image_ibfk_2` FOREIGN KEY (`editor`) REFERENCES `Editor` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Contraintes pour la table `Relation`
--
ALTER TABLE `Relation`
  ADD CONSTRAINT `Relation_ibfk_1` FOREIGN KEY (`image`) REFERENCES `Image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relation_ibfk_2` FOREIGN KEY (`annotation1`) REFERENCES `Annotation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relation_ibfk_3` FOREIGN KEY (`annotation2`) REFERENCES `Annotation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
