from fastapi import APIRouter, Response, Depends, HTTPException
from schema.user_schema import UserSchema, UserUpdateSchema
from config.db import SessionLocal
from model.models import Usuario
from werkzeug.security import generate_password_hash, check_password_hash
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND
from sqlalchemy.orm import Session
from typing import List

user= APIRouter(prefix="/user",
                tags=["user"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@user.get("/", response_model= List[UserSchema])
async def read_users(db: Session =Depends(get_db)):
    users = db.query(Usuario).all()
    return users #{"users": users}

@user.get("/{user_id}")
async def read_user(user_id: int, db: Session =Depends(get_db)):
    user = db.get(Usuario,user_id)
    return user

@user.post("/", response_model= UserSchema, status_code=HTTP_201_CREATED)
async def create_user(data_user: UserSchema, db: Session =Depends(get_db)):
    new_user= data_user.dict()
    #new_user["Password"]= generate_password_hash(data_user.Password)
    user = Usuario(**new_user)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@user.put("/{id}", response_model= UserSchema, status_code= HTTP_200_OK)
async def update_user(id: int, new_data_user: UserUpdateSchema, db: Session =Depends(get_db)):
    user = db.get(Usuario, id)
    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    if new_data_user.Password != None:
        user.Password= new_data_user.Password
    if new_data_user.Estado != None:
        user.Estado= new_data_user.Estado
    db.commit()
    db.refresh(user)
    return user

@user.delete("/{id}", status_code= HTTP_200_OK)
async def delete_user(id: int, db: Session =Depends(get_db)):
    user= db.get(Usuario, id)
    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    db.delete(user)
    db.commit()
    return {"Mensaje":"Usuario con eliminado correctamente"}