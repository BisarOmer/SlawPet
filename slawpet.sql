-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2020 at 02:18 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slawpet`
--

-- --------------------------------------------------------

--
-- Table structure for table `administration`
--

CREATE TABLE `administration` (
  `user_id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `administration`
--

INSERT INTO `administration` (`user_id`, `username`, `password`) VALUES
(1, 'bisar', '258');

-- --------------------------------------------------------

--
-- Table structure for table `adopted`
--

CREATE TABLE `adopted` (
  `adopter_id` int(11) NOT NULL,
  `adoption_id` int(11) NOT NULL,
  `saver_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adopted`
--

INSERT INTO `adopted` (`adopter_id`, `adoption_id`, `saver_id`, `status`, `date`) VALUES
(1, 258, 4, 0, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `adoption`
--

CREATE TABLE `adoption` (
  `account_id` int(11) NOT NULL,
  `adoption_id` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `age` int(2) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `city` varchar(75) NOT NULL,
  `pet` varchar(150) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`account_id`, `adoption_id`, `img`, `name`, `age`, `gender`, `city`, `pet`, `content`, `date`, `status`) VALUES
(4, 258, 'bnm.png', '', 8, 'female', 'hawler', 'cat', 'aqlla', '2020-03-26', 1),
(4, 789, 'p.pmg', '', 5, 'male', 'slemani', 'dog', 'zor jwana', '2020-03-09', 0),
(1, 790, 'photo-1586028949425.jpg', '', 6, 'male', 'slemani', 'cat', 'zor zor jwana', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `account_id` int(11) NOT NULL,
  `adoption_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `content` varchar(250) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`account_id`, `adoption_id`, `comment_id`, `content`, `date`) VALUES
(1, 789, 12, 'hello', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `disable`
--

CREATE TABLE `disable` (
  `user_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `account_id` int(11) NOT NULL,
  `address` varchar(150) NOT NULL,
  `certification` varchar(255) NOT NULL,
  `qrCode` varchar(255) NOT NULL,
  `adoptNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`account_id`, `address`, `certification`, `qrCode`, `adoptNumber`) VALUES
(1, 'hawler street', 'qwerthg.png', 'jfdskfk.png', 12),
(4, 'slemni', 'oooooo', 'ahhhhh', 88),
(7, 'Duhok', 'photo-1585316863954.png', 'photo-1585316963081.jpg', 5),
(9, '', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `account_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(30) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `accType` varchar(13) NOT NULL,
  `disable` tinyint(1) DEFAULT 0,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`account_id`, `name`, `email`, `password`, `profile`, `phoneNumber`, `accType`, `disable`, `date`) VALUES
(1, 'Bisar omer', 'BisarO@gmail.com', '123', 'photo-1585246351976.jpg', 852123, '', 0, '0000-00-00'),
(3, 'new binar', 'binar@hotmail.com', '123', 'photo-1585247537231.jpg', 9999, 'User', 1, '0000-00-00'),
(4, 'kk', 'kk@gmail.com', '123', 'photo-1585249085661.jpg', 99, 'User', 0, '0000-00-00'),
(6, 'omer', 'omer@pet', '123', '123.png', 7709988, '', 0, '0000-00-00'),
(7, 'paxshan', 'paxshan@gmail.com', '1234', 'photo-1585318394477.jpg', 75022, 'Organization', 0, '0000-00-00'),
(9, 'PAK', 'pak@gmail.com', '12345', 'default.png', 780, 'Organization', 0, '2020-04-07');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `user_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administration`
--
ALTER TABLE `administration`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `adopted`
--
ALTER TABLE `adopted`
  ADD KEY `account_id` (`adopter_id`),
  ADD KEY `org_id` (`saver_id`),
  ADD KEY `adopted_ibfk_2` (`adoption_id`);

--
-- Indexes for table `adoption`
--
ALTER TABLE `adoption`
  ADD PRIMARY KEY (`adoption_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `comment_ibfk_2` (`adoption_id`);

--
-- Indexes for table `disable`
--
ALTER TABLE `disable`
  ADD KEY `account_id` (`account_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD UNIQUE KEY `account_id` (`account_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD KEY `account_id` (`account_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administration`
--
ALTER TABLE `administration`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adoption`
--
ALTER TABLE `adoption`
  MODIFY `adoption_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=802;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adopted`
--
ALTER TABLE `adopted`
  ADD CONSTRAINT `adopted_ibfk_1` FOREIGN KEY (`adopter_id`) REFERENCES `user` (`account_id`),
  ADD CONSTRAINT `adopted_ibfk_2` FOREIGN KEY (`adoption_id`) REFERENCES `adoption` (`adoption_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `adopted_ibfk_3` FOREIGN KEY (`saver_id`) REFERENCES `user` (`account_id`);

--
-- Constraints for table `adoption`
--
ALTER TABLE `adoption`
  ADD CONSTRAINT `adoption_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user` (`account_id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user` (`account_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`adoption_id`) REFERENCES `adoption` (`adoption_id`) ON DELETE CASCADE;

--
-- Constraints for table `disable`
--
ALTER TABLE `disable`
  ADD CONSTRAINT `disable_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user` (`account_id`),
  ADD CONSTRAINT `disable_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `administration` (`user_id`);

--
-- Constraints for table `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user` (`account_id`);

--
-- Constraints for table `verify`
--
ALTER TABLE `verify`
  ADD CONSTRAINT `verify_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user` (`account_id`),
  ADD CONSTRAINT `verify_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `administration` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
