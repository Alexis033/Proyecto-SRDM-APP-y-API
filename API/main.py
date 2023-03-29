from fastapi import FastAPI
from routers import documents, user, authentication_users, student, files, document_list
from fastapi.middleware.cors import CORSMiddleware 

app= FastAPI()
# app.mount("/static", StaticFiles(directory="./public/static"), name="static")

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://alexis033.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Routers
app.include_router(user.user)
app.include_router(authentication_users.authentication)
app.include_router(student.student)
app.include_router(documents.documents)
app.include_router(files.files)
app.include_router(document_list.document_list)


# @app.get("/", response_class= HTMLResponse)
# def root():
#     html_address= "./public/static/html/login.html"
#     return FileResponse(html_address)

# @app.get("/menu", response_class= HTMLResponse)
# def menu():            
#     html_address= "./public/static/html/menu.html"
#     return FileResponse(html_address)

    #iniciar entorno virtual en windows: venv\Scripts\activate  
    #iniciar servidor local: uvicorn main:app --reload