from pydantic import BaseModel, constr
from datetime import datetime

class UserDBSchema(BaseModel):
    id: int | None
    usuario:constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    password:str ="123456789"
    id_rol:int =2
    estado:int | None =1
    created_at: datetime | None 

    class Config:
        orm_mode = True

class UserUpdateSchema(BaseModel):
    usuario:constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$') | None
    password:str | None
    estado:int | None 

    class Config:
        orm_mode = True
        
class MyPasswordUpdateSchema(BaseModel):
    password:str
    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id: int | None
    usuario:str
    id_rol:int
    estado:int | None
    created_at: datetime | None

    class Config:
        orm_mode = True