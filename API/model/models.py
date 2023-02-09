from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class UsuarioDB(Base):
    __tablename__ = "usuario"
    id = Column("id", Integer, primary_key=True, nullable=False, unique= True, autoincrement=True, index=True)
    Usuario = Column("Usuario", String(50), nullable=False, unique=True, index=True)
    Password = Column("Password", String(50), nullable=False)
    id_rol = Column("id_rol", Integer, default=2)
    Estado = Column("Estado", Integer, nullable=True, default=1)
    created_at=Column(DateTime(), default= datetime.now())
    

#codigo para crear las tablas en la base de datos
#if not engine.dialect.has_table(engine, "UsuarioDB"):
#   Base.metadata.create_all(bind=engine)