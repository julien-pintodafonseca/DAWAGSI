-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  sam. 01 déc. 2018 à 20:08
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
  `tag` varchar(100) NOT NULL COMMENT 'Tag de l''annotation',
  `position` text NOT NULL COMMENT 'Données de position de l''annotation',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Editor`
--

CREATE TABLE IF NOT EXISTS `Editor` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''éditeur',
  `name` varchar(100) NOT NULL COMMENT 'Nom de l''éditeur',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Image`
--

CREATE TABLE IF NOT EXISTS `Image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''image',
  `originalName` varchar(100) NOT NULL COMMENT 'Nom original de l''image',
  `generatedName` varchar(100) NOT NULL COMMENT 'Nom md5 de l''image',
  `editor` int(11) DEFAULT NULL COMMENT 'ID de l''éditeur lié à l''image',
  PRIMARY KEY (`id`),
  KEY `Image_ibfk_1` (`editor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Image_Annotation`
--

CREATE TABLE IF NOT EXISTS `Image_Annotation` (
  `id` int(11) NOT NULL COMMENT 'ID de la liaison entre Image et Annotation',
  `image` int(11) NOT NULL COMMENT 'ID de l''image',
  `annotation` int(11) NOT NULL COMMENT 'ID de l''annotation',
  PRIMARY KEY (`id`),
  UNIQUE KEY `image` (`image`,`annotation`),
  KEY `Image_Annotation_ibfk_2` (`annotation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Image_Relation`
--

CREATE TABLE IF NOT EXISTS `Image_Relation` (
  `id` int(11) NOT NULL COMMENT 'ID de la liaison entre Image et Relation',
  `image` int(11) NOT NULL COMMENT 'ID de l''image',
  `relation` int(11) NOT NULL COMMENT 'ID de la relation',
  PRIMARY KEY (`id`),
  UNIQUE KEY `image` (`image`,`relation`),
  KEY `Image_Relation_ibfk_2` (`relation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `List`
--

CREATE TABLE IF NOT EXISTS `List` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la liste',
  `name` varchar(100) NOT NULL COMMENT 'Nom de la liste',
  `description` varchar(255) DEFAULT NULL COMMENT 'Description de la liste',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `List_Image`
--

CREATE TABLE IF NOT EXISTS `List_Image` (
  `id` int(11) NOT NULL COMMENT 'ID de la liaison entre List et Image',
  `list` int(11) NOT NULL COMMENT 'ID de la liste',
  `image` int(11) NOT NULL COMMENT 'ID de l''image',
  PRIMARY KEY (`id`),
  UNIQUE KEY `list` (`list`,`image`),
  KEY `List_Image_ibfk_2` (`image`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Relation`
--

CREATE TABLE IF NOT EXISTS `Relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la relation',
  `predicate` varchar(100) NOT NULL COMMENT 'Prédicat de relation',
  `annotation1` int(11) NOT NULL COMMENT 'ID de la première annotation de la relation',
  `annotation2` int(11) NOT NULL COMMENT 'ID de la seconde annotation de la relation',
  PRIMARY KEY (`id`),
  KEY `Relation_ibfk_1` (`annotation1`),
  KEY `Relation_ibfk_2` (`annotation2`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Image`
--
ALTER TABLE `Image`
  ADD CONSTRAINT `Image_ibfk_1` FOREIGN KEY (`editor`) REFERENCES `Editor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Image_Annotation`
--
ALTER TABLE `Image_Annotation`
  ADD CONSTRAINT `Image_Annotation_ibfk_1` FOREIGN KEY (`image`) REFERENCES `Image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Image_Annotation_ibfk_2` FOREIGN KEY (`annotation`) REFERENCES `Annotation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Image_Relation`
--
ALTER TABLE `Image_Relation`
  ADD CONSTRAINT `Image_Relation_ibfk_1` FOREIGN KEY (`image`) REFERENCES `Image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Image_Relation_ibfk_2` FOREIGN KEY (`relation`) REFERENCES `Relation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `List_Image`
--
ALTER TABLE `List_Image`
  ADD CONSTRAINT `List_Image_ibfk_1` FOREIGN KEY (`list`) REFERENCES `List` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `List_Image_ibfk_2` FOREIGN KEY (`image`) REFERENCES `Image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Relation`
--
ALTER TABLE `Relation`
  ADD CONSTRAINT `Relation_ibfk_1` FOREIGN KEY (`annotation1`) REFERENCES `Annotation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relation_ibfk_2` FOREIGN KEY (`annotation2`) REFERENCES `Annotation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
