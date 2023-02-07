from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    id:Optional[int]
    usuario:str
    contrasena: str
    id_rol:Optional[int]=2
    estado:Optional[str]