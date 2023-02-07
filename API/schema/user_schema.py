from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    id:Optional[int]
    Usuario:str
    Contraseña: str
    id_rol:Optional[int]=2
    Estado:Optional[int]