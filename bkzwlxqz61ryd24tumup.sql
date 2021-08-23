-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bkzwlxqz61ryd24tumup-mysql.services.clever-cloud.com:3306
-- Generation Time: Aug 23, 2021 at 03:54 AM
-- Server version: 8.0.15-5
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkzwlxqz61ryd24tumup`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nit` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `nit`, `phone`, `address`, `email`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'first company', 0, '', '', '', '2021-08-20', NULL, NULL),
(2, 'Techt in', 12345645, '3107876409', 'calle falsa 123', 'techtin@gmail.com', '2021-08-22', NULL, NULL),
(3, 'Techt in', 12345645, '3107876409', 'calle falsa 123', 'techtin@gmail.com', '2021-08-22', NULL, NULL),
(4, 'Techt in', 12345645, '3107876409', 'calle falsa 123', 'techtin@gmail.com', '2021-08-22', NULL, NULL),
(5, 'Techt in', 123456450, '3107876409', 'calle falsa 123', 'techtin@gmail.com', '2021-08-22', NULL, NULL),
(6, 'Techt in', 1234564501, '3107876409', 'calle falsa 123', 'techtin@gmail.com', '2021-08-22', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`, `companyId`) VALUES
(1, 'Techt in web site and operations', '2021-08-22', '2021-08-22', NULL, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `ticketStatusId` int(11) DEFAULT NULL,
  `userHistoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ticketsComments`
--

CREATE TABLE `ticketsComments` (
  `id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `ticketId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ticketStatus`
--

CREATE TABLE `ticketStatus` (
  `id` int(11) NOT NULL,
  `decription` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userHistory`
--

CREATE TABLE `userHistory` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `companyId` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `companyId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Oscar Roman', 'oscar@hotmail.com', '$2a$10$A6AuEyL7pmF8UwB/eJqiDuLKWSJNhNU8eJowR3QHNzJ7TpC1US9b.', 6, '2021-08-22', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticketStatusId` (`ticketStatusId`),
  ADD KEY `userHistoryId` (`userHistoryId`);

--
-- Indexes for table `ticketsComments`
--
ALTER TABLE `ticketsComments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `ticketId` (`ticketId`);

--
-- Indexes for table `ticketStatus`
--
ALTER TABLE `ticketStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userHistory`
--
ALTER TABLE `userHistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticketsComments`
--
ALTER TABLE `ticketsComments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticketStatus`
--
ALTER TABLE `ticketStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userHistory`
--
ALTER TABLE `userHistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`ticketStatusId`) REFERENCES `ticketStatus` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`userHistoryId`) REFERENCES `userHistory` (`id`);

--
-- Constraints for table `ticketsComments`
--
ALTER TABLE `ticketsComments`
  ADD CONSTRAINT `ticketsComments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ticketsComments_ibfk_2` FOREIGN KEY (`ticketId`) REFERENCES `tickets` (`id`);

--
-- Constraints for table `userHistory`
--
ALTER TABLE `userHistory`
  ADD CONSTRAINT `userHistory_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
