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

    class Config:
        orm_mode = True