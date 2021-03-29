CREATE DATABASE IF NOT EXISTS bolsadetrabajo_db COLLATE utf8_general_ci;
USE bolsadetrabajo_db;

DROP TABLE IF EXISTS postulante;
DROP TABLE IF EXISTS vacante;
DROP TABLE IF EXISTS empleador;
DROP TABLE IF EXISTS administrador;

CREATE TABLE administrador (
    user VARCHAR(10) NOT NULL PRIMARY KEY,
    pass VARCHAR(30) NOT NULL
) COLLATE utf8_general_ci;

CREATE TABLE postulante (
    idPostulante CHAR(9) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono CHAR(10) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    sexo ENUM('M', 'F', 'X') NOT NULL,
    estado VARCHAR(50) NOT NULL,
    universidad VARCHAR(50) NOT NULL,
    facultad VARCHAR(50) NULL,
    carrera VARCHAR(50) NOT NULL,
    situacionAcademica ENUM('P', 'E', 'M', 'D') NOT NULL, -- Pasante, egresado, maestría, doctorado
    semestre CHAR(2) NULL, 
    situacionLaboral ENUM('CE', 'SE') NOT NULL,
    tipo ENUM ('I', 'E') NOT NULL DEFAULT 'I' -- Interno o externo
) COLLATE utf8_general_ci;

CREATE TABLE empleador (
    idEmpleador TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreEmpleador VARCHAR(100) NOT NULL,
    correoEmpleador VARCHAR(50) NOT NULL,
    puestoEmpleador VARCHAR(100) NOT NULL,
    telefonoEmpleador CHAR(10) NOT NULL,
    extEmpleador VARCHAR(5) NOT NULL,
    celularEmpleador CHAR(10) NOT NULL,
    passEmpleador VARCHAR(50) NOT NULL,
    nombreEmpresa VARCHAR(100) NOT NULL,
    direccionEmpresa VARCHAR(50) NOT NULL,
    sitioEmpresa VARCHAR(50) NULL
) COLLATE utf8_general_ci;

CREATE TABLE vacante (
    idVacante INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipoVacante ENUM('TC', 'MT', 'PP', 'B', 'T') NOT NULL, -- Tiempo completo, medio tiempo, practicas profesionales, becario, trainee.
    nombreVacante VARCHAR(100) NOT NULL,
    estatusRequerido VARCHAR(30) NOT NULL,
    terminoMaterias CHAR(6) NULL,
    carreras VARCHAR(100) NOT NULL,
    sexo ENUM('M', 'F', 'X') NOT NULL,
    ingles ENUM('I', 'A', 'X') NOT NULL, -- Intermedio, avanzado, No necesario
    habilidades VARCHAR(300) NOT NULL,
    experiencia VARCHAR(300) NOT NULL,
    edadMinima CHAR(2) NULL,
    actividades VARCHAR(300) NOT NULL,
    horarioLaboral VARCHAR(50) NOT NULL,
    zona VARCHAR(50) NOT NULL,
    sueldo VARCHAR(50) NOT NULL,
    contrato ENUM('D', 'O') NOT NULL, -- Contratación directa, outsoursing
    vacantesTotales TINYINT NOT NULL,
    vacantesDisponibles TINYINT NOT NULL,
    estatus ENUM ('P', 'A', 'R') NOT NULL DEFAULT 'P', -- Pendiente, aprobada o rechazada
    idEmpleador TINYINT NOT NULL,
    CONSTRAINT idEmpleador_fk_vacante_empleador FOREIGN KEY (idEmpleador) REFERENCES empleador (idEmpleador)
) COLLATE utf8_general_ci;

INSERT INTO administrador (user, pass) VALUES ('admin', 'bolsadetrabajo');
-- CREATE USER 'bolsadetrabajo'@localhost IDENTIFIED BY 'b0ls4Tr4b@j0';
-- GRANT ALL PRIVILEGES ON bolsadetrabajo_db.* TO 'bolsadetrabajo'@'localhost';

