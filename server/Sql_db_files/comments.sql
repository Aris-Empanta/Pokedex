-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: localhost:3306
-- Χρόνος δημιουργίας: 12 Δεκ 2022 στις 12:51:04
-- Έκδοση διακομιστή: 10.3.37-MariaDB
-- Έκδοση PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `arisdb_pokedex`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `comments`
--

CREATE TABLE `comments` (
  `user` varchar(255) DEFAULT NULL,
  `pokemon` varchar(255) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Άδειασμα δεδομένων του πίνακα `comments`
--

INSERT INTO `comments` (`user`, `pokemon`, `comment`) VALUES
('tasos', 'raichu', 'hey'),
('tasos', 'raichu', 'hey rai'),
('tasos', 'raichu', 'hey rai'),
('tasos', 'raichu', 'hey'),
('tasos', 'raichu', 'hey rai'),
('aris', 'charizard', 'the best pokemon in the world'),
('aris', 'charizard', 'the best in the west'),
('aris', 'charizard', 'the best in the west'),
('aris', 'charizard', 'the best in the west'),
('aris', 'pikachu', 'the best'),
('aris', 'pikachu', 'the best'),
('aris', 'pikachu', 'hey pika'),
('aris', 'pikachu', 'hey pika'),
('aris', 'pikachu', 'yo pika'),
('aris', 'charmander', 'Hey charmie'),
('aris', 'raticate', 'I like you'),
('aris', 'pikachu', 'hey pikaaa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
