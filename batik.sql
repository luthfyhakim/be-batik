-- MySQL dump 10.13  Distrib 5.7.24, for osx10.9 (x86_64)
--
-- Host: localhost    Database: batik
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'adminpaizupdated','adminpaizupdated','adminpaiz@gmail.com','b4c99ec0bf89ba0108acb0f9da56de99'),(2,'adminhakim','adminhakim','adminhakim@gmail.com','0aea8a500cbc1b2af15c18489f5a6d6d');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daerah`
--

DROP TABLE IF EXISTS `daerah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daerah` (
  `id_daerah` int NOT NULL AUTO_INCREMENT,
  `nama_daerah` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_daerah`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daerah`
--

LOCK TABLES `daerah` WRITE;
/*!40000 ALTER TABLE `daerah` DISABLE KEYS */;
INSERT INTO `daerah` VALUES (1,'Jawa Tengah'),(2,'Jawa Timur');
/*!40000 ALTER TABLE `daerah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategori` (
  `id_kategori` int NOT NULL AUTO_INCREMENT,
  `nama_kategori` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'Pria'),(2,'Wanita'),(3,'Aksesoris');
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produk` (
  `id_produk` int NOT NULL AUTO_INCREMENT,
  `id_daerah` int NOT NULL,
  `id_kategori` int NOT NULL,
  `nama_produk` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `harga` int NOT NULL,
  `deskripsi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `foto` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_produk`),
  KEY `id_daerah` (`id_daerah`),
  KEY `id_kategori` (`id_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
INSERT INTO `produk` VALUES (1,1,1,'Atasan Pria Lengan Pendek',759000,'Atasan pria lengan pendek ini dirancang untuk kenyamanan dan gaya kasual sehari-hari. Terbuat dari bahan katun yang lembut dan ringan, produk ini memberikan sirkulasi udara yang baik dan nyaman dipakai sepanjang hari. Tersedia dalam berbagai warna dan ukuran, atasan ini memiliki potongan modern yang pas di badan tanpa terasa ketat. Kerahnya sederhana dengan detail kancing di depan yang membuatnya mudah dipakai dan dilepas. Cocok untuk acara santai, jalan-jalan, atau dipadukan dengan jaket untuk gaya semi-formal.','display1.jpg'),(2,1,2,'Atasan Wanita Lengan Panjang',1259000,'Atasan wanita lengan panjang ini dirancang dengan elegan untuk tampilan yang chic dan nyaman. Terbuat dari bahan berkualitas tinggi seperti katun atau polyester lembut, atasan ini menawarkan kenyamanan sekaligus keanggunan. Modelnya memiliki potongan longgar yang memudahkan bergerak dan memberikan tampilan stylish tanpa berlebihan. Lengan panjangnya cocok untuk menambah kehangatan dan bisa digulung untuk gaya yang lebih santai. Atasan ini tersedia dalam berbagai pilihan warna, cocok untuk digunakan sehari-hari, di kantor, ataupun acara formal.','display2.png'),(3,2,1,'Atasan Pria Batik Madura',899000,'Atasan pria batik Madura ini menampilkan motif khas yang penuh warna dan detail unik, mencerminkan warisan budaya Madura yang kaya. Terbuat dari bahan katun halus yang nyaman dan menyerap keringat, atasan ini cocok untuk dikenakan dalam berbagai acara, baik formal maupun semi-formal. Potongan atasan ini didesain agar pas di badan dengan kerah tradisional dan kancing depan, memberikan sentuhan klasik dan elegan. Warna-warna cerah dan kontras pada motif batiknya menambah karakter khas Madura, sehingga memberikan kesan stylish namun tetap berkelas. Ideal untuk melengkapi penampilan pria yang ingin tampil beda dengan sentuhan budaya Indonesia.','display3.jpg'),(4,2,2,'Retro Batik Callysta Nusantara',1499000,'Retro Batik Callysta Nusantara adalah atasan batik dengan sentuhan desain retro modern, mengusung motif-motif klasik Nusantara yang penuh warna dan berani. Terbuat dari bahan katun premium yang lembut dan adem, batik ini nyaman dipakai seharian. Dengan kombinasi pola tradisional dan gaya retro, Callysta Nusantara menawarkan perpaduan yang unik antara gaya vintage dan budaya Indonesia, menciptakan tampilan yang elegan dan chic.','display4.jpg'),(5,1,3,'Batik Apricot & Amber Scrunchie',499000,'Batik Apricot & Amber Scrunchie adalah aksesori rambut elegan yang memadukan motif batik tradisional dengan warna-warna aprikot dan amber yang lembut. Dibuat dari kain batik berkualitas tinggi, scrunchie ini halus dan lembut, sehingga nyaman digunakan sepanjang hari tanpa merusak rambut. Pola batik pada kainnya memberikan nuansa etnik yang unik, membuatnya lebih menarik dan cocok dipadukan dengan berbagai gaya, baik casual maupun formal.\n\n','display5.png'),(6,1,2,'Retro Batik Callysta Nusantara Exclusive',1999000,'Retro Batik Callysta Nusantara Exclusive adalah koleksi eksklusif yang mengusung desain batik Nusantara dengan nuansa retro klasik, menonjolkan pola-pola yang berani dan detail halus yang artistik. Setiap atasan dalam koleksi ini terbuat dari kain batik premium dengan teknik pewarnaan khusus, memberikan kualitas yang tahan lama dan tampilan yang lebih elegan. Warna-warna hangat dan earthy seperti coklat, oranye, dan merah marun memberikan kesan vintage yang mewah dan timeless.\n\n','display6.png');
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaksi` (
  `id_transaksi` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NOT NULL,
  `id_user` int NOT NULL,
  `size` enum('S','M','L','XL') COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `harga_total` int NOT NULL,
  `status_pesanan` enum('menunggu_pembayaran','diproses','pengiriman','selesai') COLLATE utf8mb4_general_ci NOT NULL,
  `opsi_bayar` enum('bca','mandiri','bri','bni','dana','shopeepay') COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal_pembelian` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_transaksi`),
  KEY `id_produk` (`id_produk`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (4,1,2,'M',3,120000,'diproses','bca','2024-11-13 06:21:01');
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_general_ci NOT NULL,
  `no_telp` int NOT NULL,
  `foto` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'DonaUpdated','DonaUpdated','dona@gmail.com','8cac6a2da5fcc359a24a9e4e5787f62d','Malang, Jawa Timur',628593308,'1731424516954.png'),(2,'Donda','Donda','donda@gmail.com','49650df2d5aca5ac6cf3c5505fb27d81','Surabaya, Jawa Timur',8212323,'1731477789325.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 23:34:07
