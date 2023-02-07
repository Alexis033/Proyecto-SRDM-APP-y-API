from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles


app= FastAPI()
app.mount("/static", StaticFiles(directory="./public/static"), name="static")

@app.get("/", response_class= HTMLResponse)
def root():
    html_address= "./public/static/html/login.html"
    return FileResponse(html_address)