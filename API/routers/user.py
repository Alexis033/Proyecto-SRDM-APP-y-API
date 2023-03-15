from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import List
from config.db import get_db
from model.models import UsuarioDB
from schema.user_schema import UserDBSchema, UserUpdateSchema, UserSchema, MyPasswordUpdateSchema


from routers.authentication_users import current_user, search_user

user= APIRouter(prefix="/user",
                tags=["user"])

crypt= CryptContext(schemes=["bcrypt"])


@user.get("/", response_model= List[UserSchema])
async def read_users(user: UserSchema= Depends(current_user) ,db: Session =Depends(get_db)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    users = db.query(UsuarioDB).all()
    return users 


@user.get("/{usuario}", response_model=UserSchema)
async def get_user(usuario: str, db: Session =Depends(get_db), user: UserSchema= Depends(current_user)):    
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    return await search_user(usuario,db)

@user.post("/", response_model= UserSchema, status_code=status.HTTP_201_CREATED)
async def create_user(data_user: UserDBSchema, db: Session =Depends(get_db), user: UserSchema= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    new_user= data_user.dict()
    user_verification= db.query(UsuarioDB).filter(UsuarioDB.usuario==new_user["usuario"]).first()
    if user_verification:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Usuario ya existe")
    new_user["password"]=crypt.hash(data_user.password)
    user_db = UsuarioDB(**new_user)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

@user.put("/update/{id}", response_model= UserSchema, status_code= status.HTTP_200_OK)
async def update_user(id: int, new_data_user: UserUpdateSchema, db: Session =Depends(get_db), 
                    user: UserSchema= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    
    user_db = db.get(UsuarioDB, id)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    if new_data_user.usuario != None:
        user_db.usuario= new_data_user.usuario
    if new_data_user.password != None:
        user_db.password= crypt.hash(new_data_user.password)
    if new_data_user.estado != None:
        user_db.estado= new_data_user.estado
    db.commit()
    db.refresh(user_db)
    return user_db

@user.put("/password", response_model= UserSchema)
async def update_my_password(new_password: MyPasswordUpdateSchema, db: Session =Depends(get_db), 
                            user: UserSchema= Depends(current_user)):
    user_db=db.query(UsuarioDB).filter(UsuarioDB.usuario==user.usuario).first()
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    if new_password.password != None :
        user_db.password= crypt.hash(new_password.password)
    db.commit()
    db.refresh(user_db)
    return user_db

@user.delete("/{id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_user(id: int, db: Session =Depends(get_db), user: UserSchema= Depends(current_user)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    
    user_db= db.get(UsuarioDB, id)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    db.delete(user_db)
    db.commit() 
