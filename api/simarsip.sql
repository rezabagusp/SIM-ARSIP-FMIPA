-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2017 at 05:13 AM
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
(0, 'Lainnya', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 'Dekan FMIPA IPB', '2017-08-01 08:39:00', '2017-08-01 08:39:00'),
(2, 'Wakil Dekan Bidang Akademik FMIPA IPB', '2017-08-01 08:40:00', '2017-08-01 08:40:00'),
(3, 'Wakil Dekan Bidang SKP FMIPA IPB', '2017-08-01 08:40:00', '2017-08-01 08:40:00'),
(4, 'Manajer FABLAB FMIPA IPB', '2017-08-01 08:41:00', '2017-08-01 08:41:00');

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

--
-- Dumping data for table `jenis_surats`
--

INSERT INTO `jenis_surats` (`id`, `nomor_jenis_surat`, `nama_jenis_surat`, `kode_surat_id`, `createdAt`, `updatedAt`) VALUES
(1, '00', 'Apa aja', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `kode_surats`
--

INSERT INTO `kode_surats` (`id`, `kode_surat`, `nama_kode_surat`, `createdAt`, `updatedAt`) VALUES
(1, 'PP', 'Pendidikan', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
  `isi_lampiran` text,
  `surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lampirans`
--

INSERT INTO `lampirans` (`id`, `judul_lampiran`, `tanggal_lampiran`, `tanggal_entri_lampiran`, `file_lampiran`, `isi_lampiran`, `surat_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Jadwal Acara', '2017-08-09 00:00:00', '2017-08-09 00:00:00', 'lampiran-171717.pdf', 'zdfsdfsf', 40, '0000-00-00 00:00:00', '2017-08-10 13:00:14'),
(2, 'Hadirin dan Hadiroh', '2017-08-08 00:00:00', '2017-08-28 00:00:00', 'lampiran-10191982.pdf', 'dfvsdsf', 40, '0000-00-00 00:00:00', '2017-08-10 13:00:14');

-- --------------------------------------------------------

--
-- Table structure for table `penerimas`
--

CREATE TABLE `penerimas` (
  `id` int(11) NOT NULL,
  `nama_penerima` varchar(255) DEFAULT NULL,
  `jabatan_id` int(11) NOT NULL DEFAULT '0',
  `email_penerima` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penerimas`
--

INSERT INTO `penerimas` (`id`, `nama_penerima`, `jabatan_id`, `email_penerima`, `createdAt`, `updatedAt`) VALUES
(1, 'Dr. Ir. Sri Nurdiati M.Sc', 1, 'm.aslam.abdurrohim@gmail.com', '2017-08-01 09:00:00', '2017-08-01 09:00:00'),
(2, 'Dr. Ir. Kgs. Dahlan  ', 2, 'aslamabdurrohim@gmail.com', '2017-08-01 09:00:00', '2017-08-01 09:00:00'),
(3, 'Dr. Ir. Hamim, M.Si', 3, 'm.aslam.abdurrohim@gmail.com', '2017-08-01 09:00:00', '2017-08-01 09:00:00'),
(4, 'Ir. Meuthia Rachmaniah, M.Sc.', 4, 'aslamabdurrohim@gmail.com', '2017-08-01 09:15:00', '2017-08-01 09:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `pengirims`
--

CREATE TABLE `pengirims` (
  `id` int(11) NOT NULL,
  `nama_pengirim` varchar(255) DEFAULT NULL,
  `jabatan_pengirim` varchar(255) DEFAULT NULL,
  `email_pengirim` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pengirims`
--

INSERT INTO `pengirims` (`id`, `nama_pengirim`, `jabatan_pengirim`, `email_pengirim`, `createdAt`, `updatedAt`) VALUES
(1, 'aslam', 'rektor', 'aslam.rektor@ipb.ac.id', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(1, 'Undangan', '2017-08-01 00:00:00', '2017-08-01 00:00:00'),
(2, 'Surat Edaran', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Surat Keputusan', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `sub_jenis_surats`
--

INSERT INTO `sub_jenis_surats` (`id`, `nomor_sub_jenis_surat`, `nama_sub_jenis_surat`, `jenis_surat_id`, `createdAt`, `updatedAt`) VALUES
(1, '00', 'Waw', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
  `perlakuan_sub_sub_jenis_surat` enum('Musnah','Permanen','Ditinjau Kembali') DEFAULT NULL,
  `nilai_sub_sub_jenis_surat` varchar(255) DEFAULT NULL,
  `sub_jenis_surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_sub_jenis_surats`
--

INSERT INTO `sub_sub_jenis_surats` (`id`, `nomor_sub_sub_jenis_surat`, `nama_sub_sub_jenis_surat`, `retensi_aktif_sub_sub_jenis_surat`, `retensi_inaktif_sub_sub_jenis_surat`, `perlakuan_sub_sub_jenis_surat`, `nilai_sub_sub_jenis_surat`, `sub_jenis_surat_id`, `createdAt`, `updatedAt`) VALUES
(1, '00', 'Hehe', 2, 2, 'Musnah', 'Administrasi', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `surats`
--

CREATE TABLE `surats` (
  `id` int(11) NOT NULL,
  `nomor_surat` int(11) DEFAULT NULL,
  `unit_kerja_surat` int(11) DEFAULT NULL,
  `hal_surat` varchar(255) DEFAULT NULL,
  `tahun_surat` int(11) DEFAULT NULL,
  `perihal_surat` int(11) DEFAULT NULL,
  `pengirim_surat` int(11) DEFAULT NULL,
  `tanggal_surat` datetime DEFAULT NULL,
  `tanggal_terima_surat` datetime DEFAULT NULL,
  `tanggal_entri_surat` datetime DEFAULT NULL,
  `tipe_surat` enum('masuk','keluar') DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `isi_surat` text,
  `status_surat` enum('aktif','inaktif') DEFAULT 'aktif',
  `sub_sub_jenis_surat_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surats`
--

INSERT INTO `surats` (`id`, `nomor_surat`, `unit_kerja_surat`, `hal_surat`, `tahun_surat`, `perihal_surat`, `pengirim_surat`, `tanggal_surat`, `tanggal_terima_surat`, `tanggal_entri_surat`, `tipe_surat`, `file_surat`, `isi_surat`, `status_surat`, `sub_sub_jenis_surat_id`, `createdAt`, `updatedAt`) VALUES
(4, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-07 14:38:36', '2017-08-07 15:41:54'),
(5, 1, 1, 'PP.00', 2017, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:38:44', '2017-08-07 14:38:44'),
(6, 1, 1, 'PP.00', 2017, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:38:57', '2017-08-07 14:38:57'),
(7, 1, 1, 'PP.00', 2017, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:39:05', '2017-08-07 14:39:05'),
(8, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:39:13', '2017-08-07 14:39:13'),
(9, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:39:24', '2017-08-07 14:39:24'),
(10, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:39:31', '2017-08-07 14:39:31'),
(11, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', NULL, NULL, NULL, 'aktif', NULL, '2017-08-07 14:41:05', '2017-08-07 14:41:05'),
(12, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', NULL, NULL, 'aktif', NULL, '2017-08-07 14:41:13', '2017-08-07 14:41:13'),
(13, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', NULL, '2017-08-07 14:41:21', '2017-08-07 14:41:21'),
(14, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-07 14:41:46', '2017-08-07 14:41:46'),
(15, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-07 14:42:42', '2017-08-07 14:42:42'),
(16, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:25:21', '2017-08-10 12:25:21'),
(17, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:26:23', '2017-08-10 12:26:23'),
(18, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, '', 1, '2017-08-10 12:27:24', '2017-08-10 12:27:24'),
(19, 1, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:27:55', '2017-08-10 12:27:55'),
(20, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:28:02', '2017-08-10 12:28:02'),
(23, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:28:22', '2017-08-10 12:28:22'),
(25, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-10 12:29:22', '2017-08-10 12:29:22'),
(26, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-10 12:30:17', '2017-08-10 12:30:17'),
(27, 2, 1, 'PP.00', 2017, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-10 12:30:34', '2017-08-10 12:30:34'),
(28, 2, 1, 'PP.00', 2017, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-10 12:30:56', '2017-08-10 12:30:56'),
(29, 2, 1, 'PP.00', 2017, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'aktif', NULL, '2017-08-10 12:32:10', '2017-08-10 12:32:10'),
(32, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:47:11', '2017-08-10 12:47:11'),
(33, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:55:15', '2017-08-10 12:55:15'),
(34, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:55:26', '2017-08-10 12:55:26'),
(35, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:55:28', '2017-08-10 12:55:28'),
(36, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:56:49', '2017-08-10 12:56:49'),
(37, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:57:56', '2017-08-10 12:57:56'),
(38, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:58:36', '2017-08-10 12:58:36'),
(39, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 12:59:21', '2017-08-10 12:59:21'),
(40, 2, 1, 'PP.00', 2017, 1, 1, '2017-08-07 10:00:00', '2017-08-07 10:00:00', '2017-08-07 10:00:00', 'masuk', 'surat-16171819.pdf', NULL, 'aktif', 1, '2017-08-10 13:00:14', '2017-08-10 13:00:14');

-- --------------------------------------------------------

--
-- Table structure for table `surat_penerimas`
--

CREATE TABLE `surat_penerimas` (
  `id` int(11) NOT NULL,
  `surat_id` int(11) DEFAULT NULL,
  `penerima_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

--
-- Dumping data for table `unit_kerjas`
--

INSERT INTO `unit_kerjas` (`id`, `nama_unit_kerja`, `akronim_unit_kerja`, `kode_unit_kerja`, `createdAt`, `updatedAt`) VALUES
(1, 'Fakultas Matematika dan Ilmu Pengetahuan Alam', 'FMIPA', 'IT3.7', '2017-08-07 00:00:00', '0000-00-00 00:00:00');

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
(1, 'Muhammad Aslam Abdurrohim', 'm.aslam.abdurrohim@yahoo.co.id', 'c557806bfe65c8a58fc1e5d492b61b8dac5cfc05f33fcd434cbb5540bd9c7a97', 'admin', 0, NULL, 1, '2017-08-07 11:02:40', '2017-08-07 11:02:40'),
(2, 'Reza Bagus Permana', 'reazabaguspermana.rbp@gmail.com', 'bd57aa66ec6c07cac850f35be669a08a3add911480f5b69e5643181ca563a86c', 'superadmin', 0, NULL, 1, '2017-08-07 12:14:27', '2017-08-07 12:14:27'),
(4, 'Reza Bagus Permana', 'reazabagus.permana.rbp@gmail.com', '9301393d73b9d42381b940d989b15fd49278d767d394b0f6781e6284e9c91391', 'superadmin', 0, NULL, 1, '2017-08-07 12:16:58', '2017-08-07 12:16:58'),
(6, 'Reza Bagus Permana', 'reazabagus.permana.qrbp@gmail.com', '9301393d73b9d42381b940d989b15fd49278d767d394b0f6781e6284e9c91391', 'superadmin', 0, NULL, 1, '2017-08-10 13:11:00', '2017-08-10 13:11:00');

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penerimas`
--
ALTER TABLE `penerimas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengirims`
--
ALTER TABLE `pengirims`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perihals`
--
ALTER TABLE `perihals`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `unit_kerja_surat` (`unit_kerja_surat`),
  ADD KEY `perihal_surat` (`perihal_surat`),
  ADD KEY `pengirim_surat` (`pengirim_surat`),
  ADD KEY `sub_sub_jenis_surat_id` (`sub_sub_jenis_surat_id`);

--
-- Indexes for table `surat_penerimas`
--
ALTER TABLE `surat_penerimas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surat_id` (`surat_id`),
  ADD KEY `penerima_id` (`penerima_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `jenis_surats`
--
ALTER TABLE `jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `kode_surats`
--
ALTER TABLE `kode_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lampirans`
--
ALTER TABLE `lampirans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `penerimas`
--
ALTER TABLE `penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pengirims`
--
ALTER TABLE `pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `perihals`
--
ALTER TABLE `perihals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `sub_jenis_surats`
--
ALTER TABLE `sub_jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sub_sub_jenis_surats`
--
ALTER TABLE `sub_sub_jenis_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `surats`
--
ALTER TABLE `surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `surat_penerimas`
--
ALTER TABLE `surat_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `unit_kerjas`
--
ALTER TABLE `unit_kerjas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `jenis_surats`
--
ALTER TABLE `jenis_surats`
  ADD CONSTRAINT `jenis_surats_ibfk_1` FOREIGN KEY (`kode_surat_id`) REFERENCES `kode_surats` (`id`);

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
  ADD CONSTRAINT `surats_ibfk_1` FOREIGN KEY (`unit_kerja_surat`) REFERENCES `unit_kerjas` (`id`),
  ADD CONSTRAINT `surats_ibfk_2` FOREIGN KEY (`perihal_surat`) REFERENCES `perihals` (`id`),
  ADD CONSTRAINT `surats_ibfk_3` FOREIGN KEY (`pengirim_surat`) REFERENCES `penerimas` (`id`),
  ADD CONSTRAINT `surats_ibfk_4` FOREIGN KEY (`sub_sub_jenis_surat_id`) REFERENCES `sub_sub_jenis_surats` (`id`);

--
-- Constraints for table `surat_penerimas`
--
ALTER TABLE `surat_penerimas`
  ADD CONSTRAINT `surat_penerimas_ibfk_1` FOREIGN KEY (`surat_id`) REFERENCES `surats` (`id`),
  ADD CONSTRAINT `surat_penerimas_ibfk_2` FOREIGN KEY (`penerima_id`) REFERENCES `penerimas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
