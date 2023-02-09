from fastapi import APIRouter, Response, Depends, HTTPException, status
from schema.user_schema import UserSchema, UserUpdateSchema, User
from config.db import SessionLocal
from model.models import UsuarioDB
from werkzeug.security import generate_password_hash, check_password_hash
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
    users = db.query(UsuarioDB).all()
    return users 

#@user.get("/{id}", response_model= UserSchema)
#async def read_user(id: int, db: Session =Depends(get_db)):
#    user = db.get(UsuarioDB,id)
    #user= db.query(UsuarioDB).filter(UsuarioDB.Usuario==user_id).first()
#    if user:
#        return user
#    else:
#        return {"message": "Record not found"}

@user.get("/{usuario}", response_model=UserSchema)
async def search_user(usuario: str, db: Session =Depends(get_db)):    
    record = db.query(UsuarioDB).filter(UsuarioDB.Usuario == usuario).first()
    if record:
        return record
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

@user.post("/", response_model= UserSchema, status_code=status.HTTP_201_CREATED)
async def create_user(data_user: UserSchema, db: Session =Depends(get_db)):
    new_user= data_user.dict()
    #new_user["Password"]= generate_password_hash(data_user.Password)
    user = UsuarioDB(**new_user)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@user.put("/{id}", response_model= UserSchema, status_code= status.HTTP_200_OK)
async def update_user(id: int, new_data_user: UserUpdateSchema, db: Session =Depends(get_db)):
    user = db.get(UsuarioDB, id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    if new_data_user.Password != None:
        user.Password= new_data_user.Password
    if new_data_user.Estado != None:
        user.Estado= new_data_user.Estado
    db.commit()
    db.refresh(user)
    return user

@user.delete("/{id}", status_code= status.HTTP_200_OK)
async def delete_user(id: int, db: Session =Depends(get_db)):
    user= db.get(UsuarioDB, id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    db.delete(user)
    db.commit() 
    return {"Mensaje":f"Usuario con id:{id} eliminado correctamente"}