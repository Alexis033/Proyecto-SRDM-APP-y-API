from fastapi import APIRouter, Depends, HTTPException, Response, status
from config.db import SessionLocal
from routers.user import search_user, get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from model.models import UsuarioDB
from schema.user_schema import User



authentication= APIRouter(prefix="/login",
                tags=["login"])

oauth2= OAuth2PasswordBearer(tokenUrl="login")

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

async def current_user(token: str= Depends(oauth2), db: Session = Depends(get_db)):
    user= await search_user(token, db)
    if user.Estado==0:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail=f"Usuario no autorizado", 
            headers={"WWW-Authenticate":"Bearrer"})
    return user

@authentication.post("/")
async def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_db: UsuarioDB|None=await search_user(form.username, db)
    if not form.password == user_db.Password:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Datos incorrectos")
    return{"access_token": user_db.Usuario , "token_type":"Bearer"}

@authentication.get("/me", response_model=User)
async def me(usuario:User = Depends(current_user)):
    return usuario