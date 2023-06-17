from pydantic import BaseModel, constr
from datetime import datetime
from typing import Optional


class UserDBSchema(BaseModel):
    id: Optional[int]
    usuario: constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    password: str = "123456789"
    id_rol: int = 2
    estado: Optional[int] = 1
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


class UserUpdateSchema(BaseModel):
    usuario: Optional[
        constr(regex=r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]
    password: Optional[str]
    estado: Optional[int]

    class Config:
        orm_mode = True


class MyPasswordUpdateSchema(BaseModel):
    password: str

    class Config:
        orm_mode = True


class UserSchema(BaseModel):
    id: Optional[int]
    usuario: str
    id_rol: int
    estado: Optional[int]
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
