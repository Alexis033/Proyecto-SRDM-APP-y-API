from pydantic import BaseModel

class UserSchema(BaseModel):
    id: int | None= None
    Usuario:str
    Password:str ="123456789"
    id_rol:int | None =2
    Estado:int | None =1

    class Config:
        orm_mode = True

class UserUpdateSchema(BaseModel):
    Password:str | None
    Estado:int | None 

    class Config:
        orm_mode = True