from fastapi import APIRouter
from schema.user_schema import UserSchema 

user= APIRouter()

@user.get("/user")
def get_user():
    pass

@user.post("/user")
def create_user(data_user: UserSchema):
    return data_user

@user.put("/user")
def update_user(data_user: UserSchema):
    return data_user