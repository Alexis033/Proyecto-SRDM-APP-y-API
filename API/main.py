from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from routers import user

app= FastAPI()
app.mount("/static", StaticFiles(directory="./public/static"), name="static")

#Routers
app.include_router(user.user)

@app.get("/", response_class= HTMLResponse)
def root():
    html_address= "./public/static/html/login.html"
    return FileResponse(html_address)