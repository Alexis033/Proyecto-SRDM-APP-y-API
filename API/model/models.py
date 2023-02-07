from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import engine, meta_data

# ``users= Table("usuario", meta_data,
#             Column("id", Integer, primary_key=True, nullable=False, unique= True),
#             Column("usuario", String(50), nullable=False),
#             Column("contrasena", String(50), nullable=False),
#             Column("id_rol", Integer, nullable=True, default=2),
#             Column("estado", Integer, nullable=True, default=None))``
#meta_data.create_all(engine)

meta_data.reflect(bind=engine)
#usuario = Table("usuario", meta_data, autoload_with=engine)

usuario= meta_data.tables["usuario"]
estudiante= meta_data.tables["estudiante"]
rol= meta_data.tables["rol"]
curso=meta_data.tables["curso"]