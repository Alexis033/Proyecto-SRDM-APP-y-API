-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2023 a las 05:50:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `curso` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id`, `curso`) VALUES
(1, 'primero'),
(2, 'segundo'),
(3, 'tercero'),
(4, 'cuarto'),
(5, 'quinto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_lista_documentos` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `url_documento` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `documento_identidad` int(15) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `id_curso`, `correo`, `nombres`, `apellidos`, `documento_identidad`, `edad`, `telefono`) VALUES
(10, 1, 'pepe@h.co', 'Pepe', 'Rodriguez', 12345, 5, NULL),
(11, 3, 'franco@h.co', 'Franco', 'Cruz', 102131, 7, 2147483647);

--
-- Disparadores `estudiante`
--
DELIMITER $$
CREATE TRIGGER `eliminar_usuario` BEFORE DELETE ON `estudiante` FOR EACH ROW BEGIN
delete from usuario 
where usuario= old.correo;
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
-- Estructura de tabla para la tabla `lista_documentos`
--

CREATE TABLE `lista_documentos` (
  `id` int(11) NOT NULL,
  `nombre_documento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `lista_documentos`
--

INSERT INTO `lista_documentos` (`id`, `nombre_documento`) VALUES
(1, 'Documento de identidad'),
(2, 'Certificados escolares'),
(3, 'Certificado de salud');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
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
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `Rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `Rol`) VALUES
(1, 'administrador'),
(2, 'estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
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
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `password`, `id_rol`, `estado`, `created_at`) VALUES
(1, '10guevarafm1102@gmail.com', '$2b$12$bPVqPtRWwgcIoEPmnFtlBu9tivprMMMIM8r7htIL/MoFhVK/duTka', 1, 1, NULL),
(27, 'pepe@h.co', '$2b$12$i7AsZxYdDQqG/JWNa15ScuBOcJTIQ9uFDB1rTZb37bxpqDykukH8u', 2, 1, '2023-02-12 19:10:14'),
(32, 'franco@h.co', '$2b$12$3A7xPHrKC0P2NGJuwz72v.PDtzHA32XJgLqQO72RUffOaEvBspfpy', 2, 1, '2023-02-27 16:41:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_documento_estudiante_id_idx` (`id_estudiante`),
  ADD KEY `fk_documento_lista-documentos_id_idx` (`id_lista_documentos`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Correo_UNIQUE` (`correo`),
  ADD UNIQUE KEY `id Persona_UNIQUE` (`id`),
  ADD KEY `fk_Curso_Id_idx` (`id_curso`);

--
-- Indices de la tabla `lista_documentos`
--
ALTER TABLE `lista_documentos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`id`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Matricula_UNIQUE` (`id`),
  ADD UNIQUE KEY `id_estudiante_UNIQUE` (`id_estudiante`),
  ADD KEY `fk_Matricula_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Usuario_unique` (`usuario`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Usuario_Rol1_idx` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `fk_documento_estudiante_id` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_documento_lista-documentos_id` FOREIGN KEY (`id_lista_documentos`) REFERENCES `lista_documentos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `fk_Estudiante_Curso_Id` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_estudiante_usuario_Usuario` FOREIGN KEY (`correo`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `fk_Matricula_Estudiante1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
