from fastapi import APIRouter
from schema.user_schema import UserSchema
from config.db import conn
from model.models import usuario


user= APIRouter(prefix="/user",
                tags=["user"])

@user.get("/")
async def get_user():
    print([c.name for c in usuario.columns])

@user.post("/")
def create_user(data_user: UserSchema):
    new_user= data_user.dict()
    conn.execute(usuario.insert().values(new_user))
    return "success"

@user.put("/")
def update_user(data_user: UserSchema):
    print (data_user)