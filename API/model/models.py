from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UsuarioDB(Base):
    __tablename__ = "usuario"
    id = Column("id", Integer, primary_key=True, nullable=False, unique= True, autoincrement=True, index=True)
    Usuario = Column("Usuario", String(50), nullable=False, unique=True, index=True)
    Password = Column("Password", String(50), nullable=False)
    id_rol = Column("id_rol", Integer, nullable=True, default=2)
    Estado = Column("Estado", Integer, nullable=True, default=1)


#codigo para crear las tablas en la base de datos
#Base.metadata.create_all(bind=engine)