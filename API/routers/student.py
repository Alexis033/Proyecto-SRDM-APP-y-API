from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from config.db import get_db
from model.models import EstudianteDB
from schema.student_schema import StudentDBSchema, StudentUpdatechema
from schema.user_schema import UserSchema


from routers.authentication_users import current_user

student = APIRouter(prefix="/student",
                    tags=["students"])


async def search_student(correo: str, db: Session = Depends(get_db)):
    student = db.query(EstudianteDB).filter(
        EstudianteDB.correo == correo).first()
    if student:
        return student
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Estudiante no encontrado")


@student.get("/", response_model=List[StudentDBSchema])
async def read_students(user: UserSchema = Depends(current_user), db: Session = Depends(get_db)):
    if user.id_rol != 1:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    students = db.query(EstudianteDB).all()
    return students


@student.get("/{correo}", response_model=StudentDBSchema)
async def get_student(correo: str, user: UserSchema = Depends(current_user), db: Session = Depends(get_db)):
    if user.id_rol != 1:
        correo = user.usuario
    return await search_student(correo, db)


@student.post("/", response_model=StudentDBSchema, status_code=status.HTTP_201_CREATED)
async def create_student(data_student: StudentDBSchema, db: Session = Depends(get_db), user: UserSchema = Depends(current_user)):
    if user.id_rol != 1:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")
    new_student = data_student.dict()
    student_verification = db.query(EstudianteDB).filter(
        EstudianteDB.correo == new_student["correo"]).first()
    if student_verification:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="El estudiante ya existe")
    student_db = EstudianteDB(**new_student)
    db.add(student_db)
    db.commit()
    db.refresh(student_db)
    return student_db


@student.put("/update/{correo}", response_model=StudentDBSchema)
async def update_student(correo: str, new_data_student: StudentUpdatechema, db: Session = Depends(get_db), user: UserSchema = Depends(current_user)):
    if user.id_rol != 1:
        correo = user.usuario
    student_db = await search_student(correo, db)
    for key, value in vars(new_data_student).items():
        if value != None:
            setattr(student_db, key, value)
    db.commit()
    db.refresh(student_db)
    return student_db


@student.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: int, db: Session = Depends(get_db), user: UserSchema = Depends(current_user)):
    if user.id_rol != 1:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no autorizado")

    student_db = db.get(EstudianteDB, id)
    if not student_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Estudiante no encontrado")
    db.delete(student_db)
    db.commit()
