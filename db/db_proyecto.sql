-- ============================================================================
-- PROYECTO FINAL DAWA - Sistema Web Inteligente de Gestión de Tutorías
-- Universidad de Guayaquil - Desarrollo de Aplicaciones Web Avanzada
-- Script 01: Creación de esquema y tablas (PostgreSQL)
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS dawa;

-- ============================================================================
-- MÓDULO DE SEGURIDAD (ws_seguridad)
-- ============================================================================

-- SEG-R01: Gestión de usuarios
CREATE TABLE IF NOT EXISTS dawa.tb_user (
    usr_id              SERIAL PRIMARY KEY,
    usr_login           VARCHAR(50) NOT NULL UNIQUE,
    usr_password        VARCHAR(200) NOT NULL,
    usr_name            VARCHAR(150) NOT NULL,
    usr_mail            VARCHAR(150) NOT NULL,
    usr_state           BOOLEAN NOT NULL DEFAULT TRUE,
    usr_created_by      VARCHAR(50),
    usr_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    usr_modified_by     VARCHAR(50),
    usr_modified_date   TIMESTAMP,
    usr_deleted_by      VARCHAR(50),
    usr_deleted_date    TIMESTAMP
);

-- SEG-R02: Gestión de roles
CREATE TABLE IF NOT EXISTS dawa.tb_rol (
    rol_id              SERIAL PRIMARY KEY,
    rol_name            VARCHAR(50) NOT NULL UNIQUE,
    rol_description     VARCHAR(200),
    rol_state           BOOLEAN NOT NULL DEFAULT TRUE,
    rol_created_by      VARCHAR(50),
    rol_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    rol_modified_by     VARCHAR(50),
    rol_modified_date   TIMESTAMP,
    rol_deleted_by      VARCHAR(50),
    rol_deleted_date    TIMESTAMP
);

-- SEG-R03: Asignación de roles a usuarios
CREATE TABLE IF NOT EXISTS dawa.tb_user_rol (
    uro_id              SERIAL PRIMARY KEY,
    uro_user_id         INTEGER NOT NULL REFERENCES dawa.tb_user (usr_id),
    uro_rol_id          INTEGER NOT NULL REFERENCES dawa.tb_rol (rol_id),
    uro_state           BOOLEAN NOT NULL DEFAULT TRUE,
    uro_created_by      VARCHAR(50),
    uro_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    uro_deleted_by      VARCHAR(50),
    uro_deleted_date    TIMESTAMP
);

