from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import pytz

Base = declarative_base()

class UsuarioDB(Base):
    __tablename__ = "usuario"
    id = Column("id", Integer, primary_key=True, nullable=False, unique= True, autoincrement=True, index=True)
    Usuario = Column("Usuario", String(50), nullable=False, unique=True, index=True)
    Password = Column("Password", String(50), nullable=False)
    id_rol = Column("id_rol", Integer, default=2)
    Estado = Column("Estado", Integer, nullable=True, default=1)
    created_at=Column(DateTime(), default= datetime.now(tz=(pytz.timezone("America/Bogota"))))
    
class EstudianteDB(Base):
    __tablename__= "estudiante"
    id = Column("id", Integer, primary_key=True, nullable=False, unique= True, autoincrement=True, index=True)
    id_curso= Column("id_curso", Integer, nullable=False)
    correo = Column("correo", String, nullable=False, unique=True)
    nombres = Column("nombres", String, nullable=False)
    apellidos = Column("apellidos", String, nullable=False)
    documento_identidad = Column("documento_identidad", Integer, nullable=False)
    edad = Column("edad", Integer)
    telefono = Column("telefono", Integer)


#codigo para crear las tablas en la base de datos
#if not engine.dialect.has_table(engine, "UsuarioDB"):
#   Base.metadata.create_all(bind=engine)

#codigo para eliminar Base.metadata.drop_all(bind=engine)
