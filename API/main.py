from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from routers import user, authentication_users
from config.db import SessionLocal

app= FastAPI()
app.mount("/static", StaticFiles(directory="./public/static"), name="static")

#Routers
app.include_router(user.user)
app.include_router(authentication_users.authentication)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", response_class= HTMLResponse)
def root():
    html_address= "./public/static/html/login.html"
    return FileResponse(html_address)