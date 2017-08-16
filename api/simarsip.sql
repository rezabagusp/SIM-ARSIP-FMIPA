-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2017 at 05:26 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simarsip`
--

-- --------------------------------------------------------

--
-- Table structure for table `jabatans`
--

CREATE TABLE `jabatans` (
  `id` int(11) NOT NULL,
  `nama_jabatan` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jabatans`
--

INSERT INTO `jabatans` (`id`, `nama_jabatan`, `createdAt`, `updatedAt`) VALUES
(1, 'Lainnya', '2017-08-15 11:24:42', '2017-08-15 11:24:42'),
(2, 'Dekan FMIPA IPB', '2017-08-15 11:24:42', '2017-08-15 11:24:42'),
(3, 'Wakil Dekan Bidang Akademik FMIPA IPB', '2017-08-15 11:24:42', '2017-08-15 11:24:42'),
(4, 'Wakil Dekan Bidang SKP FMIPA IPB', '2017-08-15 11:24:42', '2017-08-15 11:24:42'),
(5, 'Manajer FABLAB FMIPA IPB', '2017-08-15 11:24:42', '2017-08-15 11:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_surats`
--

CREATE TABLE `jenis_surats` (
  `id` int(11) NOT NULL,
  `nomor_jenis_surat` varchar(255) DEFAULT NULL,
  `nama_jenis_surat` varchar(255) DEFAULT NULL,
  `kode_surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kode_surats`
--

CREATE TABLE `kode_surats` (
  `id` int(11) NOT NULL,
  `kode_surat` varchar(255) DEFAULT NULL,
  `nama_kode_surat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lampirans`
--

CREATE TABLE `lampirans` (
  `id` int(11) NOT NULL,
  `judul_lampiran` varchar(255) DEFAULT NULL,
  `tanggal_lampiran` datetime DEFAULT NULL,
  `tanggal_entri_lampiran` datetime DEFAULT NULL,
  `file_lampiran` varchar(255) DEFAULT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lampirans`
--

INSERT INTO `lampirans` (`id`, `judul_lampiran`, `tanggal_lampiran`, `tanggal_entri_lampiran`, `file_lampiran`, `surat_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Undangan', '2017-08-15 11:49:00', '2017-08-15 11:49:00', 'lampiran-1502772454027.pdf', 98, '2017-08-15 11:51:38', '2017-08-15 14:33:44');

-- --------------------------------------------------------

--
-- Table structure for table `perihals`
--

CREATE TABLE `perihals` (
  `id` int(11) NOT NULL,
  `nama_perihal` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perihals`
--

INSERT INTO `perihals` (`id`, `nama_perihal`, `createdAt`, `updatedAt`) VALUES
(1, 'Undangan', '2017-08-15 11:26:43', '2017-08-15 11:26:43'),
(2, 'Surat Edaran', '2017-08-15 11:26:43', '2017-08-15 11:26:43'),
(3, 'Permohonan', '2017-08-15 11:26:43', '2017-08-15 11:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `id` int(11) NOT NULL,
  `nama_staff` varchar(255) DEFAULT NULL,
  `email_staff` varchar(255) DEFAULT NULL,
  `jabatan_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staffs`
--

INSERT INTO `staffs` (`id`, `nama_staff`, `email_staff`, `jabatan_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Prof. Dr. Muhammad Aslam Abdurrohim, M.Si, S.Komp', 'm.aslam.abdurrohim@gmail.com', 1, '2017-08-15 11:27:52', '2017-08-15 11:27:52'),
(2, 'Dr. Ir. Sri Nurdiati M.Sc', 'm.aslam.abdurrohim@gmail.com', 2, '2017-08-15 11:27:52', '2017-08-15 11:27:52'),
(3, 'Dr. Ir. Kgs. Dahlan', 'm.aslam.abdurrohim@gmail.com', 3, '2017-08-15 11:27:52', '2017-08-15 11:27:52'),
(4, 'Dr. Ir. Hamim, M.Si', 'm.aslam.abdurrohim@gmail.com', 4, '2017-08-15 11:27:52', '2017-08-15 11:27:52'),
(5, 'Ir. Meuthia Rachmaniah, M.Sc.', 'm.aslam.abdurrohim@gmail.com', 5, '2017-08-15 11:27:52', '2017-08-15 11:27:52');

-- --------------------------------------------------------

--
-- Table structure for table `sub_jenis_surats`
--

CREATE TABLE `sub_jenis_surats` (
  `id` int(11) NOT NULL,
  `nomor_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `nama_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `jenis_surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_sub_jenis_surats`
--

CREATE TABLE `sub_sub_jenis_surats` (
  `id` int(11) NOT NULL,
  `nomor_sub_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `nama_sub_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `retensi_aktif_sub_sub_jenis_surat` int(11) DEFAULT NULL,
  `retensi_inaktif_sub_sub_jenis_surat` int(11) DEFAULT NULL,
  `perlakuan_sub_sub_jenis_surat` enum('Musnah','Permanen','Dinilai Kembali','Setelah 10 tahun diaudit') DEFAULT NULL,
  `nilai_sub_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `sub_jenis_surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `surats`
--

CREATE TABLE `surats` (
  `id` int(11) NOT NULL,
  `nomor_surat` int(11) DEFAULT NULL,
  `unit_kerja_surat` varchar(255) DEFAULT NULL,
  `hal_surat` varchar(255) DEFAULT NULL,
  `tahun_surat` int(11) DEFAULT NULL,
  `tanggal_surat` datetime DEFAULT NULL,
  `tanggal_terima_surat` datetime DEFAULT NULL,
  `tanggal_entri_surat` datetime DEFAULT NULL,
  `sifat_surat` enum('rahasia','biasa') DEFAULT NULL,
  `tipe_surat` enum('masuk','keluar') DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `status_surat` enum('aktif','inaktif') DEFAULT 'aktif',
  `perihal_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surats`
--

INSERT INTO `surats` (`id`, `nomor_surat`, `unit_kerja_surat`, `hal_surat`, `tahun_surat`, `tanggal_surat`, `tanggal_terima_surat`, `tanggal_entri_surat`, `sifat_surat`, `tipe_surat`, `file_surat`, `status_surat`, `perihal_id`, `createdAt`, `updatedAt`) VALUES
(4, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-07 14:38:36', '2017-08-07 15:41:54'),
(5, 1, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-07 14:38:44', '2017-08-07 14:38:44'),
(6, 1, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:38:57', '2017-08-07 14:38:57'),
(7, 1, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:39:05', '2017-08-07 14:39:05'),
(8, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:39:13', '2017-08-07 14:39:13'),
(9, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:39:24', '2017-08-07 14:39:24'),
(10, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:39:31', '2017-08-07 14:39:31'),
(11, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', NULL, NULL, 'aktif', 1, '2017-08-07 14:41:05', '2017-08-07 14:41:05'),
(12, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', NULL, 'aktif', 1, '2017-08-07 14:41:13', '2017-08-07 14:41:13'),
(13, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-07 14:41:21', '2017-08-07 14:41:21'),
(14, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-07 14:41:46', '2017-08-07 14:41:46'),
(15, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-07 14:42:42', '2017-08-07 14:42:42'),
(16, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:25:21', '2017-08-10 12:25:21'),
(17, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:26:23', '2017-08-10 12:26:23'),
(18, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', '', 1, '2017-08-10 12:27:24', '2017-08-10 12:27:24'),
(19, 1, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:27:55', '2017-08-10 12:27:55'),
(20, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:28:02', '2017-08-10 12:28:02'),
(23, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:28:22', '2017-08-10 12:28:22'),
(25, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-10 12:29:22', '2017-08-10 12:29:22'),
(26, 2, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-10 12:30:17', '2017-08-10 12:30:17'),
(27, 2, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-10 12:30:34', '2017-08-10 12:30:34'),
(28, 2, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-10 12:30:56', '2017-08-10 12:30:56'),
(29, 2, '1', 'PP.00', 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', 1, '2017-08-10 12:32:10', '2017-08-10 12:32:10'),
(32, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:47:11', '2017-08-10 12:47:11'),
(33, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:55:15', '2017-08-10 12:55:15'),
(34, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:55:26', '2017-08-10 12:55:26'),
(35, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:55:28', '2017-08-10 12:55:28'),
(36, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:56:49', '2017-08-10 12:56:49'),
(37, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:57:56', '2017-08-10 12:57:56'),
(38, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:58:36', '2017-08-10 12:58:36'),
(39, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 12:59:21', '2017-08-10 12:59:21'),
(40, 2, '1', 'PP.00', 2017, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'biasa', 'masuk', 'surat-16171819.pdf', 'aktif', 1, '2017-08-10 13:00:14', '2017-08-10 13:00:14'),
(41, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 15:58:04', '2017-08-14 15:58:04'),
(42, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 20:44:40', '2017-08-14 20:44:40'),
(43, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 21:12:54', '2017-08-14 21:12:54'),
(44, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 21:20:41', '2017-08-14 21:20:41'),
(45, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 22:04:10', '2017-08-14 22:04:10'),
(46, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 22:52:12', '2017-08-14 22:52:12'),
(47, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 22:53:01', '2017-08-14 22:53:01'),
(48, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 22:53:26', '2017-08-14 22:53:26'),
(49, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 22:53:48', '2017-08-14 22:53:48'),
(50, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 23:36:24', '2017-08-14 23:36:24'),
(51, 197, NULL, NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-14 23:37:43', '2017-08-14 23:37:43'),
(54, 197, '0', NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-15 08:33:29', '2017-08-15 08:33:29'),
(55, 197, '0', NULL, NULL, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-15 08:35:07', '2017-08-15 08:35:07'),
(56, 197, '0', NULL, 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-15 08:35:38', '2017-08-15 08:35:38'),
(57, 197, '0', NULL, 2017, NULL, NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-15 08:35:50', '2017-08-15 08:35:50'),
(58, 197, '0', NULL, 2017, '2017-08-14 10:00:00', NULL, NULL, 'biasa', NULL, NULL, 'aktif', NULL, '2017-08-15 08:36:00', '2017-08-15 08:36:00'),
(59, 197, '0', NULL, 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:36:13', '2017-08-15 08:36:13'),
(60, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:37:20', '2017-08-15 08:37:20'),
(61, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:42:18', '2017-08-15 08:42:18'),
(62, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:48:10', '2017-08-15 08:48:10'),
(63, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:52:02', '2017-08-15 08:52:02'),
(64, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:52:03', '2017-08-15 08:52:03'),
(65, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:52:03', '2017-08-15 08:52:03'),
(66, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:52:41', '2017-08-15 08:52:41'),
(67, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:54:14', '2017-08-15 08:54:14'),
(68, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:55:37', '2017-08-15 08:55:37'),
(69, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:58:20', '2017-08-15 08:58:20'),
(70, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 08:58:27', '2017-08-15 08:58:27'),
(71, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:00:28', '2017-08-15 09:00:28'),
(72, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:01:36', '2017-08-15 09:01:36'),
(73, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:02:43', '2017-08-15 09:02:43'),
(74, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:04:18', '2017-08-15 09:04:18'),
(75, 197, '0', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:09:44', '2017-08-15 09:09:44'),
(76, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:12:29', '2017-08-15 09:12:29'),
(77, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:18:20', '2017-08-15 09:18:20'),
(78, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', NULL, '2017-08-15 09:19:18', '2017-08-15 09:19:18'),
(79, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 09:22:29', '2017-08-15 09:22:29'),
(80, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 09:25:12', '2017-08-15 09:25:12'),
(81, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 09:25:21', '2017-08-15 09:25:21'),
(82, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:35', '2017-08-15 12:01:35'),
(83, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:37', '2017-08-15 12:01:37'),
(84, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(85, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(86, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(87, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(88, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(89, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(90, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(91, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'masuk', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:41', '2017-08-15 12:01:41'),
(92, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:52', '2017-08-15 12:01:52'),
(93, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(94, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(95, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:55', '2017-08-15 12:01:55'),
(96, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', NULL, 'keluar', 'surat-17080990.pdf', 'aktif', 1, '2017-08-15 12:01:56', '2017-08-15 12:01:56'),
(98, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'biasa', 'keluar', 'surat-1502778548541.pdf', 'aktif', 1, '2017-08-15 13:28:57', '2017-08-15 14:33:57');

-- --------------------------------------------------------

--
-- Table structure for table `surat_keluar_penerimas`
--

CREATE TABLE `surat_keluar_penerimas` (
  `id` int(11) NOT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `nama_penerima` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surat_keluar_penerimas`
--

INSERT INTO `surat_keluar_penerimas` (`id`, `surat_id`, `nama_penerima`, `createdAt`, `updatedAt`) VALUES
(1, 92, 'Muhammad Aslam Abdurrohim', '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(2, 93, 'Muhammad Aslam Abdurrohim', '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(3, 94, 'Muhammad Aslam Abdurrohim', '2017-08-15 12:01:54', '2017-08-15 12:01:54'),
(7, 98, 'Muhammad Aslam Abdurrohim', '2017-08-15 13:28:59', '2017-08-15 13:28:59');

-- --------------------------------------------------------

--
-- Table structure for table `surat_keluar_pengirims`
--

CREATE TABLE `surat_keluar_pengirims` (
  `id` int(11) NOT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surat_keluar_pengirims`
--

INSERT INTO `surat_keluar_pengirims` (`id`, `surat_id`, `staff_id`, `createdAt`, `updatedAt`) VALUES
(1, 92, 1, '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(2, 93, 1, '2017-08-15 12:01:53', '2017-08-15 12:01:53'),
(3, 94, 1, '2017-08-15 12:01:54', '2017-08-15 12:01:54'),
(7, 98, 1, '2017-08-15 13:28:58', '2017-08-15 13:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `surat_masuk_penerimas`
--

CREATE TABLE `surat_masuk_penerimas` (
  `id` int(11) NOT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `status_disposisi_penerima` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surat_masuk_penerimas`
--

INSERT INTO `surat_masuk_penerimas` (`id`, `surat_id`, `staff_id`, `status_disposisi_penerima`, `createdAt`, `updatedAt`) VALUES
(1, 82, 1, 0, '2017-08-15 12:01:35', '2017-08-15 12:01:35'),
(2, 83, 1, 0, '2017-08-15 12:01:37', '2017-08-15 12:01:37'),
(3, 84, 1, 0, '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(4, 85, 1, 0, '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(5, 86, 1, 0, '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(6, 87, 1, 0, '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(7, 88, 1, 0, '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(8, 89, 1, 0, '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(9, 90, 1, 0, '2017-08-15 12:01:41', '2017-08-15 12:01:41'),
(10, 91, 1, 0, '2017-08-15 12:01:41', '2017-08-15 12:01:41'),
(11, 91, 1, 1, '2017-08-16 08:42:20', '2017-08-16 08:42:20'),
(12, 91, 2, 1, '2017-08-16 08:42:20', '2017-08-16 08:42:20'),
(13, 91, 1, 2, '2017-08-16 08:47:10', '2017-08-16 08:47:10'),
(14, 91, 2, 2, '2017-08-16 08:47:10', '2017-08-16 08:47:10');

-- --------------------------------------------------------

--
-- Table structure for table `surat_masuk_pengirims`
--

CREATE TABLE `surat_masuk_pengirims` (
  `id` int(11) NOT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `nama_pengirim` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surat_masuk_pengirims`
--

INSERT INTO `surat_masuk_pengirims` (`id`, `surat_id`, `nama_pengirim`, `createdAt`, `updatedAt`) VALUES
(1, 82, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:35', '2017-08-15 12:01:35'),
(2, 83, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:37', '2017-08-15 12:01:37'),
(3, 84, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(4, 85, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:38', '2017-08-15 12:01:38'),
(5, 86, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(6, 87, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:39', '2017-08-15 12:01:39'),
(7, 88, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(8, 89, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(9, 90, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:40', '2017-08-15 12:01:40'),
(10, 91, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-15 12:01:41', '2017-08-15 12:01:41');

-- --------------------------------------------------------

--
-- Table structure for table `unit_kerjas`
--

CREATE TABLE `unit_kerjas` (
  `id` int(11) NOT NULL,
  `nama_unit_kerja` varchar(255) DEFAULT NULL,
  `akronim_unit_kerja` varchar(255) DEFAULT NULL,
  `kode_unit_kerja` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `password_user` varchar(255) DEFAULT NULL,
  `role_user` enum('superadmin','admin') DEFAULT NULL,
  `lupa_pass_user` tinyint(1) DEFAULT '0',
  `token_lupa_pass_user` text,
  `status_user` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama_user`, `email_user`, `password_user`, `role_user`, `lupa_pass_user`, `token_lupa_pass_user`, `status_user`, `createdAt`, `updatedAt`) VALUES
(1, 'Reza Bagus Permana', 'reazabagus.permana.qrbp@gmail.com', '9301393d73b9d42381b940d989b15fd49278d767d394b0f6781e6284e9c91391', 'superadmin', 0, NULL, 1, '2017-08-15 11:54:24', '2017-08-15 11:54:24'),
(2, 'Muhammad Aslam Abdurrohim', 'aslamabdurrohim@gmail.com', 'c557806bfe65c8a58fc1e5d492b61b8dac5cfc05f33fcd434cbb5540bd9c7a97', 'superadmin', 0, NULL, 1, '2017-08-15 11:55:03', '2017-08-15 11:55:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jabatans`
--
ALTER TABLE `jabatans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis_surats`
--
ALTER TABLE `jenis_surats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kode_surat_id` (`kode_surat_id`);

--
-- Indexes for table `kode_surats`
--
ALTER TABLE `kode_surats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lampirans`
--
ALTER TABLE `lampirans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`);

--
-- Indexes for table `perihals`
--
ALTER TABLE `perihals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jabatan_id` (`jabatan_id`);

--
-- Indexes for table `sub_jenis_surats`
--
ALTER TABLE `sub_jenis_surats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jenis_surat_id` (`jenis_surat_id`);

--
-- Indexes for table `sub_sub_jenis_surats`
--
ALTER TABLE `sub_sub_jenis_surats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_jenis_surat_id` (`sub_jenis_surat_id`);

--
-- Indexes for table `surats`
--
ALTER TABLE `surats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perihal_id` (`perihal_id`);

--
-- Indexes for table `surat_keluar_penerimas`
--
ALTER TABLE `surat_keluar_penerimas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`);

--
-- Indexes for table `surat_keluar_pengirims`
--
ALTER TABLE `surat_keluar_pengirims`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `surat_masuk_penerimas`
--
ALTER TABLE `surat_masuk_penerimas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`);

--
-- Indexes for table `unit_kerjas`
--
ALTER TABLE `unit_kerjas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_user` (`email_user`),
  ADD UNIQUE KEY `users_email_user_unique` (`email_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jabatans`
--
ALTER TABLE `jabatans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `jenis_surats`
--
ALTER TABLE `jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `kode_surats`
--
ALTER TABLE `kode_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `lampirans`
--
ALTER TABLE `lampirans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `perihals`
--
ALTER TABLE `perihals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `sub_jenis_surats`
--
ALTER TABLE `sub_jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_sub_jenis_surats`
--
ALTER TABLE `sub_sub_jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surats`
--
ALTER TABLE `surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `surat_keluar_penerimas`
--
ALTER TABLE `surat_keluar_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `surat_keluar_pengirims`
--
ALTER TABLE `surat_keluar_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `surat_masuk_penerimas`
--
ALTER TABLE `surat_masuk_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `unit_kerjas`
--
ALTER TABLE `unit_kerjas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `jenis_surats`
--
ALTER TABLE `jenis_surats`
  ADD CONSTRAINT `jenis_surats_ibfk_1` FOREIGN KEY (`kode_surat_id`) REFERENCES `kode_surats` (`id`);

--
-- Constraints for table `lampirans`
--
ALTER TABLE `lampirans`
  ADD CONSTRAINT `lampirans_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`);

--
-- Constraints for table `staffs`
--
ALTER TABLE `staffs`
  ADD CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`jabatan_id`) REFERENCES `jabatans` (`id`);

--
-- Constraints for table `sub_jenis_surats`
--
ALTER TABLE `sub_jenis_surats`
  ADD CONSTRAINT `sub_jenis_surats_ibfk_1` FOREIGN KEY (`jenis_surat_id`) REFERENCES `jenis_surats` (`id`);

--
-- Constraints for table `sub_sub_jenis_surats`
--
ALTER TABLE `sub_sub_jenis_surats`
  ADD CONSTRAINT `sub_sub_jenis_surats_ibfk_1` FOREIGN KEY (`sub_jenis_surat_id`) REFERENCES `sub_jenis_surats` (`id`);

--
-- Constraints for table `surats`
--
ALTER TABLE `surats`
  ADD CONSTRAINT `surats_ibfk_1` FOREIGN KEY (`perihal_id`) REFERENCES `perihals` (`id`);

--
-- Constraints for table `surat_keluar_penerimas`
--
ALTER TABLE `surat_keluar_penerimas`
  ADD CONSTRAINT `surat_keluar_penerimas_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`);

--
-- Constraints for table `surat_keluar_pengirims`
--
ALTER TABLE `surat_keluar_pengirims`
  ADD CONSTRAINT `surat_keluar_pengirims_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`),
  ADD CONSTRAINT `surat_keluar_pengirims_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`);

--
-- Constraints for table `surat_masuk_penerimas`
--
ALTER TABLE `surat_masuk_penerimas`
  ADD CONSTRAINT `surat_masuk_penerimas_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`),
  ADD CONSTRAINT `surat_masuk_penerimas_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`);

--
-- Constraints for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  ADD CONSTRAINT `surat_masuk_pengirims_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
