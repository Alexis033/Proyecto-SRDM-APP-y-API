from pydantic import BaseModel

class StudentDBSchema(BaseModel):
    id: int | None
    id_curso: int
    correo : str
    nombres : str
    apellidos : str
    documento_identidad : int
    edad : int
    telefono : int | None
    estado: str | None

    class Config:
        orm_mode = True

class StudentUpdatechema(BaseModel):
    id_curso: int | None
    correo : str | None
    nombres : str | None
    apellidos : str | None
    documento_identidad : int | None
    edad : int | None
    telefono : int | None
    estado: str | None

    class Config:
        orm_mode = True