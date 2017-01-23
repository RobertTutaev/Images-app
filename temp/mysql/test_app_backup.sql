-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: test_app
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name_orig` varchar(255) NOT NULL,
  `name_temp` varchar(255) NOT NULL,
  `comment` text,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`),
  KEY `fk_users` (`user_id`),
  CONSTRAINT `fk_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,1,'x_cb025fb4.jpg','54174e545c816565d58913e281d50c2e','','2016-06-09 06:44:08'),(2,1,'cs-2.jpg','d10a40402390ef04d18437b08d274b9b','','2016-06-09 06:44:40'),(3,1,'1262985014_demotivatori017[1].jpg','064c9c8304cde93b5d941078baff072b','','2016-06-09 06:45:49'),(4,1,'66.JPG','1d5efcdb33693200c4cb15076d378ad1','','2016-06-09 06:46:48'),(5,1,'779.JPG','560c49dca02db219fdaa46cd658e2907','','2016-06-09 06:49:01'),(6,1,'078z.jpg','a199cd05c818e7c5236f1b760665abed','','2016-06-09 06:50:50'),(7,1,'f35816.jpg','8df051cf351700f32e9ec99d7678fa8b','','2016-06-09 06:51:20'),(8,1,'moon.jpg','665a57568389bc93d9a6e5edace7ca00','','2016-06-09 06:52:34'),(9,2,'Знание-сила.jpg','ed16bd57ed48429da9f1ad70d2dd7f4f','','2016-06-09 06:54:12'),(10,2,'a16c16a719671960f3c1a9aea443f88c.jpg','18f81a973317b40823af76d3b6293c62','','2016-06-09 06:55:23'),(11,2,'Утес.jpg','09b11ef9eccd91f6bb5896fa2da812a1','','2016-06-09 06:55:35'),(12,2,'01_green_wallpapers.jpg','80d2126382d4708a4b437c699deb6bcf','','2016-06-09 07:26:10');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1','$2a$10$0FFm8MjafltC03pWeL/JqubNYXc/L1HbA7GxYgxUaWWxR.Fh/Oi/W',0),(2,'2','$2a$10$nXo1I5ZX2QR.42p5G2IQ7eb41AcmSA0clTrzd7LsnyLu4Tjzvnbai',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test_app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-09 12:33:48
