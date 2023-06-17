from pydantic import BaseModel
from typing import Optional


class StudentDBSchema(BaseModel):
    id: Optional[int]
    id_curso: int
    correo: str
    nombres: str
    apellidos: str
    documento_identidad: int
    edad: int
    telefono: Optional[str]
    estado: Optional[str]

    class Config:
        orm_mode = True


class StudentUpdatechema(BaseModel):
    id_curso: Optional[int]
    correo: Optional[str]
    nombres: Optional[str]
    apellidos: Optional[str]
    documento_identidad: Optional[int]
    edad: Optional[int]
    telefono: Optional[str]
    estado: Optional[str]

    class Config:
        orm_mode = True
