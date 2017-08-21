-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2017 at 05:57 AM
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
(1, 'Undangan', '2017-08-15 11:49:00', '2017-08-15 11:49:00', 'lampiran-1503251669296.pdf', 24, '2017-08-21 00:54:51', '2017-08-21 10:01:19'),
(2, 'Undangan', '2017-08-15 11:49:00', '2017-08-15 11:49:00', 'lampiran-1503251698814.pdf', 24, '2017-08-21 00:55:12', '2017-08-21 10:01:19');

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
-- Table structure for table `posisis`
--

CREATE TABLE `posisis` (
  `id` int(11) NOT NULL,
  `nama_posisi` varchar(255) DEFAULT NULL,
  `keterangan_posisi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(2, 'Aslam Abdurrohim', 'aslamabdurrohim@gmail.com', 2, '2017-08-18 14:53:02', '2017-08-18 14:53:02'),
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
  `kepentingan_surat` enum('segera','biasa') DEFAULT 'biasa',
  `tipe_surat` enum('masuk','keluar') NOT NULL,
  `keterangan_surat` text,
  `file_surat` varchar(255) NOT NULL,
  `status_surat` enum('aktif','inaktif') DEFAULT 'aktif',
  `perihal_id` int(11) DEFAULT NULL,
  `posisi_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surats`
--

INSERT INTO `surats` (`id`, `nomor_surat`, `unit_kerja_surat`, `hal_surat`, `tahun_surat`, `tanggal_surat`, `tanggal_terima_surat`, `tanggal_entri_surat`, `sifat_surat`, `kepentingan_surat`, `tipe_surat`, `keterangan_surat`, `file_surat`, `status_surat`, `perihal_id`, `posisi_id`, `createdAt`, `updatedAt`) VALUES
(1, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 00:58:53', '2017-08-21 00:58:53'),
(2, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:04:36', '2017-08-21 01:04:36'),
(3, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:05:32', '2017-08-21 01:05:32'),
(4, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:07:18', '2017-08-21 01:07:18'),
(5, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:13:02', '2017-08-21 01:13:02'),
(6, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:16:53', '2017-08-21 01:16:53'),
(7, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:17:52', '2017-08-21 01:17:52'),
(8, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:23:04', '2017-08-21 01:23:04'),
(9, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:23:21', '2017-08-21 01:23:21'),
(10, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:24:03', '2017-08-21 01:24:03'),
(11, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:24:19', '2017-08-21 01:24:19'),
(12, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:25:45', '2017-08-21 01:25:45'),
(13, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:29:11', '2017-08-21 01:29:11'),
(14, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:29:29', '2017-08-21 01:29:29'),
(15, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:40:30', '2017-08-21 01:40:30'),
(16, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:43:54', '2017-08-21 01:43:54'),
(17, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:48:58', '2017-08-21 01:48:58'),
(18, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:50:05', '2017-08-21 01:50:05'),
(19, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:51:03', '2017-08-21 01:51:03'),
(20, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:52:20', '2017-08-21 01:52:20'),
(21, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:56:53', '2017-08-21 01:56:53'),
(22, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:59:27', '2017-08-21 01:59:27'),
(23, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'keluar', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 01:59:56', '2017-08-21 01:59:56'),
(24, 197, 'IT3.7', 'PP.00.00.00', 2017, '2017-08-14 10:00:00', '2017-08-14 10:00:00', '2017-08-14 10:00:00', 'umum', 'biasa', 'masuk', NULL, 'surat-1503251901773.pdf', 'aktif', 1, NULL, '2017-08-21 10:01:18', '2017-08-21 10:01:18');

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
(23, 24, 1, 0, '2017-08-21 10:01:19', '2017-08-21 10:01:19');

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
(23, 24, 'Dr. Ir. Sri Nurdiati, M.Sc', '2017-08-21 10:01:19', '2017-08-21 10:01:19');

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
-- Indexes for table `posisis`
--
ALTER TABLE `posisis`
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
  ADD KEY `perihal_id` (`perihal_id`),
  ADD KEY `posisi_id` (`posisi_id`);

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
-- AUTO_INCREMENT for table `posisis`
--
ALTER TABLE `posisis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
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
  ADD CONSTRAINT `surats_ibfk_1` FOREIGN KEY (`perihal_id`) REFERENCES `perihals` (`id`),
  ADD CONSTRAINT `surats_ibfk_2` FOREIGN KEY (`posisi_id`) REFERENCES `posisis` (`id`);

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
