-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 10.123.0.211:3307
-- Generation Time: Nov 15, 2023 at 02:21 AM
-- Server version: 8.0.25
-- PHP Version: 7.0.33-0+deb9u9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mooagr_agri`
--

-- --------------------------------------------------------

--
-- Table structure for table `agricreations_app`
--

CREATE TABLE `agricreations_app` (
  `id` int NOT NULL,
  `videoId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `videoTitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci TABLESPACE `mooagr_agri`;

--
-- Dumping data for table `agricreations_app`
--

INSERT INTO `agricreations_app` (`id`, `videoId`, `videoTitle`, `description`, `thumbnail`) VALUES
(1, 'Ba58DtoCUes', 'How to hack whats app |tamil|#hkragritechs', 'whatsapp #hack #whatsappweb disclaimer this channel does not promote any illegal activities so this video is made for only ...', 'https://i.ytimg.com/vi/Ba58DtoCUes/hqdefault.jpg'),
(2, 'P5bp-Mcm3Js', 'How to make a slow motion ? video in Android ⚡|smooth action cam|tamil|hkragritechs', 'hellow viewers in this video we are going to make a #slowmotion video in your #androidmobiles ..! using this app we will make a ...', 'https://i.ytimg.com/vi/P5bp-Mcm3Js/hqdefault.jpg'),
(3, 'UBMOHEDY6Uk', 'How to use dynamic island features in android mobile in tamil | bestappsintamil', 'Hi guys, we will see how to use dynamic island features in your android mobile. Recently iPhone 14 launched this new feature in iphone14 series. This feature is fantastic to use, and it\'s very satisfying to see this cool animation. But it would help if yo', 'https://i.ytimg.com/vi/UBMOHEDY6Uk/hqdefault.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `youtube_channel_info`
--

CREATE TABLE `youtube_channel_info` (
  `id` int NOT NULL,
  `channel_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `channel_title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `channle_logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci TABLESPACE `mooagr_agri`;

--
-- Dumping data for table `youtube_channel_info`
--

INSERT INTO `youtube_channel_info` (`id`, `channel_id`, `channel_title`, `channle_logo`) VALUES
(1, 'UCSjSmjY9cEI_ib-NrBElVXw', 'hkr agri techs', 'https://yt3.ggpht.com/ytc/APkrFKbMiM77RuvNcsCBTJFsXFGEMoY6kqLQ5vbd13cT=s240-c-k-c0xffffffff-no-rj-mo'),
(2, 'UCdrrGvlDqvXo4H0aH8Rh8wQ', 'best apps in tamil', 'https://www.agricreations.com/assets/img/logo.png');

-- --------------------------------------------------------

--
-- Table structure for table `youtube_videos_api`
--

CREATE TABLE `youtube_videos_api` (
  `id` int NOT NULL,
  `videoid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `channelid` int NOT NULL,
  `catogries` int NOT NULL,
  `type` int NOT NULL,
  `islive` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci TABLESPACE `mooagr_agri`;

--
-- Dumping data for table `youtube_videos_api`
--

INSERT INTO `youtube_videos_api` (`id`, `videoid`, `image`, `title`, `description`, `channelid`, `catogries`, `type`, `islive`) VALUES
(1, 'Ba58DtoCUes', 'https://i.ytimg.com/vi/Ba58DtoCUes/hqdefault.jpg', 'How to hack whats app |tamil|#hkragritechs', 'whatsapp #hack #whatsappweb disclaimer this channel does not promote any illegal activities so this video is made for only ...', 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `youtube_videos_catogries`
--

CREATE TABLE `youtube_videos_catogries` (
  `id` int NOT NULL,
  `catogries` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci TABLESPACE `mooagr_agri`;

--
-- Dumping data for table `youtube_videos_catogries`
--

INSERT INTO `youtube_videos_catogries` (`id`, `catogries`) VALUES
(1, 'best apps'),
(2, 'whats app'),
(3, 'online earnings');

-- --------------------------------------------------------

--
-- Table structure for table `youtube_video_type`
--

CREATE TABLE `youtube_video_type` (
  `id` int NOT NULL,
  `type` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci TABLESPACE `mooagr_agri`;

--
-- Dumping data for table `youtube_video_type`
--

INSERT INTO `youtube_video_type` (`id`, `type`) VALUES
(1, 'normal'),
(2, 'shorts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agricreations_app`
--
ALTER TABLE `agricreations_app`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `youtube_channel_info`
--
ALTER TABLE `youtube_channel_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `youtube_videos_api`
--
ALTER TABLE `youtube_videos_api`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `youtube_videos_catogries`
--
ALTER TABLE `youtube_videos_catogries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `youtube_video_type`
--
ALTER TABLE `youtube_video_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agricreations_app`
--
ALTER TABLE `agricreations_app`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `youtube_channel_info`
--
ALTER TABLE `youtube_channel_info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `youtube_videos_api`
--
ALTER TABLE `youtube_videos_api`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `youtube_videos_catogries`
--
ALTER TABLE `youtube_videos_catogries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `youtube_video_type`
--
ALTER TABLE `youtube_video_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
