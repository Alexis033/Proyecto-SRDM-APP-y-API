-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2023 a las 20:55:11
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `estudiantes_documentos_incompletos` (IN `estado_documento` INT)   begin
select e.id as id_estuadiante, e.nombres as Nombre, e.apellidos as Apellidos, 
group_concat(l.Nombre_documento order by d.id separator ', ') as Documentos
from estudiante as e
inner join documento as d on e.id=d.Id_Estudiante
inner join lista_documentos as l on d.id_documento=l.id
where d.estado=estado_documento
group by id_estudiante;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ver_documentos_estudiante` (IN `estado_documento` INT, `estudiante_id` INT)   begin
select e.id as id_estuadiante, e.nombres as Nombre, e.apellidos as Apellidos, 
group_concat(l.Nombre_documento order by d.id separator ', ') as Documentos
from estudiante as e
inner join documento as d on e.id=d.id_estudiante
inner join lista_documentos as l on d.id_documento=l.id
where d.estado=estado_documento and e.id=estudiante_id
group by id_estudiante;
end$$

DELIMITER ;

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
  `Id_Estudiante` int(11) NOT NULL,
  `Id_lista_documentos` int(11) NOT NULL,
  `Estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `documento`
--

INSERT INTO `documento` (`id`, `Id_Estudiante`, `Id_lista_documentos`, `Estado`) VALUES
(1, 2, 1, '1'),
(2, 2, 2, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `Id_curso` int(11) NOT NULL,
  `Correo` varchar(250) NOT NULL,
  `Nombres` varchar(200) NOT NULL,
  `Apellidos` varchar(200) NOT NULL,
  `Codigo` int(11) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Telefono` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `Id_curso`, `Correo`, `Nombres`, `Apellidos`, `Codigo`, `Edad`, `Telefono`) VALUES
(2, 2, 'hola3@hotmail.com', 'Juan', 'Caro', NULL, NULL, NULL),
(5, 5, 'pruebapepe@gmail.com', 'Pepe', 'Perez', NULL, NULL, NULL);

--
-- Disparadores `estudiante`
--
DELIMITER $$
CREATE TRIGGER `agregar_usuario` AFTER INSERT ON `estudiante` FOR EACH ROW BEGIN
insert into usuario (usuario) value (new.correo);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `eliminar_usuario` BEFORE DELETE ON `estudiante` FOR EACH ROW BEGIN
delete from usuario 
where usuario= old.correo;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modificar_usuario` AFTER UPDATE ON `estudiante` FOR EACH ROW BEGIN
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
  `Id` int(11) NOT NULL,
  `Nombre_documento` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `lista_documentos`
--

INSERT INTO `lista_documentos` (`Id`, `Nombre_documento`) VALUES
(1, 'Documento de identidad'),
(2, 'Certificados escolares'),
(3, 'Certificado de salud');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matrícula`
--

CREATE TABLE `matrícula` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `Fecha_de_solicitud` datetime DEFAULT NULL,
  `Fecha_de_vinculación` datetime DEFAULT NULL,
  `Fecha_de_desvinculación` datetime DEFAULT NULL
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
  `Usuario` varchar(45) NOT NULL,
  `Contraseña` varchar(45) NOT NULL DEFAULT '123456789',
  `id_rol` int(11) DEFAULT 2,
  `Estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 KEY_BLOCK_SIZE=2;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `Usuario`, `Contraseña`, `id_rol`, `Estado`) VALUES
(1, '10guevarafm1102@gmail.com', '123456789', 1, NULL),
(2, 'hola3@hotmail.com', '123456789', 2, NULL),
(3, 'pruebapepe@gmail.com', '123456789', 2, NULL);

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
  ADD KEY `fk_documento_estudiante_id_idx` (`Id_Estudiante`),
  ADD KEY `fk_documento_lista-documentos_id_idx` (`Id_lista_documentos`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Correo_UNIQUE` (`Correo`),
  ADD UNIQUE KEY `id Persona_UNIQUE` (`id`),
  ADD KEY `fk_Curso_Id_idx` (`Id_curso`);

--
-- Indices de la tabla `lista_documentos`
--
ALTER TABLE `lista_documentos`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- Indices de la tabla `matrícula`
--
ALTER TABLE `matrícula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Matricula_UNIQUE` (`id`),
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
  ADD UNIQUE KEY `Usuario_unique` (`Usuario`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `matrícula`
--
ALTER TABLE `matrícula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `fk_documento_estudiante_id` FOREIGN KEY (`Id_Estudiante`) REFERENCES `estudiante` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_documento_lista-documentos_id` FOREIGN KEY (`Id_lista_documentos`) REFERENCES `lista_documentos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `fk_Estudiante_Curso_Id` FOREIGN KEY (`Id_curso`) REFERENCES `curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `matrícula`
--
ALTER TABLE `matrícula`
  ADD CONSTRAINT `fk_Matricula_Estudiante1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Rol1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
