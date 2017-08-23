-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2017 at 03:45 AM
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
(1, 'Dekan FMIPA IPB', '2017-08-18 14:49:56', '2017-08-18 14:49:56'),
(2, 'Dekan FMIPA IPB', '2017-08-18 14:49:56', '2017-08-18 14:49:56'),
(3, 'Dekan FMIPA IPB', '2017-08-18 14:49:56', '2017-08-18 14:49:56');

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
(1, 'Undangan', '2017-08-15 11:49:00', '2017-08-15 11:49:00', 'lampiran-1503251669296.pdf', 144, '2017-08-21 00:54:51', '2017-08-22 15:32:39'),
(2, 'Undangan', '2017-08-15 11:49:00', '2017-08-15 11:49:00', 'lampiran-1503251698814.pdf', 144, '2017-08-21 00:55:12', '2017-08-22 15:32:39');

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
(1, 'Undangan', '2017-08-18 14:49:39', '2017-08-18 14:49:39'),
(2, 'Undangan', '2017-08-18 14:49:41', '2017-08-18 14:49:41'),
(3, 'Undangan', '2017-08-18 14:49:42', '2017-08-18 14:49:42'),
(4, 'Undangan', '2017-08-18 14:49:42', '2017-08-18 14:49:42'),
(5, 'Undangan', '2017-08-18 14:49:43', '2017-08-18 14:49:43'),
(6, 'Undangan', '2017-08-18 14:49:44', '2017-08-18 14:49:44'),
(7, 'Undangan', '2017-08-18 14:49:45', '2017-08-18 14:49:45');

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
(1, 'Muhammad Aslam Abdurrohim', 'aslamabdurrohim@gmail.com', 1, '2017-08-18 14:52:51', '2017-08-18 14:52:51'),
(2, 'Aslam Abdurrohim', 'm.aslam.abdurrohim@gmail.com', 2, '2017-08-18 14:53:02', '2017-08-18 14:53:02'),
(3, 'Abdurrohim', 'm.aslam.abdurrohim@gmail.com', 3, '2017-08-18 14:59:16', '2017-08-18 14:59:16');

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
  `nomor_surat` int(11) NOT NULL,
  `unit_kerja_surat` varchar(255) NOT NULL,
  `hal_surat` varchar(255) NOT NULL,
  `tahun_surat` int(11) NOT NULL,
  `tanggal_surat` datetime NOT NULL,
  `tanggal_terima_surat` datetime NOT NULL,
  `tanggal_entri_surat` datetime NOT NULL,
  `sifat_surat` enum('rahasia','umum') DEFAULT 'umum',
  `asal_surat` enum('internal','eksternal') NOT NULL DEFAULT 'internal',
  `kepentingan_surat` enum('segera','biasa') DEFAULT 'biasa',
  `tipe_surat` enum('masuk','keluar') NOT NULL,
  `keterangan_surat` text,
  `file_surat` varchar(255) NOT NULL,
  `status_surat` enum('aktif','inaktif') DEFAULT 'aktif',
  `posisi_surat` text NOT NULL,
  `perihal_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surats`
--

