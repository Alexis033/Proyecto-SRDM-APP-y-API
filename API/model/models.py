from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuario"
    id = Column("id", Integer, primary_key=True, nullable=False, unique= True, autoincrement=True, index=True)
    Usuario = Column("Usuario", String(50), nullable=False, unique=True, index=True)
    Password = Column("Password", String(50), nullable=False)
    id_rol = Column("id_rol", Integer, nullable=True, default=2)
    Estado = Column("Estado", Integer, nullable=True, default=1)

#meta_data.reflect(bind=engine, extend_existing=True)
# usuario= meta_data.tables["usuario"]
# estudiante= meta_data.tables["estudiante"]
# rol= meta_data.tables["rol"]
# curso=meta_data.tables["curso"]
# documento=meta_data.tables["documento"]
# lista_documentos=meta_data.tables["lista_documentos"]
# matricula=meta_data.tables["matrícula"]