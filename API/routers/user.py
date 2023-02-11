from fastapi import APIRouter, Depends, HTTPException, status
from schema.user_schema import UserSchema, UserUpdateSchema, User, MyPasswordUpdateSchema
from config.db import SessionLocal
from model.models import UsuarioDB
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import List
from routers.authentication_users import current_user, search_user

user= APIRouter(prefix="/user",
                tags=["user"])

crypt= CryptContext(schemes=["bcrypt"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@user.get("/", response_model= List[User])
async def read_users(user: User= Depends(current_user) ,db: Session =Depends(get_db)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    users = db.query(UsuarioDB).all()
    return users 


@user.get("/{usuario}", response_model=User)
async def get_user(usuario: str, db: Session =Depends(get_db), user: User= Depends(current_user)):    
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    return await search_user(usuario,db)

@user.post("/", response_model= User, status_code=status.HTTP_201_CREATED)
async def create_user(data_user: UserSchema, db: Session =Depends(get_db), user: User= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    new_user= data_user.dict()
    new_user["Password"]=crypt.hash(data_user.Password)
    user_db = UsuarioDB(**new_user)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

@user.put("/update/{id}", response_model= User, status_code= status.HTTP_200_OK)
async def update_user(id: int, new_data_user: UserUpdateSchema, db: Session =Depends(get_db), 
                    user: User= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    
    user_db = db.get(UsuarioDB, id)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    if new_data_user.Password != None:
        user_db.Password= crypt.hash(new_data_user.Password)
    if new_data_user.Estado != None:
        user_db.Estado= new_data_user.Estado
    db.commit()
    db.refresh(user_db)
    return user_db

@user.put("/password", response_model= User)
async def update_my_password(new_password: MyPasswordUpdateSchema, db: Session =Depends(get_db), 
                            user: User= Depends(current_user)):
    user_db=db.query(UsuarioDB).filter(UsuarioDB.Usuario==user.Usuario).first()
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    user_db.Password= crypt.hash(new_password.Password)
    db.commit()
    db.refresh(user_db)
    return user_db

@user.delete("/{id}", status_code= status.HTTP_200_OK)
async def delete_user(id: int, db: Session =Depends(get_db), user: User= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    
    user_db= db.get(UsuarioDB, id)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    db.delete(user_db)
    db.commit() 
    return {"Mensaje":f"Usuario con id:{id} eliminado correctamente"}