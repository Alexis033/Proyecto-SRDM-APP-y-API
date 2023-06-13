-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 04:33 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `curso` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `curso`
--

INSERT INTO `curso` (`id`, `curso`) VALUES
(1, 'primero'),
(2, 'segundo'),
(3, 'tercero'),
(4, 'cuarto'),
(5, 'quinto');

-- --------------------------------------------------------

--
-- Table structure for table `documento`
--

CREATE TABLE `documento` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_lista_documentos` int(11) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT 1,
  `url_documento` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `documento`
--

INSERT INTO `documento` (`id`, `id_estudiante`, `id_lista_documentos`, `estado`, `url_documento`) VALUES
(42, 10, 1, 2, 'files\\10\\Documento de identidad.pdf'),
(43, 10, 3, 1, 'files\\10\\Certificado de salud.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `documento_identidad` int(15) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estudiante`
--

INSERT INTO `estudiante` (`id`, `id_curso`, `correo`, `nombres`, `apellidos`, `documento_identidad`, `edad`, `telefono`, `estado`) VALUES
(10, 3, 'pepe@h.com', 'Pepe', 'Rodriguez A', 123456, 5, '6147483647', 'Pendiente'),
(11, 3, 'franco@h.co', 'Franco', 'Cruz', 102131, 7, NULL, 'Pendiente'),
(27, 4, 'paco@h.co', 'Paco R', 'Montes', 4356, 4, NULL, 'Pendiente'),
(29, 1, 'martica@h.co', 'Marta', 'Cruz Sanchez', 100000042, 6, NULL, 'Pendiente'),
(30, 3, 'tatiana@h.co', 'Tatiana Lorena', 'Maldonado Torrez', 1232455, 9, NULL, 'Pendiente'),
(31, 5, 'florez@g.co', 'Juan Camilo', 'Florez', 3245678, 12, NULL, 'Pendiente'),
(34, 5, 'john1@h.com', 'John 1', 'Doe', 123456, 10, NULL, 'Pendiente'),
(35, 5, 'laurap@gmail.com', 'Laura', 'Prueba', 34567879, 10, '4323234234', 'Pendiente');

--
-- Triggers `estudiante`
--
DELIMITER $$
CREATE TRIGGER `eliminar_usuario` BEFORE DELETE ON `estudiante` FOR EACH ROW BEGIN
delete from usuario 
where usuario= old.correo;
delete from documento
where id_estudiante = old.id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `estudiante_BEFORE_UPDATE` BEFORE UPDATE ON `estudiante` FOR EACH ROW BEGIN
update usuario set usuario= new.correo
where usuario=old.correo;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `lista_documentos`
--

CREATE TABLE `lista_documentos` (
  `id` int(11) NOT NULL,
  `nombre_documento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lista_documentos`
--

INSERT INTO `lista_documentos` (`id`, `nombre_documento`) VALUES
(1, 'Documento de identidad'),
(2, 'Certificados escolares'),
(3, 'Certificado de salud');

-- --------------------------------------------------------

--
-- Table structure for table `matricula`
--

CREATE TABLE `matricula` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `informacion` longtext NOT NULL,
  `fecha_vinculacion` datetime DEFAULT NULL,
  `fecha_desvinculacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `Rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id`, `Rol`) VALUES
(1, 'administrador'),
(2, 'estudiante');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT '123456789',
  `id_rol` int(11) NOT NULL DEFAULT 2,
  `estado` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 KEY_BLOCK_SIZE=2;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `password`, `id_rol`, `estado`, `created_at`) VALUES
(27, 'pepe@h.com', '$2b$12$1trUMIUzRKNxls9NfC6UeO45ce9bDdQ3Or7aqzrhov7LVmb1bTAAW', 2, 1, '2023-02-12 19:10:14'),
(32, 'franco@h.co', '$2b$12$3A7xPHrKC0P2NGJuwz72v.PDtzHA32XJgLqQO72RUffOaEvBspfpy', 2, 1, '2023-02-27 16:41:42'),
(38, 'paco@h.co', '$2b$12$UBZ2JPEYs2AuXLQG9zpHJOGaigjZumUamXurkd9nJDw/ZVGRu0DdG', 2, 1, '2023-03-11 17:20:44'),
(52, '10guevarafm1102@gmail.com', '$2b$12$EJpf4xNvmmdL0ZEgaOAylOqpBgBj3ujkalhJ3y//KR2EwxXBnz65O', 1, 1, NULL),
(54, 'martica@h.co', '$2b$12$0CDepktZljfuUX2csmJDP.FY5yRRip9l5fKg04xFHlVjCr.UmzH0e', 2, 1, '2023-03-14 20:14:31'),
(55, 'tatiana@h.co', '$2b$12$QRboYZAI0M/1EgCdas8piulAhrwTyAjUWmMr3jTwim/8SZxV68hOO', 2, 1, '2023-03-15 10:08:22'),
(56, 'florez@g.co', '$2b$12$p1.tmV20s8Trv.ZPWRlVFO12j7IZtdTkjFr/WAzZBrKTpZNAlng/2', 2, 1, '2023-03-15 11:00:59'),
(59, 'john1@h.com', '$2b$12$yeIA3KcaifF/UowELtMzwuovNYZGIVNZEktzcwikC3tueRip4QII6', 2, 1, '2023-04-18 19:25:26'),
(60, 'laurap@gmail.com', '$2b$12$0xASVbc6ch4ytW6Wmugbj.jg5ZezFIdrdq3UyFkr0pmzygJmHdFb6', 2, 1, '2023-06-07 09:53:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_documento_estudiante_id_idx` (`id_estudiante`),
  ADD KEY `fk_documento_lista-documentos_id_idx` (`id_lista_documentos`);

--
-- Indexes for table `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Correo_UNIQUE` (`correo`),
  ADD UNIQUE KEY `id Persona_UNIQUE` (`id`),
  ADD KEY `fk_Curso_Id_idx` (`id_curso`);

--
-- Indexes for table `lista_documentos`
--
ALTER TABLE `lista_documentos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`id`);

--
-- Indexes for table `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Matricula_UNIQUE` (`id`),
  ADD UNIQUE KEY `id_estudiante_UNIQUE` (`id_estudiante`),
  ADD KEY `fk_Matricula_Estudiante1_idx` (`id_estudiante`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Usuario_unique` (`usuario`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Usuario_Rol1_idx` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documento`
--
ALTER TABLE `documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `matricula`
--
ALTER TABLE `matricula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `fk_documento_estudiante_id` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_documento_lista-documentos_id` FOREIGN KEY (`id_lista_documentos`) REFERENCES `lista_documentos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `fk_Estudiante_Curso_Id` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_estudiante_usuario_Usuario` FOREIGN KEY (`correo`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `fk_Matricula_Estudiante1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