INSERT INTO `surats` (`id`, `nomor_surat`, `unit_kerja_surat`, `hal_surat`, `tahun_surat`, `tanggal_surat`, `tanggal_terima_surat`, `tanggal_entri_surat`, `sifat_surat`, `asal_surat`, `kepentingan_surat`, `tipe_surat`, `keterangan_surat`, `file_surat`, `status_surat`, `posisi_surat`, `perihal_id`, `createdAt`, `updatedAt`) VALUES
(1, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 00:58:53', '2017-08-21 00:58:53'),
(2, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:04:36', '2017-08-21 01:04:36'),
(3, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:05:32', '2017-08-21 01:05:32'),
(4, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:07:18', '2017-08-21 01:07:18'),
(5, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:13:02', '2017-08-21 01:13:02'),
(6, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:16:53', '2017-08-21 01:16:53'),
(7, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:17:52', '2017-08-21 01:17:52'),
(8, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:23:04', '2017-08-21 01:23:04'),
(9, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-21 01:23:21', '2017-08-22 10:48:57'),
(10, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:24:03', '2017-08-21 01:24:03'),
(11, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:24:19', '2017-08-21 01:24:19'),
(12, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:25:45', '2017-08-21 01:25:45'),
(13, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:29:11', '2017-08-21 01:29:11'),
(14, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:29:29', '2017-08-21 01:29:29'),
(15, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:40:30', '2017-08-21 01:40:30'),
(16, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:43:54', '2017-08-21 01:43:54'),
(17, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:48:58', '2017-08-21 01:48:58'),
(18, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:50:05', '2017-08-21 01:50:05'),
(19, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:51:03', '2017-08-21 01:51:03'),
(20, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:52:20', '2017-08-21 01:52:20'),
(21, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:56:53', '2017-08-21 01:56:53'),
(22, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:59:27', '2017-08-21 01:59:27'),
(23, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'keluar', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 01:59:56', '2017-08-21 01:59:56'),
(24, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 10:01:18', '2017-08-21 10:01:18'),
(25, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 13:44:46', '2017-08-21 13:44:46'),
(26, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-21 13:45:25', '2017-08-21 13:45:25'),
(27, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 08:15:44', '2017-08-22 08:15:44'),
(28, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 08:30:49', '2017-08-22 08:30:49'),
(29, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 08:33:41', '2017-08-22 08:33:41'),
(30, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:10:56', '2017-08-22 09:10:56'),
(31, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:12:19', '2017-08-22 09:12:19'),
(32, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:14:21', '2017-08-22 09:14:21'),
(33, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:14:32', '2017-08-22 09:14:32'),
(34, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:22:20', '2017-08-22 09:22:20'),
(35, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:23:09', '2017-08-22 09:23:09'),
(36, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:23:40', '2017-08-22 09:23:40'),
(37, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:24:18', '2017-08-22 09:24:18'),
(38, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:27:42', '2017-08-22 09:27:42'),
(39, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:28:30', '2017-08-22 09:28:30'),
(40, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:29:35', '2017-08-22 09:29:35'),
(41, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:30:46', '2017-08-22 09:30:46'),
(42, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:32:00', '2017-08-22 09:32:00'),
(43, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:32:15', '2017-08-22 09:32:15'),
(44, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:33:11', '2017-08-22 09:33:11'),
(45, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:33:55', '2017-08-22 09:33:55'),
(46, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:34:54', '2017-08-22 09:34:54'),
(47, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:35:16', '2017-08-22 09:35:16'),
(48, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:35:54', '2017-08-22 09:35:54'),
(49, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:36:09', '2017-08-22 09:36:09'),
(50, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:36:46', '2017-08-22 09:36:46'),
(51, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:38:41', '2017-08-22 09:38:41'),
(52, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:40:31', '2017-08-22 09:40:31'),
(53, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:40:52', '2017-08-22 09:40:52'),
(54, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:41:18', '2017-08-22 09:41:18'),
(55, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:41:42', '2017-08-22 09:41:42'),
(56, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:42:14', '2017-08-22 09:42:14'),
(57, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:42:35', '2017-08-22 09:42:35'),
(58, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:43:48', '2017-08-22 09:43:48'),
(59, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:46:51', '2017-08-22 09:46:51'),
(60, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:47:31', '2017-08-22 09:47:31'),
(61, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:47:49', '2017-08-22 09:47:49'),
(62, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:48:16', '2017-08-22 09:48:16'),
(63, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:49:14', '2017-08-22 09:49:14'),
(64, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:49:29', '2017-08-22 09:49:29'),
(65, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:07', '2017-08-22 09:54:07'),
(66, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:30', '2017-08-22 09:54:30'),
(67, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:44', '2017-08-22 09:54:44'),
(68, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:47', '2017-08-22 09:54:47'),
(69, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:50', '2017-08-22 09:54:50'),
(70, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:54', '2017-08-22 09:54:54'),
(71, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 09:54:57', '2017-08-22 09:54:57'),
(72, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:00:06', '2017-08-22 10:00:06'),
(73, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:00:17', '2017-08-22 10:00:17'),
(74, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:00:18', '2017-08-22 10:00:18'),
(75, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:05:33', '2017-08-22 10:05:33'),
(76, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:15:46', '2017-08-22 10:15:46'),
(77, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:16:09', '2017-08-22 10:16:09'),
(78, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:19:17', '2017-08-22 10:19:17'),
(79, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:19:27', '2017-08-22 10:19:27'),
(80, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 10:19:28', '2017-08-22 10:19:28'),
(81, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:14:27', '2017-08-22 11:14:27'),
(82, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:14:41', '2017-08-22 11:14:41'),
(83, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:14:49', '2017-08-22 11:14:49'),
(84, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:15:37', '2017-08-22 11:15:37'),
(85, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:04', '2017-08-22 11:16:04'),
(86, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:41', '2017-08-22 11:16:41'),
(87, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:42', '2017-08-22 11:16:42'),
(88, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:46', '2017-08-22 11:16:46'),
(89, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:48', '2017-08-22 11:16:48'),
(90, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:49', '2017-08-22 11:16:49'),
(91, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:50', '2017-08-22 11:16:50'),
(92, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:51', '2017-08-22 11:16:51'),
(93, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:52', '2017-08-22 11:16:52'),
(94, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:54', '2017-08-22 11:16:54'),
(95, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:55', '2017-08-22 11:16:55'),
(96, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:57', '2017-08-22 11:16:57'),
(97, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:16:59', '2017-08-22 11:16:59'),
(98, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:17:00', '2017-08-22 11:17:00'),
(99, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:17:00', '2017-08-22 11:17:00'),
(100, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:17:01', '2017-08-22 11:17:01'),
(101, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:17:03', '2017-08-22 11:17:03'),
(102, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 11:17:04', '2017-08-22 11:17:04'),
(103, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 12:29:36', '2017-08-22 12:29:36'),
(104, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 12:30:19', '2017-08-22 12:30:19'),
(105, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:09:21', '2017-08-22 13:09:21'),
(106, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:36:21', '2017-08-22 13:36:21'),
(107, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:36:58', '2017-08-22 13:36:58'),
(108, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:37:21', '2017-08-22 13:37:21'),
(109, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:37:32', '2017-08-22 13:37:32'),
(110, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:39:07', '2017-08-22 13:39:07'),
(111, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 13:39:20', '2017-08-22 13:39:20'),
(112, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:25:15', '2017-08-22 14:25:15'),
(113, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:26:36', '2017-08-22 14:26:36'),
(114, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:27:25', '2017-08-22 14:27:25'),
(115, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:27:57', '2017-08-22 14:27:57'),
(116, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:28:18', '2017-08-22 14:28:18'),
(117, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:28:50', '2017-08-22 14:28:50'),
(118, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:55:52', '2017-08-22 14:55:52'),
(119, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:56:09', '2017-08-22 14:56:09'),
(120, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:56:24', '2017-08-22 14:56:24'),
(121, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:57:01', '2017-08-22 14:57:01'),
(122, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:57:32', '2017-08-22 14:57:32'),
(123, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 14:59:40', '2017-08-22 14:59:40'),
(124, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:03:09', '2017-08-22 15:03:09'),
(125, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:04:53', '2017-08-22 15:04:53'),
(126, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:05:40', '2017-08-22 15:05:40'),
(127, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:11:49', '2017-08-22 15:11:49'),
(128, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:12:57', '2017-08-22 15:12:57'),
(129, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:17:43', '2017-08-22 15:17:43'),
(130, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:19:00', '2017-08-22 15:19:00'),
(131, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:19:41', '2017-08-22 15:19:41'),
(132, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:23:37', '2017-08-22 15:23:37'),
(133, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:23:44', '2017-08-22 15:23:44'),
(134, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:23:52', '2017-08-22 15:23:52'),
(135, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:24:25', '2017-08-22 15:24:25'),
(136, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:25:08', '2017-08-22 15:25:08'),
(137, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:26:37', '2017-08-22 15:26:37'),
(138, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', '', 1, '2017-08-22 15:26:51', '2017-08-22 15:26:51'),
(139, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:26:58', '2017-08-22 15:26:58'),
(140, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:29:52', '2017-08-22 15:29:52'),
(141, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:32:01', '2017-08-22 15:32:01'),
(142, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:32:01', '2017-08-22 15:32:01'),
(143, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:32:10', '2017-08-22 15:32:10'),
(144, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'internal', 'biasa', 'masuk', 'Tolong segera dibaca dan ditindaklanjuti. Terima kasih.', 'surat-1503251901773.pdf', 'aktif', 'Gudang Arsip FMIPA', 1, '2017-08-22 15:32:39', '2017-08-22 15:32:39');

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
(1, 23, 'Muhammad Aslam Abdurrohim', '2017-08-21 01:59:56', '2017-08-21 01:59:56');

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
(1, 23, 1, '2017-08-21 01:59:56', '2017-08-21 01:59:56');

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
(1, 1, 1, 0, '2017-08-21 00:58:54', '2017-08-21 00:58:54'),
(2, 2, 1, 0, '2017-08-21 01:04:36', '2017-08-21 01:04:36'),
(3, 3, 1, 0, '2017-08-21 01:05:32', '2017-08-21 01:05:32'),
(4, 4, 1, 0, '2017-08-21 01:07:18', '2017-08-21 01:07:18'),
(5, 5, 1, 0, '2017-08-21 01:13:02', '2017-08-21 01:13:02'),
(6, 6, 1, 0, '2017-08-21 01:16:54', '2017-08-21 01:16:54'),
(7, 7, 1, 0, '2017-08-21 01:17:52', '2017-08-21 01:17:52'),
(8, 8, 1, 0, '2017-08-21 01:23:04', '2017-08-21 01:23:04'),
(9, 9, 1, 0, '2017-08-21 01:23:21', '2017-08-21 01:23:21'),
(10, 10, 1, 0, '2017-08-21 01:24:03', '2017-08-21 01:24:03'),
(11, 11, 1, 0, '2017-08-21 01:24:19', '2017-08-21 01:24:19'),
(12, 12, 1, 0, '2017-08-21 01:25:46', '2017-08-21 01:25:46'),
(13, 13, 1, 0, '2017-08-21 01:29:11', '2017-08-21 01:29:11'),
(14, 14, 1, 0, '2017-08-21 01:29:30', '2017-08-21 01:29:30'),
(15, 15, 1, 0, '2017-08-21 01:40:30', '2017-08-21 01:40:30'),
(16, 16, 1, 0, '2017-08-21 01:43:54', '2017-08-21 01:43:54'),
(17, 17, 1, 0, '2017-08-21 01:48:58', '2017-08-21 01:48:58'),
(18, 18, 1, 0, '2017-08-21 01:50:05', '2017-08-21 01:50:05'),
(19, 19, 1, 0, '2017-08-21 01:51:04', '2017-08-21 01:51:04'),
(20, 20, 1, 0, '2017-08-21 01:52:20', '2017-08-21 01:52:20'),
(21, 21, 1, 0, '2017-08-21 01:56:53', '2017-08-21 01:56:53'),
(22, 22, 1, 0, '2017-08-21 01:59:28', '2017-08-21 01:59:28'),
(23, 24, 1, 0, '2017-08-21 10:01:19', '2017-08-21 10:01:19'),
(24, 25, 1, 0, '2017-08-21 13:44:46', '2017-08-21 13:44:46'),
(25, 26, 1, 0, '2017-08-21 13:45:26', '2017-08-21 13:45:26'),
(26, 3, 1, 1, '2017-08-21 15:21:37', '2017-08-21 15:21:37'),
(27, 3, 2, 1, '2017-08-21 15:21:37', '2017-08-21 15:21:37'),
(28, 3, 1, 2, '2017-08-22 08:12:28', '2017-08-22 08:12:28'),
(29, 3, 2, 2, '2017-08-22 08:12:28', '2017-08-22 08:12:28'),
(30, 27, 1, 0, '2017-08-22 08:15:44', '2017-08-22 08:15:44'),
(31, 27, 2, 0, '2017-08-22 08:15:44', '2017-08-22 08:15:44'),
(32, 28, 1, 0, '2017-08-22 08:30:50', '2017-08-22 08:30:50'),
(33, 28, 2, 0, '2017-08-22 08:30:50', '2017-08-22 08:30:50'),
(34, 29, 1, 0, '2017-08-22 08:33:41', '2017-08-22 08:33:41'),
(35, 29, 2, 0, '2017-08-22 08:33:41', '2017-08-22 08:33:41'),
(36, 30, 1, 0, '2017-08-22 09:10:57', '2017-08-22 09:10:57'),
(37, 30, 2, 0, '2017-08-22 09:10:57', '2017-08-22 09:10:57'),
(38, 31, 1, 0, '2017-08-22 09:12:20', '2017-08-22 09:12:20'),
(39, 31, 2, 0, '2017-08-22 09:12:20', '2017-08-22 09:12:20'),
(40, 32, 2, 0, '2017-08-22 09:14:22', '2017-08-22 09:14:22'),
(41, 33, 1, 0, '2017-08-22 09:14:33', '2017-08-22 09:14:33'),
(42, 34, 1, 0, '2017-08-22 09:22:20', '2017-08-22 09:22:20'),
(43, 35, 1, 0, '2017-08-22 09:23:09', '2017-08-22 09:23:09'),
(44, 36, 1, 0, '2017-08-22 09:23:40', '2017-08-22 09:23:40'),
(45, 37, 1, 0, '2017-08-22 09:24:19', '2017-08-22 09:24:19'),
(46, 38, 1, 0, '2017-08-22 09:27:42', '2017-08-22 09:27:42'),
(47, 39, 1, 0, '2017-08-22 09:28:30', '2017-08-22 09:28:30'),
(48, 40, 1, 0, '2017-08-22 09:29:35', '2017-08-22 09:29:35'),
(49, 41, 1, 0, '2017-08-22 09:30:46', '2017-08-22 09:30:46'),
(50, 42, 1, 0, '2017-08-22 09:32:00', '2017-08-22 09:32:00'),
(51, 43, 1, 0, '2017-08-22 09:32:16', '2017-08-22 09:32:16'),
(52, 44, 1, 0, '2017-08-22 09:33:12', '2017-08-22 09:33:12'),
(53, 45, 1, 0, '2017-08-22 09:33:55', '2017-08-22 09:33:55'),
(54, 46, 1, 0, '2017-08-22 09:34:55', '2017-08-22 09:34:55'),
(55, 47, 1, 0, '2017-08-22 09:35:17', '2017-08-22 09:35:17'),
(56, 48, 1, 0, '2017-08-22 09:35:55', '2017-08-22 09:35:55'),
(57, 49, 1, 0, '2017-08-22 09:36:09', '2017-08-22 09:36:09'),
(58, 50, 1, 0, '2017-08-22 09:36:46', '2017-08-22 09:36:46'),
(59, 51, 1, 0, '2017-08-22 09:38:42', '2017-08-22 09:38:42'),
(60, 52, 1, 0, '2017-08-22 09:40:32', '2017-08-22 09:40:32'),
(61, 53, 1, 0, '2017-08-22 09:40:52', '2017-08-22 09:40:52'),
(62, 54, 1, 0, '2017-08-22 09:41:18', '2017-08-22 09:41:18'),
(63, 55, 1, 0, '2017-08-22 09:41:42', '2017-08-22 09:41:42'),
(64, 56, 1, 0, '2017-08-22 09:42:14', '2017-08-22 09:42:14'),
(65, 57, 1, 0, '2017-08-22 09:42:36', '2017-08-22 09:42:36'),
(66, 58, 1, 0, '2017-08-22 09:43:48', '2017-08-22 09:43:48'),
(67, 59, 1, 0, '2017-08-22 09:46:51', '2017-08-22 09:46:51'),
(68, 60, 1, 0, '2017-08-22 09:47:31', '2017-08-22 09:47:31'),
(69, 61, 1, 0, '2017-08-22 09:47:49', '2017-08-22 09:47:49'),
(70, 62, 1, 0, '2017-08-22 09:48:17', '2017-08-22 09:48:17'),
(71, 63, 1, 0, '2017-08-22 09:49:14', '2017-08-22 09:49:14'),
(72, 64, 1, 0, '2017-08-22 09:49:30', '2017-08-22 09:49:30'),
(73, 65, 1, 0, '2017-08-22 09:54:07', '2017-08-22 09:54:07'),
(74, 66, 1, 0, '2017-08-22 09:54:30', '2017-08-22 09:54:30'),
(75, 67, 1, 0, '2017-08-22 09:54:44', '2017-08-22 09:54:44'),
(76, 68, 1, 0, '2017-08-22 09:54:47', '2017-08-22 09:54:47'),
(77, 69, 1, 0, '2017-08-22 09:54:50', '2017-08-22 09:54:50'),
(78, 70, 1, 0, '2017-08-22 09:54:54', '2017-08-22 09:54:54'),
(79, 71, 1, 0, '2017-08-22 09:54:57', '2017-08-22 09:54:57'),
(80, 72, 1, 0, '2017-08-22 10:00:06', '2017-08-22 10:00:06'),
(81, 73, 1, 0, '2017-08-22 10:00:17', '2017-08-22 10:00:17'),
(82, 74, 1, 0, '2017-08-22 10:00:18', '2017-08-22 10:00:18'),
(83, 75, 1, 0, '2017-08-22 10:05:33', '2017-08-22 10:05:33'),
(84, 76, 1, 0, '2017-08-22 10:15:46', '2017-08-22 10:15:46'),
(85, 77, 1, 0, '2017-08-22 10:16:10', '2017-08-22 10:16:10'),
(86, 78, 1, 0, '2017-08-22 10:19:17', '2017-08-22 10:19:17'),
(87, 79, 1, 0, '2017-08-22 10:19:27', '2017-08-22 10:19:27'),
(88, 80, 1, 0, '2017-08-22 10:19:28', '2017-08-22 10:19:28'),
(89, 3, 1, 3, '2017-08-22 10:23:36', '2017-08-22 10:23:36'),
(90, 3, 2, 3, '2017-08-22 10:23:36', '2017-08-22 10:23:36'),
(91, 76, 1, 1, '2017-08-22 10:24:02', '2017-08-22 10:24:02'),
(92, 76, 2, 1, '2017-08-22 10:24:02', '2017-08-22 10:24:02'),
(93, 76, 1, 2, '2017-08-22 10:24:34', '2017-08-22 10:24:34'),
(94, 76, 2, 2, '2017-08-22 10:24:34', '2017-08-22 10:24:34'),
(95, 81, 1, 0, '2017-08-22 11:14:27', '2017-08-22 11:14:27'),
(96, 82, 1, 0, '2017-08-22 11:14:41', '2017-08-22 11:14:41'),
(97, 83, 1, 0, '2017-08-22 11:14:49', '2017-08-22 11:14:49'),
(98, 84, 1, 0, '2017-08-22 11:15:38', '2017-08-22 11:15:38'),
(99, 85, 1, 0, '2017-08-22 11:16:04', '2017-08-22 11:16:04'),
(100, 86, 1, 0, '2017-08-22 11:16:41', '2017-08-22 11:16:41'),
(101, 87, 1, 0, '2017-08-22 11:16:42', '2017-08-22 11:16:42'),
(102, 88, 1, 0, '2017-08-22 11:16:46', '2017-08-22 11:16:46'),
(103, 89, 1, 0, '2017-08-22 11:16:48', '2017-08-22 11:16:48'),
(104, 90, 1, 0, '2017-08-22 11:16:49', '2017-08-22 11:16:49'),
(105, 91, 1, 0, '2017-08-22 11:16:50', '2017-08-22 11:16:50'),
(106, 92, 1, 0, '2017-08-22 11:16:51', '2017-08-22 11:16:51'),
(107, 93, 1, 0, '2017-08-22 11:16:52', '2017-08-22 11:16:52'),
(108, 94, 1, 0, '2017-08-22 11:16:54', '2017-08-22 11:16:54'),
(109, 95, 1, 0, '2017-08-22 11:16:55', '2017-08-22 11:16:55'),
(110, 96, 1, 0, '2017-08-22 11:16:58', '2017-08-22 11:16:58'),
(111, 97, 1, 0, '2017-08-22 11:16:59', '2017-08-22 11:16:59'),
(112, 98, 1, 0, '2017-08-22 11:17:00', '2017-08-22 11:17:00'),
(113, 99, 1, 0, '2017-08-22 11:17:01', '2017-08-22 11:17:01'),
(114, 100, 1, 0, '2017-08-22 11:17:01', '2017-08-22 11:17:01'),
(115, 101, 1, 0, '2017-08-22 11:17:03', '2017-08-22 11:17:03'),
(116, 102, 1, 0, '2017-08-22 11:17:04', '2017-08-22 11:17:04'),
(117, 103, 1, 0, '2017-08-22 12:29:36', '2017-08-22 12:29:36'),
(118, 104, 1, 0, '2017-08-22 12:30:19', '2017-08-22 12:30:19'),
(119, 105, 1, 0, '2017-08-22 13:09:21', '2017-08-22 13:09:21'),
(120, 106, 1, 0, '2017-08-22 13:36:22', '2017-08-22 13:36:22'),
(121, 107, 1, 0, '2017-08-22 13:36:58', '2017-08-22 13:36:58'),
(122, 108, 1, 0, '2017-08-22 13:37:21', '2017-08-22 13:37:21'),
(123, 109, 1, 0, '2017-08-22 13:37:32', '2017-08-22 13:37:32'),
(124, 110, 1, 0, '2017-08-22 13:39:07', '2017-08-22 13:39:07'),
(125, 111, 1, 0, '2017-08-22 13:39:21', '2017-08-22 13:39:21'),
(126, 112, 1, 0, '2017-08-22 14:25:15', '2017-08-22 14:25:15'),
(127, 113, 1, 0, '2017-08-22 14:26:37', '2017-08-22 14:26:37'),
(128, 114, 1, 0, '2017-08-22 14:27:26', '2017-08-22 14:27:26'),
(129, 115, 1, 0, '2017-08-22 14:27:58', '2017-08-22 14:27:58'),
(130, 116, 1, 0, '2017-08-22 14:28:18', '2017-08-22 14:28:18'),
(131, 117, 1, 0, '2017-08-22 14:28:50', '2017-08-22 14:28:50'),
(132, 118, 1, 0, '2017-08-22 14:55:52', '2017-08-22 14:55:52'),
(133, 119, 1, 0, '2017-08-22 14:56:09', '2017-08-22 14:56:09'),
(134, 120, 1, 0, '2017-08-22 14:56:25', '2017-08-22 14:56:25'),
(135, 121, 1, 0, '2017-08-22 14:57:01', '2017-08-22 14:57:01'),
(136, 122, 1, 0, '2017-08-22 14:57:32', '2017-08-22 14:57:32'),
(137, 123, 1, 0, '2017-08-22 14:59:40', '2017-08-22 14:59:40'),
(138, 124, 1, 0, '2017-08-22 15:03:09', '2017-08-22 15:03:09'),
(139, 125, 1, 0, '2017-08-22 15:04:53', '2017-08-22 15:04:53'),
(140, 126, 1, 0, '2017-08-22 15:05:40', '2017-08-22 15:05:40'),
(141, 127, 1, 0, '2017-08-22 15:11:49', '2017-08-22 15:11:49'),
(142, 128, 1, 0, '2017-08-22 15:12:57', '2017-08-22 15:12:57'),
(143, 129, 1, 0, '2017-08-22 15:17:43', '2017-08-22 15:17:43'),
(144, 130, 1, 0, '2017-08-22 15:19:01', '2017-08-22 15:19:01'),
(145, 131, 1, 0, '2017-08-22 15:19:42', '2017-08-22 15:19:42'),
(146, 132, 1, 0, '2017-08-22 15:23:37', '2017-08-22 15:23:37'),
(147, 133, 1, 0, '2017-08-22 15:23:44', '2017-08-22 15:23:44'),
(148, 134, 1, 0, '2017-08-22 15:23:52', '2017-08-22 15:23:52'),
(149, 135, 1, 0, '2017-08-22 15:24:26', '2017-08-22 15:24:26'),
(150, 136, 1, 0, '2017-08-22 15:25:08', '2017-08-22 15:25:08'),
(151, 137, 1, 0, '2017-08-22 15:26:37', '2017-08-22 15:26:37'),
(152, 138, 1, 0, '2017-08-22 15:26:52', '2017-08-22 15:26:52'),
(153, 139, 1, 0, '2017-08-22 15:26:58', '2017-08-22 15:26:58'),
(154, 143, 1, 0, '2017-08-22 15:32:10', '2017-08-22 15:32:10'),
(155, 144, 1, 0, '2017-08-22 15:32:39', '2017-08-22 15:32:39');

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
(1, 1, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 00:58:53', '2017-08-21 00:58:53'),
(2, 2, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:04:36', '2017-08-21 01:04:36'),
(3, 3, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:05:32', '2017-08-21 01:05:32'),
(4, 4, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:07:18', '2017-08-21 01:07:18'),
(5, 5, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:13:02', '2017-08-21 01:13:02'),
(6, 6, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:16:54', '2017-08-21 01:16:54'),
(7, 7, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:17:52', '2017-08-21 01:17:52'),
(8, 8, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:23:04', '2017-08-21 01:23:04'),
(9, 9, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:23:21', '2017-08-21 01:23:21'),
(10, 10, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:24:03', '2017-08-21 01:24:03'),
(11, 11, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:24:19', '2017-08-21 01:24:19'),
(12, 12, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:25:46', '2017-08-21 01:25:46'),
(13, 13, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:29:11', '2017-08-21 01:29:11'),
(14, 14, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:29:29', '2017-08-21 01:29:29'),
(15, 15, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:40:30', '2017-08-21 01:40:30'),
(16, 16, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:43:54', '2017-08-21 01:43:54'),
(17, 17, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:48:58', '2017-08-21 01:48:58'),
(18, 18, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:50:05', '2017-08-21 01:50:05'),
(19, 19, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:51:04', '2017-08-21 01:51:04'),
(20, 20, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:52:20', '2017-08-21 01:52:20'),
(21, 21, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:56:53', '2017-08-21 01:56:53'),
(22, 22, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 01:59:27', '2017-08-21 01:59:27'),
(23, 24, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 10:01:19', '2017-08-21 10:01:19'),
(24, 25, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 13:44:46', '2017-08-21 13:44:46'),
(25, 26, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 13:45:26', '2017-08-21 13:45:26'),
(26, 27, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 08:15:44', '2017-08-22 08:15:44'),
(27, 28, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 08:30:50', '2017-08-22 08:30:50'),
(28, 29, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 08:33:41', '2017-08-22 08:33:41'),
(29, 30, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:10:56', '2017-08-22 09:10:56'),
(30, 31, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:12:20', '2017-08-22 09:12:20'),
(31, 32, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:14:22', '2017-08-22 09:14:22'),
(32, 33, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:14:32', '2017-08-22 09:14:32'),
(33, 34, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:22:20', '2017-08-22 09:22:20'),
(34, 35, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:23:09', '2017-08-22 09:23:09'),
(35, 36, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:23:40', '2017-08-22 09:23:40'),
(36, 37, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:24:19', '2017-08-22 09:24:19'),
(37, 38, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:27:42', '2017-08-22 09:27:42'),
(38, 39, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:28:30', '2017-08-22 09:28:30'),
(39, 40, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:29:35', '2017-08-22 09:29:35'),
(40, 41, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:30:46', '2017-08-22 09:30:46'),
(41, 42, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:32:00', '2017-08-22 09:32:00'),
(42, 43, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:32:16', '2017-08-22 09:32:16'),
(43, 44, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:33:11', '2017-08-22 09:33:11'),
(44, 45, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:33:55', '2017-08-22 09:33:55'),
(45, 46, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:34:55', '2017-08-22 09:34:55'),
(46, 47, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:35:16', '2017-08-22 09:35:16'),
(47, 48, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:35:54', '2017-08-22 09:35:54'),
(48, 49, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:36:09', '2017-08-22 09:36:09'),
(49, 50, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:36:46', '2017-08-22 09:36:46'),
(50, 51, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:38:41', '2017-08-22 09:38:41'),
(51, 52, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:40:31', '2017-08-22 09:40:31'),
(52, 53, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:40:52', '2017-08-22 09:40:52'),
(53, 54, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:41:18', '2017-08-22 09:41:18'),
(54, 55, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:41:42', '2017-08-22 09:41:42'),
(55, 56, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:42:14', '2017-08-22 09:42:14'),
(56, 57, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:42:36', '2017-08-22 09:42:36'),
(57, 58, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:43:48', '2017-08-22 09:43:48'),
(58, 59, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:46:51', '2017-08-22 09:46:51'),
(59, 60, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:47:31', '2017-08-22 09:47:31'),
(60, 61, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:47:49', '2017-08-22 09:47:49'),
(61, 62, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:48:17', '2017-08-22 09:48:17'),
(62, 63, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:49:14', '2017-08-22 09:49:14'),
(63, 64, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:49:29', '2017-08-22 09:49:29'),
(64, 65, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:07', '2017-08-22 09:54:07'),
(65, 66, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:30', '2017-08-22 09:54:30'),
(66, 67, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:44', '2017-08-22 09:54:44'),
(67, 68, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:47', '2017-08-22 09:54:47'),
(68, 69, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:50', '2017-08-22 09:54:50'),
(69, 70, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:54', '2017-08-22 09:54:54'),
(70, 71, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 09:54:57', '2017-08-22 09:54:57'),
(71, 72, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:00:06', '2017-08-22 10:00:06'),
(72, 73, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:00:17', '2017-08-22 10:00:17'),
(73, 74, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:00:18', '2017-08-22 10:00:18'),
(74, 75, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:05:33', '2017-08-22 10:05:33'),
(75, 76, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:15:46', '2017-08-22 10:15:46'),
(76, 77, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:16:09', '2017-08-22 10:16:09'),
(77, 78, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:19:17', '2017-08-22 10:19:17'),
(78, 79, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:19:27', '2017-08-22 10:19:27'),
(79, 80, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 10:19:28', '2017-08-22 10:19:28'),
(80, 81, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:14:27', '2017-08-22 11:14:27'),
(81, 82, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:14:41', '2017-08-22 11:14:41'),
(82, 83, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:14:49', '2017-08-22 11:14:49'),
(83, 84, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:15:38', '2017-08-22 11:15:38'),
(84, 85, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:04', '2017-08-22 11:16:04'),
(85, 86, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:41', '2017-08-22 11:16:41'),
(86, 87, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:42', '2017-08-22 11:16:42'),
(87, 88, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:46', '2017-08-22 11:16:46'),
(88, 89, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:48', '2017-08-22 11:16:48'),
(89, 90, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:49', '2017-08-22 11:16:49'),
(90, 91, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:50', '2017-08-22 11:16:50'),
(91, 92, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:51', '2017-08-22 11:16:51'),
(92, 93, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:52', '2017-08-22 11:16:52'),
(93, 94, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:54', '2017-08-22 11:16:54'),
(94, 95, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:55', '2017-08-22 11:16:55'),
(95, 96, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:58', '2017-08-22 11:16:58'),
(96, 97, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:16:59', '2017-08-22 11:16:59'),
(97, 98, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:17:00', '2017-08-22 11:17:00'),
(98, 99, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:17:00', '2017-08-22 11:17:00'),
(99, 100, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:17:01', '2017-08-22 11:17:01'),
(100, 101, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:17:03', '2017-08-22 11:17:03'),
(101, 102, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 11:17:04', '2017-08-22 11:17:04'),
(102, 103, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 12:29:36', '2017-08-22 12:29:36'),
(103, 104, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 12:30:19', '2017-08-22 12:30:19'),
(104, 105, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:09:21', '2017-08-22 13:09:21'),
(105, 106, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:36:22', '2017-08-22 13:36:22'),
(106, 107, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:36:58', '2017-08-22 13:36:58'),
(107, 108, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:37:21', '2017-08-22 13:37:21'),
(108, 109, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:37:32', '2017-08-22 13:37:32'),
(109, 110, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:39:07', '2017-08-22 13:39:07'),
(110, 111, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 13:39:21', '2017-08-22 13:39:21'),
(111, 112, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:25:15', '2017-08-22 14:25:15'),
(112, 113, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:26:36', '2017-08-22 14:26:36'),
(113, 114, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:27:26', '2017-08-22 14:27:26'),
(114, 115, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:27:58', '2017-08-22 14:27:58'),
(115, 116, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:28:18', '2017-08-22 14:28:18'),
(116, 117, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:28:50', '2017-08-22 14:28:50'),
(117, 118, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:55:52', '2017-08-22 14:55:52'),
(118, 119, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:56:09', '2017-08-22 14:56:09'),
(119, 120, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:56:24', '2017-08-22 14:56:24'),
(120, 121, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:57:01', '2017-08-22 14:57:01'),
(121, 122, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:57:32', '2017-08-22 14:57:32'),
(122, 123, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 14:59:40', '2017-08-22 14:59:40'),
(123, 124, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:03:09', '2017-08-22 15:03:09'),
(124, 125, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:04:53', '2017-08-22 15:04:53'),
(125, 126, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:05:40', '2017-08-22 15:05:40'),
(126, 127, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:11:49', '2017-08-22 15:11:49'),
(127, 128, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:12:57', '2017-08-22 15:12:57'),
(128, 129, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:17:43', '2017-08-22 15:17:43'),
(129, 130, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:19:01', '2017-08-22 15:19:01'),
(130, 131, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:19:42', '2017-08-22 15:19:42'),
(131, 132, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:23:37', '2017-08-22 15:23:37'),
(132, 133, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:23:44', '2017-08-22 15:23:44'),
(133, 134, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:23:52', '2017-08-22 15:23:52'),
(134, 135, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:24:26', '2017-08-22 15:24:26'),
(135, 136, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:25:08', '2017-08-22 15:25:08'),
(136, 137, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:26:37', '2017-08-22 15:26:37'),
(137, 138, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:26:52', '2017-08-22 15:26:52'),
(138, 139, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:26:58', '2017-08-22 15:26:58'),
(139, 142, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:32:02', '2017-08-22 15:32:02'),
(140, 143, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:32:10', '2017-08-22 15:32:10'),
(141, 144, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-22 15:32:39', '2017-08-22 15:32:39');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `perihals`
--
ALTER TABLE `perihals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;
--
-- AUTO_INCREMENT for table `surat_keluar_penerimas`
--
ALTER TABLE `surat_keluar_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `surat_keluar_pengirims`
--
ALTER TABLE `surat_keluar_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `surat_masuk_penerimas`
--
ALTER TABLE `surat_masuk_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
--
-- AUTO_INCREMENT for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
--
-- AUTO_INCREMENT for table `unit_kerjas`
--
ALTER TABLE `unit_kerjas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
