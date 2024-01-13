-- MySQL dump 10.13  Distrib 8.0.31, for macos12.6 (x86_64)
--
-- Host: localhost    Database: mmo_blog
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ads`
--

DROP TABLE IF EXISTS `ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organization` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dimension` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usingIn` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `imageShow` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adsScript` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `click` int DEFAULT NULL,
  `totalView` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads`
--

LOCK TABLES `ads` WRITE;
/*!40000 ALTER TABLE `ads` DISABLE KEYS */;
/*!40000 ALTER TABLE `ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ads_reference`
--

DROP TABLE IF EXISTS `ads_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ads_reference` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adsId` int DEFAULT NULL,
  `adsPositionId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adsPositionFx` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dateFrom` datetime DEFAULT NULL,
  `dateTo` datetime DEFAULT NULL,
  `alwayShow` tinyint(1) DEFAULT '0',
  `behavior` enum('new_tab','new_window','redirect','open_inapp') COLLATE utf8mb4_general_ci DEFAULT 'new_tab',
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads_reference`
--

LOCK TABLES `ads_reference` WRITE;
/*!40000 ALTER TABLE `ads_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `ads_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `totalStory` int DEFAULT '0',
  `avatarId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '1',
  `shortDesc` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fullDesc` text COLLATE utf8mb4_general_ci,
  `seoTitle` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoDesc` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoKeywords` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `totalView` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author_has_story`
--

DROP TABLE IF EXISTS `author_has_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_has_story` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int DEFAULT NULL,
  `storyId` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `author_has_story_author_id_story_id` (`authorId`,`storyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_has_story`
--

LOCK TABLES `author_has_story` WRITE;
/*!40000 ALTER TABLE `author_has_story` DISABLE KEYS */;
/*!40000 ALTER TABLE `author_has_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parentId` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `position` int DEFAULT '1',
  `flag` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coverId` int DEFAULT NULL,
  `shortDesc` text COLLATE utf8mb4_general_ci,
  `fullDesc` text COLLATE utf8mb4_general_ci,
  `seoTitle` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoDesc` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoKeyword` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `totalView` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_has_story`
--

DROP TABLE IF EXISTS `category_has_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_has_story` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoryId` int DEFAULT NULL,
  `storyId` int DEFAULT NULL,
  `categoryParentId` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_has_story_category_id_story_id` (`categoryId`,`storyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_has_story`
--

LOCK TABLES `category_has_story` WRITE;
/*!40000 ALTER TABLE `category_has_story` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_has_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `storyId` int DEFAULT NULL,
  `name` varchar(512) COLLATE utf8mb4_general_ci NOT NULL,
  `nameUnique` varchar(512) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slugUnique` varchar(512) COLLATE utf8mb4_general_ci NOT NULL,
  `story_contentOrder` int DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_crawler_1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_crawler_2` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_crawler_3` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'null',
  `position` int DEFAULT '1',
  `adsScript` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT '[]',
  `flag` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '[]',
  `icon` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '1',
  `images` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shortDescription` text COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `description2` text COLLATE utf8mb4_general_ci,
  `view` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nameUnique` (`nameUnique`),
  UNIQUE KEY `slugUnique` (`slugUnique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parentId` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `position` int DEFAULT '1',
  `flag` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coverId` int DEFAULT NULL,
  `shortDesc` text COLLATE utf8mb4_general_ci,
  `fullDesc` text COLLATE utf8mb4_general_ci,
  `seoTitle` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoDesc` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoKeyword` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `totalView` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_has_story`
--

DROP TABLE IF EXISTS `collection_has_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_has_story` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `collectionId` int DEFAULT NULL,
  `storyId` int DEFAULT NULL,
  `type` int DEFAULT '1',
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `collection_has_story_collection_id_story_id` (`collectionId`,`storyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_has_story`
--

LOCK TABLES `collection_has_story` WRITE;
/*!40000 ALTER TABLE `collection_has_story` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_has_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `filename` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inside` tinyint(1) DEFAULT '1',
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `alt` (`alt`),
  UNIQUE KEY `filename` (`filename`),
  UNIQUE KEY `path` (`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grouprole`
--

DROP TABLE IF EXISTS `grouprole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grouprole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` int DEFAULT '3',
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouprole`
--

LOCK TABLES `grouprole` WRITE;
/*!40000 ALTER TABLE `grouprole` DISABLE KEYS */;
/*!40000 ALTER TABLE `grouprole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grouprole_has_permission`
--

DROP TABLE IF EXISTS `grouprole_has_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grouprole_has_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int DEFAULT NULL,
  `permissionId` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grouprole_has_permission_20204829_unique` (`groupId`,`permissionId`),
  KEY `grouprole_has_permission_group_id_permission_id` (`groupId`,`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouprole_has_permission`
--

LOCK TABLES `grouprole_has_permission` WRITE;
/*!40000 ALTER TABLE `grouprole_has_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `grouprole_has_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `route` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `method` enum('GET','HEAD','POST','PUST','DELETE','CONNECT','OPTIONS','TRACE') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('2020071595298673-user_token.js'),('2020071595298891-grouprole.js'),('2020071595299706-grouprole_has_permission.js'),('2020071595299740-media.js'),('2020071595300268-setting.js'),('2020071595300336-user.js'),('2020071595303891-permission.js'),('2020101602604455-category.js'),('2020101602606528-author.js'),('2020101602606528-collection.js'),('2020101602690962-story.js'),('2020101602691319-story_content.js'),('2020101602691443-ads.js'),('2020101602691443-tag.js'),('2020101602691974-category_has_story.js'),('2020101602691983-author_has_story.js'),('2020101602691983-collection_has_story.js'),('2020101602691989-ads_reference.js'),('2020101602691989-tag_has_story.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `type` (`type`),
  UNIQUE KEY `icon` (`icon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `seoTitle` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `seoDesc` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `seoKeywords` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coverId` varchar(512) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `shortDesc` text COLLATE utf8mb3_unicode_ci,
  `fullDesc` text COLLATE utf8mb3_unicode_ci,
  `refOutsite` varchar(512) COLLATE utf8mb3_unicode_ci DEFAULT '{}',
  `view` int DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `createdBy` int DEFAULT NULL,
  `updatedBy` int DEFAULT NULL,
  `publishedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoTitle` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoDesc` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seoKeywords` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isStory` tinyint(1) DEFAULT '0',
  `link` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` int DEFAULT '1',
  `adsScript` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT '[]',
  `flag` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '[]',
  `view` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_has_story`
--

DROP TABLE IF EXISTS `tag_has_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_has_story` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tagId` int DEFAULT NULL,
  `storyId` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_has_story_tag_id_story_id` (`tagId`,`storyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_has_story`
--

LOCK TABLES `tag_has_story` WRITE;
/*!40000 ALTER TABLE `tag_has_story` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_has_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `images` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` int DEFAULT '3',
  `grouproleId` int DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '2',
  `updatedBy` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-24 22:16:09
