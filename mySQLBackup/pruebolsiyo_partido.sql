-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: pruebolsiyo
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partido`
--

DROP TABLE IF EXISTS `partido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroPartido` int NOT NULL,
  `resultado` varchar(45) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `arbitro` varchar(45) DEFAULT NULL,
  `idSede` int NOT NULL,
  `idFase` int NOT NULL,
  `idEquipoLocal` int DEFAULT NULL,
  `idEquipoVisitante` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numeroPartido_UNIQUE` (`numeroPartido`),
  KEY `idSede_idx` (`idSede`),
  KEY `idFase_idx` (`idFase`),
  KEY `idEquipoLocal_idx` (`idEquipoLocal`),
  KEY `idEquipoVisitante_idx` (`idEquipoVisitante`),
  CONSTRAINT `idEquipoLocal` FOREIGN KEY (`idEquipoLocal`) REFERENCES `equipo` (`id`),
  CONSTRAINT `idEquipoVisitante` FOREIGN KEY (`idEquipoVisitante`) REFERENCES `equipo` (`id`),
  CONSTRAINT `idFase` FOREIGN KEY (`idFase`) REFERENCES `fase` (`id`),
  CONSTRAINT `idSede` FOREIGN KEY (`idSede`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partido`
--

LOCK TABLES `partido` WRITE;
/*!40000 ALTER TABLE `partido` DISABLE KEYS */;
INSERT INTO `partido` VALUES (1,1,'1-0','2021-06-13 18:00:00','por definir',5,1,1,2),(2,2,'-','2021-06-13 21:00:00','por definir',6,1,3,5),(3,3,'-','2021-06-17 18:00:00','por definir',6,1,2,5),(4,4,'-','2021-06-17 21:00:00','por definir',7,1,1,4),(5,5,'-','2021-06-20 17:00:00','por definir',6,1,4,2),(6,6,'-','2021-06-20 20:00:00','por definir',5,1,1,3),(7,7,'-','2021-06-23 18:00:00','por definir',7,1,5,4),(8,8,'-','2021-06-23 21:00:00','por definir',8,1,2,3),(9,9,'-','2021-06-27 18:00:00','por definir',5,1,5,1),(10,10,'-','2021-06-27 18:00:00','por definir',8,1,4,3),(11,11,'-','2021-06-14 18:00:00','Por definir',3,2,6,7),(12,12,'-','2021-06-14 21:00:00','Por definir',1,2,10,9),(13,13,'-','2021-06-18 18:00:00','Por definir',3,2,10,7),(14,14,'-','2021-06-18 21:00:00','Por definir',4,2,8,6),(15,15,'-','2021-06-21 17:00:00','Por definir',2,2,7,9),(16,16,'-','2021-06-21 20:00:00','Por definir',4,2,10,8),(17,17,'-','2021-06-24 17:00:00','Por definir',4,2,9,8),(18,18,'-','2021-06-24 20:00:00','Por definir',1,2,6,10),(19,19,'-','2021-06-28 20:00:00','Por definir',2,2,9,6),(20,20,'-','2021-06-28 20:00:00','Por definir',3,2,7,8);
/*!40000 ALTER TABLE `partido` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-26 18:01:36
