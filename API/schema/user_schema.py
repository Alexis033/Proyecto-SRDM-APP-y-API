from pydantic import BaseModel, constr
from datetime import datetime

class UserDBSchema(BaseModel):
    id: int | None
    Usuario:constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    Password:str ="123456789"
    id_rol:int =2
    Estado:int | None =1
    created_at: datetime | None 

    class Config:
        orm_mode = True

class UserUpdateSchema(BaseModel):
    Usuario:constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$') | None
    Password:str | None
    Estado:int | None 

    class Config:
        orm_mode = True
        
class MyPasswordUpdateSchema(BaseModel):
    Password:str
    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id: int | None
    Usuario:str
    id_rol:int
    Estado:int | None
    created_at: datetime | None

    class Config:
        orm_mode = True