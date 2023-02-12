from fastapi import APIRouter, Depends, HTTPException, Response, status
#from routers.user import search_user
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from model.models import UsuarioDB
from schema.user_schema import UserSchema
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from config.db import get_db

ALGORITHM= "HS256"
ACCESS_TOKEN_DURATION=10
SECRET_KEY="b1e1ba119ad7a9b540c3f39368f62bf8615f933f3115777fd75daf863832b039"


authentication= APIRouter(prefix="/login", tags=["login"])

oauth2= OAuth2PasswordBearer(tokenUrl="login")

crypt= CryptContext(schemes=["bcrypt"])


async def search_user(usuario: str, db: Session =Depends(get_db)):    
    user = db.query(UsuarioDB).filter(UsuarioDB.Usuario == usuario).first()
    if user:
        return user
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")


async def auth_user(token: str = Depends(oauth2), db: Session =Depends(get_db)):
    exception= HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Credenciales de autentificación inválidas",
                            headers={"WWW-Authenticate":"Bearer"})
                                    
    try:
        user_name=jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM).get("sub")
    except JWTError:
        raise exception

    user= await search_user(user_name, db)
    if not user:
        raise exception
    
    return user

async def current_user(user: UserSchema= Depends(auth_user)): 
    if user.Estado==0:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail=f"Usuario no autorizado", 
            headers={"WWW-Authenticate":"Bearer"})
    return user

@authentication.post("/")
async def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_db: UsuarioDB= await search_user(form.username, db)
    if not crypt.verify(form.password, user_db.Password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    access_token= { "sub":user_db.Usuario,
                    "exp": datetime.utcnow() + timedelta(minutes= ACCESS_TOKEN_DURATION) }

    return{"access_token": jwt.encode(access_token, SECRET_KEY, algorithm=ALGORITHM) , "token_type":"bearer"}

@authentication.get("/me", response_model= UserSchema)
async def me(user:UserSchema = Depends(current_user)):
    return user