from fastapi import APIRouter
from schema.user_schema import UserSchema 

user= APIRouter(prefix="/user",
                tags=["user"])

@user.get("/")
def get_user():
    pass

@user.post("/")
def create_user(data_user: UserSchema):
    return data_user

@user.put("/")
def update_user(data_user: UserSchema):
    return data_user