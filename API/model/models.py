from sqlalchemy import Column, String, Text, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from datetime import datetime
import pytz
from config.db import engine
from passlib.context import CryptContext
crypt = CryptContext(schemes=["bcrypt"])

Base = declarative_base()


class UsuarioDB(Base):
    __tablename__ = "usuario"
    id = Column("id", Integer, primary_key=True, nullable=False,
                unique=True, autoincrement=True, index=True)
    usuario = Column("usuario", String(
        50), nullable=False, unique=True, index=True)
    password = Column("password", String(100), nullable=False)
    id_rol = Column("id_rol", Integer, default=2)
    estado = Column("estado", Integer, nullable=True, default=1)
    created_at = Column(DateTime(), default=datetime.now(
        tz=(pytz.timezone("America/Bogota"))))

    @classmethod
    def insert_user(cls, username, password, rol):
        session = Session(bind=engine)
        try:
            hashed_password = crypt.hash(password)
            user = cls(usuario=username, password=hashed_password, id_rol=rol)
            session.add(user)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()


class CursoDB(Base):
    __tablename__ = "curso"
    id = Column("id", Integer, primary_key=True, nullable=False, unique=True)
    curso = Column("curso", String(45), nullable=False)


class EstudianteDB(Base):
    __tablename__ = "estudiante"
    id = Column("id", Integer, primary_key=True,
                nullable=False, unique=True, autoincrement=True)
    id_curso = Column("id_curso", Integer, nullable=False)
    correo = Column("correo", String(50), nullable=False, unique=True)
    nombres = Column("nombres", String(200), nullable=False)
    apellidos = Column("apellidos", String(200), nullable=False)
    documento_identidad = Column(
        "documento_identidad", Integer, nullable=False)
    edad = Column("edad", Integer)
    telefono = Column("telefono", String(11))
    estado = Column("estado", String(45), default='Pendiente')


class ListaDocumentosDB(Base):
    __tablename__ = "lista_documentos"
    id = Column("id", Integer, primary_key=True,
                nullable=False, unique=True, index=True)
    nombre_documento = Column("nombre_documento", String(50), nullable=False)


class DocumentoDB(Base):
    __tablename__ = "documento"
    id = Column("id", Integer, primary_key=True,
                nullable=False, unique=True, autoincrement=True)
    id_estudiante = Column("id_estudiante", Integer, nullable=False)
    id_lista_documentos = Column(
        "id_lista_documentos", Integer, nullable=False)
    estado = Column("estado", Integer, nullable=False, default=1)
    url_documento = Column("url_documento", Text, nullable=False)


class MatriculaDB(Base):
    __tablename__ = "matricula"
    id = Column("id", Integer, primary_key=True,
                nullable=False, unique=True, autoincrement=True)
    id_estudiante = Column("id_estudiante", Integer,
                           nullable=False, unique=True)
    informacion = Column("informacion", Text, nullable=False)
    fecha_vinculacion = Column("fecha_vinculacion", DateTime(
    ), default=datetime.now(tz=(pytz.timezone("America/Bogota"))))
    fecha_desvinculacion = Column("fecha_desvinculacion", DateTime())


# codigo para crear las tablas en la base de datos
#   Base.metadata.create_all(bind=engine)
#   UsuarioDB.insert_user("miusuario", "mipassword", "rol")

# codigo para eliminar Base.metadata.drop_all(bind=engine)