-- SEG-R06: Gestión de permisos por rol
CREATE TABLE IF NOT EXISTS dawa.tb_permiso (
    per_id              SERIAL PRIMARY KEY,
    per_name            VARCHAR(80) NOT NULL,
    per_description     VARCHAR(200),
    per_modulo          VARCHAR(80),
    per_state           BOOLEAN NOT NULL DEFAULT TRUE,
    per_created_by      VARCHAR(50),
    per_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    per_modified_by     VARCHAR(50),
    per_modified_date   TIMESTAMP,
    per_deleted_by      VARCHAR(50),
    per_deleted_date    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dawa.tb_rol_permiso (
    rpe_id              SERIAL PRIMARY KEY,
    rpe_rol_id          INTEGER NOT NULL REFERENCES dawa.tb_rol (rol_id),
    rpe_permiso_id      INTEGER NOT NULL REFERENCES dawa.tb_permiso (per_id),
    rpe_state           BOOLEAN NOT NULL DEFAULT TRUE,
    rpe_created_by      VARCHAR(50),
    rpe_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    rpe_deleted_by      VARCHAR(50),
    rpe_deleted_date    TIMESTAMP
);

-- SEG-R07: Cierre de sesión y control de tokens
CREATE TABLE IF NOT EXISTS dawa.tb_token_revocado (
    tok_id              SERIAL PRIMARY KEY,
    tok_token           TEXT NOT NULL,
    tok_usuario         VARCHAR(50),
    tok_fecha           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SEG-R08: Auditoría de accesos
CREATE TABLE IF NOT EXISTS dawa.tb_auditoria_acceso (
    aud_id              SERIAL PRIMARY KEY,
    aud_usuario         VARCHAR(50),
    aud_accion          VARCHAR(50) NOT NULL,
    aud_exitoso         BOOLEAN NOT NULL DEFAULT TRUE,
    aud_detalle         VARCHAR(300),
    aud_fecha           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- MÓDULO DE ADMINISTRACIÓN ACADÉMICA (ws_academico)
-- ============================================================================

-- ADM-R01: Gestión de facultades
CREATE TABLE IF NOT EXISTS dawa.tb_facultad (
    fac_id              SERIAL PRIMARY KEY,
    fac_name            VARCHAR(150) NOT NULL,
    fac_description     VARCHAR(300),
    fac_state           BOOLEAN NOT NULL DEFAULT TRUE,
    fac_created_by      VARCHAR(50),
    fac_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    fac_modified_by     VARCHAR(50),
    fac_modified_date   TIMESTAMP,
    fac_deleted_by      VARCHAR(50),
    fac_deleted_date    TIMESTAMP
);

-- ADM-R02: Gestión de carreras
CREATE TABLE IF NOT EXISTS dawa.tb_carrera (
    car_id              SERIAL PRIMARY KEY,
    car_name            VARCHAR(150) NOT NULL,
    car_description     VARCHAR(300),
    car_facultad_id     INTEGER NOT NULL REFERENCES dawa.tb_facultad (fac_id),
    car_state           BOOLEAN NOT NULL DEFAULT TRUE,
    car_created_by      VARCHAR(50),
    car_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    car_modified_by     VARCHAR(50),
    car_modified_date   TIMESTAMP,
    car_deleted_by      VARCHAR(50),
    car_deleted_date    TIMESTAMP
);

-- ADM-R03: Gestión de asignaturas
CREATE TABLE IF NOT EXISTS dawa.tb_asignatura (
    asi_id              SERIAL PRIMARY KEY,
    asi_codigo          VARCHAR(20) NOT NULL,
    asi_name            VARCHAR(150) NOT NULL,
    asi_nivel           INTEGER NOT NULL DEFAULT 1,
    asi_carrera_id      INTEGER NOT NULL REFERENCES dawa.tb_carrera (car_id),
    asi_state           BOOLEAN NOT NULL DEFAULT TRUE,
    asi_created_by      VARCHAR(50),
    asi_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    asi_modified_by     VARCHAR(50),
    asi_modified_date   TIMESTAMP,
    asi_deleted_by      VARCHAR(50),
    asi_deleted_date    TIMESTAMP
);

-- ADM-R04: Gestión de periodos académicos
CREATE TABLE IF NOT EXISTS dawa.tb_periodo (
    prd_id              SERIAL PRIMARY KEY,
    prd_name            VARCHAR(80) NOT NULL,
    prd_fecha_inicio    DATE NOT NULL,
    prd_fecha_fin       DATE NOT NULL,
    prd_activo          BOOLEAN NOT NULL DEFAULT FALSE,
    prd_state           BOOLEAN NOT NULL DEFAULT TRUE,
    prd_created_by      VARCHAR(50),
    prd_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    prd_modified_by     VARCHAR(50),
    prd_modified_date   TIMESTAMP,
    prd_deleted_by      VARCHAR(50),
    prd_deleted_date    TIMESTAMP
);

-- ADM-R05: Gestión de docentes
CREATE TABLE IF NOT EXISTS dawa.tb_docente (
    doc_id              SERIAL PRIMARY KEY,
    doc_cedula          VARCHAR(15) NOT NULL UNIQUE,
    doc_nombres         VARCHAR(100) NOT NULL,
    doc_apellidos       VARCHAR(100) NOT NULL,
    doc_correo          VARCHAR(150) NOT NULL,
    doc_telefono        VARCHAR(20),
    doc_user_id         INTEGER REFERENCES dawa.tb_user (usr_id),
    doc_state           BOOLEAN NOT NULL DEFAULT TRUE,
    doc_created_by      VARCHAR(50),
    doc_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    doc_modified_by     VARCHAR(50),
    doc_modified_date   TIMESTAMP,
    doc_deleted_by      VARCHAR(50),
    doc_deleted_date    TIMESTAMP
);

-- ADM-R06: Gestión de estudiantes
CREATE TABLE IF NOT EXISTS dawa.tb_estudiante (
    est_id              SERIAL PRIMARY KEY,
    est_cedula          VARCHAR(15) NOT NULL UNIQUE,
    est_nombres         VARCHAR(100) NOT NULL,
    est_apellidos       VARCHAR(100) NOT NULL,
    est_correo          VARCHAR(150) NOT NULL,
    est_telefono        VARCHAR(20),
    est_nivel           INTEGER NOT NULL DEFAULT 1,
    est_carrera_id      INTEGER NOT NULL REFERENCES dawa.tb_carrera (car_id),
    est_user_id         INTEGER REFERENCES dawa.tb_user (usr_id),
    est_state           BOOLEAN NOT NULL DEFAULT TRUE,
    est_created_by      VARCHAR(50),
    est_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    est_modified_by     VARCHAR(50),
    est_modified_date   TIMESTAMP,
    est_deleted_by      VARCHAR(50),
    est_deleted_date    TIMESTAMP
);

-- ADM-R07: Gestión de paralelos o cursos
CREATE TABLE IF NOT EXISTS dawa.tb_paralelo (
    par_id              SERIAL PRIMARY KEY,
    par_name            VARCHAR(20) NOT NULL,
    par_asignatura_id   INTEGER NOT NULL REFERENCES dawa.tb_asignatura (asi_id),
    par_periodo_id      INTEGER NOT NULL REFERENCES dawa.tb_periodo (prd_id),
    par_docente_id      INTEGER NOT NULL REFERENCES dawa.tb_docente (doc_id),
    par_state           BOOLEAN NOT NULL DEFAULT TRUE,
    par_created_by      VARCHAR(50),
    par_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    par_modified_by     VARCHAR(50),
    par_modified_date   TIMESTAMP,
    par_deleted_by      VARCHAR(50),
    par_deleted_date    TIMESTAMP
);

-- ADM-R08: Parametrización de horarios de atención de tutorías
CREATE TABLE IF NOT EXISTS dawa.tb_horario (
    hor_id              SERIAL PRIMARY KEY,
    hor_docente_id      INTEGER NOT NULL REFERENCES dawa.tb_docente (doc_id),
    hor_periodo_id      INTEGER REFERENCES dawa.tb_periodo (prd_id),
    hor_dia_semana      INTEGER NOT NULL CHECK (hor_dia_semana BETWEEN 1 AND 7),
    hor_hora_inicio     TIME NOT NULL,
    hor_hora_fin        TIME NOT NULL,
    hor_modalidad       VARCHAR(20) NOT NULL DEFAULT 'PRESENCIAL',
    hor_state           BOOLEAN NOT NULL DEFAULT TRUE,
    hor_created_by      VARCHAR(50),
    hor_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    hor_modified_by     VARCHAR(50),
    hor_modified_date   TIMESTAMP,
    hor_deleted_by      VARCHAR(50),
    hor_deleted_date    TIMESTAMP
);

-- ============================================================================
-- MÓDULO DE GESTIÓN DE TUTORÍAS (ws_tutorias)
-- ============================================================================

-- TUT-R01..R07: Solicitudes y tutorías con gestión de estados
CREATE TABLE IF NOT EXISTS dawa.tb_tutoria (
    tut_id              SERIAL PRIMARY KEY,
    tut_estudiante_id   INTEGER NOT NULL REFERENCES dawa.tb_estudiante (est_id),
    tut_docente_id      INTEGER REFERENCES dawa.tb_docente (doc_id),
    tut_asignatura_id   INTEGER NOT NULL REFERENCES dawa.tb_asignatura (asi_id),
    tut_tema            VARCHAR(200) NOT NULL,
    tut_descripcion     VARCHAR(500),
    tut_fecha           DATE NOT NULL,
    tut_hora_inicio     TIME NOT NULL,
    tut_hora_fin        TIME NOT NULL,
    tut_modalidad       VARCHAR(20) NOT NULL DEFAULT 'PRESENCIAL',
    tut_estado          VARCHAR(20) NOT NULL DEFAULT 'SOLICITADA'
                        CHECK (tut_estado IN ('SOLICITADA','PENDIENTE','CONFIRMADA','ATENDIDA','CANCELADA','NO_ASISTIDA')),
    tut_asistencia      BOOLEAN,
    tut_state           BOOLEAN NOT NULL DEFAULT TRUE,
    tut_created_by      VARCHAR(50),
    tut_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    tut_modified_by     VARCHAR(50),
    tut_modified_date   TIMESTAMP
);

-- TUT-R06: Bitácora de atención de tutoría
CREATE TABLE IF NOT EXISTS dawa.tb_bitacora (
    bit_id                    SERIAL PRIMARY KEY,
    bit_tutoria_id            INTEGER NOT NULL REFERENCES dawa.tb_tutoria (tut_id),
    bit_observaciones         VARCHAR(800) NOT NULL,
    bit_recomendaciones       VARCHAR(800),
    bit_requiere_seguimiento  BOOLEAN NOT NULL DEFAULT FALSE,
    bit_state                 BOOLEAN NOT NULL DEFAULT TRUE,
    bit_created_by            VARCHAR(50),
    bit_created_date          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TUT-R08: Seguimiento de casos académicos
CREATE TABLE IF NOT EXISTS dawa.tb_seguimiento (
    seg_id              SERIAL PRIMARY KEY,
    seg_tutoria_id      INTEGER NOT NULL REFERENCES dawa.tb_tutoria (tut_id),
    seg_estudiante_id   INTEGER NOT NULL REFERENCES dawa.tb_estudiante (est_id),
    seg_motivo          VARCHAR(300) NOT NULL,
    seg_acciones        VARCHAR(800),
    seg_estado          VARCHAR(20) NOT NULL DEFAULT 'ABIERTO'
                        CHECK (seg_estado IN ('ABIERTO','EN_PROCESO','CERRADO')),
    seg_state           BOOLEAN NOT NULL DEFAULT TRUE,
    seg_created_by      VARCHAR(50),
    seg_created_date    TIMESTAMP NOT NULL DEFAULT NOW(),
    seg_modified_by     VARCHAR(50),
    seg_modified_date   TIMESTAMP
);

-- TUT-R12: Notificaciones internas del sistema
CREATE TABLE IF NOT EXISTS dawa.tb_notificacion (
    not_id              SERIAL PRIMARY KEY,
    not_user_id         INTEGER NOT NULL REFERENCES dawa.tb_user (usr_id),
    not_titulo          VARCHAR(150) NOT NULL,
    not_mensaje         VARCHAR(500) NOT NULL,
    not_leida           BOOLEAN NOT NULL DEFAULT FALSE,
    not_state           BOOLEAN NOT NULL DEFAULT TRUE,
    not_fecha           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Parámetros del sistema (regla de negocio: tiempo límite de cancelación)
CREATE TABLE IF NOT EXISTS dawa.tb_parametro (
    prm_id              SERIAL PRIMARY KEY,
    prm_codigo          VARCHAR(50) NOT NULL UNIQUE,
    prm_valor           VARCHAR(100) NOT NULL,
    prm_descripcion     VARCHAR(300)
);

-- Índices de apoyo
CREATE INDEX IF NOT EXISTS idx_tutoria_docente   ON dawa.tb_tutoria (tut_docente_id, tut_fecha);
CREATE INDEX IF NOT EXISTS idx_tutoria_estudiante ON dawa.tb_tutoria (tut_estudiante_id);
CREATE INDEX IF NOT EXISTS idx_horario_docente   ON dawa.tb_horario (hor_docente_id, hor_dia_semana);
CREATE INDEX IF NOT EXISTS idx_notificacion_user ON dawa.tb_notificacion (not_user_id, not_leida);


-- ============================================================================
-- PROYECTO FINAL DAWA - Sistema Web Inteligente de Gestión de Tutorías
-- Script 02: Datos iniciales (seeders)
-- ============================================================================

-- Roles del sistema
INSERT INTO dawa.tb_rol (rol_name, rol_description, rol_created_by) VALUES
('ADMINISTRADOR', 'Administrador general del sistema', 'system'),
('COORDINADOR',   'Coordinador académico',             'system'),
('DOCENTE',       'Docente tutor',                     'system'),
('ESTUDIANTE',    'Estudiante solicitante de tutorías','system');

-- Permisos por módulo
INSERT INTO dawa.tb_permiso (per_name, per_description, per_modulo, per_created_by) VALUES
('GESTION_USUARIOS',   'Crear, editar y eliminar usuarios',          'SEGURIDAD',  'system'),
('GESTION_ROLES',      'Crear, editar y eliminar roles',             'SEGURIDAD',  'system'),
('AUDITORIA_ACCESOS',  'Consultar auditoría de accesos',             'SEGURIDAD',  'system'),
('GESTION_ACADEMICA',  'Administrar facultades, carreras y materias','ACADEMICO',  'system'),
('GESTION_PERIODOS',   'Administrar periodos académicos',            'ACADEMICO',  'system'),
('GESTION_HORARIOS',   'Parametrizar horarios de atención',          'ACADEMICO',  'system'),
('DASHBOARD_ADMIN',    'Visualizar dashboard administrativo',        'ACADEMICO',  'system'),
('SOLICITAR_TUTORIA',  'Registrar solicitudes de tutoría',           'TUTORIAS',   'system'),
('ATENDER_TUTORIA',    'Confirmar, atender y registrar bitácora',    'TUTORIAS',   'system'),
('REPORTES_TUTORIA',   'Consultar reportes de tutorías',             'TUTORIAS',   'system');

-- Asignación de permisos a roles
INSERT INTO dawa.tb_rol_permiso (rpe_rol_id, rpe_permiso_id, rpe_created_by)
SELECT r.rol_id, p.per_id, 'system' FROM dawa.tb_rol r, dawa.tb_permiso p
WHERE r.rol_name = 'ADMINISTRADOR';

INSERT INTO dawa.tb_rol_permiso (rpe_rol_id, rpe_permiso_id, rpe_created_by)
SELECT r.rol_id, p.per_id, 'system' FROM dawa.tb_rol r, dawa.tb_permiso p
WHERE r.rol_name = 'COORDINADOR'
  AND p.per_name IN ('GESTION_ACADEMICA','GESTION_PERIODOS','GESTION_HORARIOS','DASHBOARD_ADMIN','REPORTES_TUTORIA');

INSERT INTO dawa.tb_rol_permiso (rpe_rol_id, rpe_permiso_id, rpe_created_by)
SELECT r.rol_id, p.per_id, 'system' FROM dawa.tb_rol r, dawa.tb_permiso p
WHERE r.rol_name = 'DOCENTE'
  AND p.per_name IN ('ATENDER_TUTORIA','REPORTES_TUTORIA');

INSERT INTO dawa.tb_rol_permiso (rpe_rol_id, rpe_permiso_id, rpe_created_by)
SELECT r.rol_id, p.per_id, 'system' FROM dawa.tb_rol r, dawa.tb_permiso p
WHERE r.rol_name = 'ESTUDIANTE'
  AND p.per_name IN ('SOLICITAR_TUTORIA');

-- Usuarios de prueba (login: usuario / clave en texto plano según patrón de la materia)
INSERT INTO dawa.tb_user (usr_login, usr_password, usr_name, usr_mail, usr_created_by) VALUES
('admin',      'admin123',  'Administrador del Sistema', 'admin@ug.edu.ec',           'system'),
('coordinador','coord123',  'María Coordinadora Pérez',  'coordinador@ug.edu.ec',     'system'),
('jcedeno',    'docente123','Juan Carlos Cedeño',        'juan.cedenor@ug.edu.ec',    'system'),
('lmorales',   'docente123','Lucía Morales Andrade',     'lucia.morales@ug.edu.ec',   'system'),
('aespinoza',  'est123',    'Andrés Espinoza Vera',      'andres.espinoza@ug.edu.ec', 'system'),
('mzambrano',  'est123',    'María Zambrano Loor',       'maria.zambrano@ug.edu.ec',  'system');

-- Asignación de roles
INSERT INTO dawa.tb_user_rol (uro_user_id, uro_rol_id, uro_created_by)
SELECT u.usr_id, r.rol_id, 'system' FROM dawa.tb_user u, dawa.tb_rol r
WHERE (u.usr_login = 'admin'       AND r.rol_name = 'ADMINISTRADOR')
   OR (u.usr_login = 'coordinador' AND r.rol_name = 'COORDINADOR')
   OR (u.usr_login = 'jcedeno'     AND r.rol_name = 'DOCENTE')
   OR (u.usr_login = 'lmorales'    AND r.rol_name = 'DOCENTE')
   OR (u.usr_login = 'aespinoza'   AND r.rol_name = 'ESTUDIANTE')
   OR (u.usr_login = 'mzambrano'   AND r.rol_name = 'ESTUDIANTE');

-- Estructura académica
INSERT INTO dawa.tb_facultad (fac_name, fac_description, fac_created_by) VALUES
('Ciencias Matemáticas y Físicas', 'Facultad de Ciencias Matemáticas y Físicas', 'system'),
('Ciencias Administrativas',       'Facultad de Ciencias Administrativas',       'system');

INSERT INTO dawa.tb_carrera (car_name, car_description, car_facultad_id, car_created_by) VALUES
('Ingeniería en Software',  'Carrera de Ingeniería en Software',  1, 'system'),
('Ingeniería en Sistemas',  'Carrera de Ingeniería en Sistemas',  1, 'system'),
('Ingeniería Comercial',    'Carrera de Ingeniería Comercial',    2, 'system');

INSERT INTO dawa.tb_asignatura (asi_codigo, asi_name, asi_nivel, asi_carrera_id, asi_created_by) VALUES
('ISWD-501', 'Desarrollo de Aplicaciones Web Avanzada', 5, 1, 'system'),
('ISWD-502', 'Base de Datos Avanzadas',                 5, 1, 'system'),
('ISWD-401', 'Programación Orientada a Objetos',        4, 1, 'system'),
('ISIS-301', 'Estructuras de Datos',                    3, 2, 'system'),
('ICOM-201', 'Matemática Financiera',                   2, 3, 'system');

INSERT INTO dawa.tb_periodo (prd_name, prd_fecha_inicio, prd_fecha_fin, prd_activo, prd_created_by) VALUES
('2025-2026 CII', '2025-11-01', '2026-03-31', FALSE, 'system'),
('2026-2027 CI',  '2026-05-01', '2026-09-30', TRUE,  'system');

-- Docentes (vinculados a sus usuarios)
INSERT INTO dawa.tb_docente (doc_cedula, doc_nombres, doc_apellidos, doc_correo, doc_telefono, doc_user_id, doc_created_by)
SELECT '0912345678', 'Juan Carlos', 'Cedeño', 'juan.cedenor@ug.edu.ec', '0991234567', u.usr_id, 'system'
FROM dawa.tb_user u WHERE u.usr_login = 'jcedeno';

INSERT INTO dawa.tb_docente (doc_cedula, doc_nombres, doc_apellidos, doc_correo, doc_telefono, doc_user_id, doc_created_by)
SELECT '0923456789', 'Lucía', 'Morales Andrade', 'lucia.morales@ug.edu.ec', '0997654321', u.usr_id, 'system'
FROM dawa.tb_user u WHERE u.usr_login = 'lmorales';

-- Estudiantes (vinculados a sus usuarios)
INSERT INTO dawa.tb_estudiante (est_cedula, est_nombres, est_apellidos, est_correo, est_telefono, est_nivel, est_carrera_id, est_user_id, est_created_by)
SELECT '0934567890', 'Andrés', 'Espinoza Vera', 'andres.espinoza@ug.edu.ec', '0987112233', 5, 1, u.usr_id, 'system'
FROM dawa.tb_user u WHERE u.usr_login = 'aespinoza';

INSERT INTO dawa.tb_estudiante (est_cedula, est_nombres, est_apellidos, est_correo, est_telefono, est_nivel, est_carrera_id, est_user_id, est_created_by)
SELECT '0945678901', 'María', 'Zambrano Loor', 'maria.zambrano@ug.edu.ec', '0986223344', 5, 1, u.usr_id, 'system'
FROM dawa.tb_user u WHERE u.usr_login = 'mzambrano';

-- Paralelos
INSERT INTO dawa.tb_paralelo (par_name, par_asignatura_id, par_periodo_id, par_docente_id, par_created_by) VALUES
('SOF-S-MA-5-1', 1, 2, 1, 'system'),
('SOF-S-MA-5-2', 2, 2, 2, 'system'),
('SOF-S-MA-4-1', 3, 2, 1, 'system');

-- Horarios de atención de tutorías (1=Lunes ... 7=Domingo)
INSERT INTO dawa.tb_horario (hor_docente_id, hor_periodo_id, hor_dia_semana, hor_hora_inicio, hor_hora_fin, hor_modalidad, hor_created_by) VALUES
(1, 2, 1, '10:00', '12:00', 'PRESENCIAL', 'system'),
(1, 2, 3, '15:00', '17:00', 'VIRTUAL',    'system'),
(1, 2, 5, '09:00', '11:00', 'PRESENCIAL', 'system'),
(2, 2, 2, '08:00', '10:00', 'PRESENCIAL', 'system'),
(2, 2, 4, '14:00', '16:00', 'VIRTUAL',    'system');

-- Parámetros del sistema (regla de negocio: horas mínimas para cancelar)
INSERT INTO dawa.tb_parametro (prm_codigo, prm_valor, prm_descripcion) VALUES
('HORAS_LIMITE_CANCELACION', '2', 'Horas mínimas de anticipación para cancelar una tutoría');

-- Tutorías de ejemplo
INSERT INTO dawa.tb_tutoria (tut_estudiante_id, tut_docente_id, tut_asignatura_id, tut_tema, tut_descripcion, tut_fecha, tut_hora_inicio, tut_hora_fin, tut_modalidad, tut_estado, tut_created_by) VALUES
(1, 1, 1, 'Microservicios con Flask',  'Dudas sobre la arquitectura de microservicios del proyecto final', '2026-06-15', '10:00', '11:00', 'PRESENCIAL', 'CONFIRMADA', 'aespinoza'),
(2, 1, 2, 'Normalización de tablas',   'Repaso de tercera forma normal para el examen',                    '2026-06-17', '15:00', '16:00', 'VIRTUAL',    'PENDIENTE',  'mzambrano'),
(1, NULL, 3, 'Herencia y polimorfismo','Necesito reforzar conceptos de POO',                               '2026-06-19', '09:00', '10:00', 'PRESENCIAL', 'SOLICITADA', 'aespinoza');

