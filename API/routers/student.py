from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from config.db import get_db
from model.models import EstudianteDB
from schema.student_schema import StudentDBSchema
from schema.user_schema import UserSchema


from routers.authentication_users import current_user, search_user

student= APIRouter(prefix="/student",
                tags=["students"])

async def search_student(correo: str, db: Session =Depends(get_db)):    
    student = db.query(EstudianteDB).filter(EstudianteDB.correo == correo).first()
    if student:
        return student
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Estudiante no encontrado")


@student.get("/", response_model= List[StudentDBSchema])
async def read_students(user: UserSchema= Depends(current_user) ,db: Session =Depends(get_db)):
    if user.id_rol!=1:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    students= db.query(EstudianteDB).all()
    return students





