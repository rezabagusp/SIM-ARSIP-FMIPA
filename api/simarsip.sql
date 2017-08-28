-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2017 at 05:51 AM
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
-- Table structure for table `hal_surats`
--

CREATE TABLE `hal_surats` (
  `id` int(11) NOT NULL,
  `nama_hal_surat` varchar(255) DEFAULT NULL,
  `kode_hal_surat` varchar(255) DEFAULT NULL,
  `retensi_aktif_hal_surat` int(11) DEFAULT NULL,
  `retensi_inaktif_hal_surat` int(11) DEFAULT NULL,
  `nilai_guna_hal_surat` varchar(255) DEFAULT NULL,
  `perlakuan_hal_surat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hal_surats`
--

INSERT INTO `hal_surats` (`id`, `nama_hal_surat`, `kode_hal_surat`, `retensi_aktif_hal_surat`, `retensi_inaktif_hal_surat`, `nilai_guna_hal_surat`, `perlakuan_hal_surat`, `createdAt`, `updatedAt`) VALUES
(1, 'Pendidikan dan Pelatihan', 'PP', 2, 2, 'Administrasi', 'Ditinjau Kembali', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Pendidikan', 'PP.00.00.00', 2, 2, 'Administrasi', 'Ditinjau kembali', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(1, 'Lainnya', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Dekan FMIPA', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Wakil Dekan FMIPA Bidang Akademik dan Kemahasiswaan', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Wakil Dekan FMIPA Bidang SKP', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(1, 'Lainnya', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Undangan', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Permohonan', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Surat Keputusan', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(1, 'Muhammad Aslam Abdurrohim', 'aslamabdurrohim@gmail.com', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Miqdad Abdurrahman Fawwaz', 'miqdad.fawwaz@gmail.com', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Reza Bagus Permana', 'rezabaguspermana.rbp@gmail.com', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `surats`
--

CREATE TABLE `surats` (
  `id` int(11) NOT NULL,
  `nomor_surat` varchar(255) NOT NULL,
  `judul_surat` varchar(255) DEFAULT NULL,
  `tanggal_surat` datetime NOT NULL,
  `tanggal_terima_surat` datetime NOT NULL,
  `tanggal_entri_surat` datetime NOT NULL,
  `sifat_surat` enum('rahasia','umum') DEFAULT 'umum',
  `kepentingan_surat` enum('segera','biasa') DEFAULT 'biasa',
  `asal_surat` enum('internal','eksternal') DEFAULT 'internal',
  `tipe_surat` enum('masuk','keluar') NOT NULL,
  `keterangan_surat` text,
  `file_surat` varchar(255) NOT NULL,
  `status_surat` enum('aktif','inaktif') DEFAULT 'aktif',
  `perihal_id` int(11) DEFAULT NULL,
  `posisi_surat` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Rektorat', 'REKTOR', 'IT3', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Fakultas MIPA', 'FMIPA', 'IT3.7', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Departemen Ilmu Komputer', 'ILKOM', 'IT3.7.1', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
-- Indexes for table `hal_surats`
--
ALTER TABLE `hal_surats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jabatans`
--
ALTER TABLE `jabatans`
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
-- AUTO_INCREMENT for table `hal_surats`
--
ALTER TABLE `hal_surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `jabatans`
--
ALTER TABLE `jabatans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `lampirans`
--
ALTER TABLE `lampirans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `perihals`
--
ALTER TABLE `perihals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `surats`
--
ALTER TABLE `surats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surat_keluar_penerimas`
--
ALTER TABLE `surat_keluar_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surat_keluar_pengirims`
--
ALTER TABLE `surat_keluar_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surat_masuk_penerimas`
--
ALTER TABLE `surat_masuk_penerimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surat_masuk_pengirims`
--
ALTER TABLE `surat_masuk_pengirims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `unit_kerjas`
--
ALTER TABLE `unit_kerjas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

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
