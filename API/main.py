from fastapi import Depends, FastAPI, status
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from routers import user, authentication_users
from config.db import get_db
from schema.user_schema import User

app= FastAPI()
app.mount("/static", StaticFiles(directory="./public/static"), name="static")

#Routers
app.include_router(user.user)
app.include_router(authentication_users.authentication)


@app.get("/", response_class= HTMLResponse)
def root():
    html_address= "./public/static/html/login.html"
    return FileResponse(html_address)

@app.get("/menu", response_class= HTMLResponse)
def menu(user: User= Depends(authentication_users.auth_user)):
    if not user:
        raise HTMLResponse(status_code= status.HTTP_401_UNAUTHORIZED,
            detail=f"Usuario no autorizado", 
            headers={"WWW-Authenticate":"Bearrer"})
            
    html_address= "./public/static/html/menu.html"
    return FileResponse(html_address)

    #iniciar entorno virtual en windows: venv\Scripts\activate  
    #iniciar servidor local: uvicorn main:app --reload