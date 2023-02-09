from pydantic import BaseModel
from datetime import datetime

class UserSchema(BaseModel):
    id: int | None= None
    Usuario:str
    Password:str ="123456789"
    id_rol:int =2
    Estado:int | None =1
    created_at: datetime | None 

    class Config:
        orm_mode = True

class UserUpdateSchema(BaseModel):
    Password:str | None
    Estado:int | None 

    class Config:
        orm_mode = True

class User(BaseModel):
    id: int | None
    Usuario:str
    id_rol:int
    Estado:int | None
    created_at: datetime | None

    class Config:
        orm_mode = True