from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from config.db import get_db
from model.models import DocumentoDB
from routers.student import search_student
from schema.user_schema import UserSchema
from schema.documents_schema import DeleteDocumentsDBSchema, DocumentsDBSchema


from routers.authentication_users import current_user

documents= APIRouter(prefix="/documents",
                tags=["documents"])

@documents.get("/{id_student}", response_model= List[DocumentsDBSchema])
async def read_documents_student(id_student:int, user: UserSchema= Depends(current_user), db: Session =Depends(get_db)):
    if user.id_rol!=1:
        student= await search_student(user.usuario,db)
        id_student= student.id
    documents_student= db.query(DocumentoDB).filter(DocumentoDB.id_estudiante==id_student).all()
    return documents_student

@documents.post("/", response_model= DocumentsDBSchema, status_code=status.HTTP_201_CREATED)
async def upload_document( 
        data_document: DocumentsDBSchema, 
        user: UserSchema= Depends(current_user), 
        db: Session =Depends(get_db)
    ):
    
    if user.id_rol!=1:
        student= await search_student(user.usuario,db)
        id_student= student.id
        data_document.id_estudiante= id_student
    
    new_document= data_document.dict()
    # document_verification= db.query(DocumentoDB).filter(
    #     DocumentoDB.id_estudiante == new_document["id_estudiante"],  
    #     DocumentoDB.id_lista_documentos == new_document["id_lista_documentos"]
    #     ).first()
    # if document_verification: 
    #     raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El documento ya existe")

    document_db = DocumentoDB(**new_document)
    db.add(document_db)
    db.commit()
    db.refresh(document_db)

    return document_db

@documents.put("/", response_model= DocumentsDBSchema)
async def update_document(
        new_data_document: DocumentsDBSchema, 
        user: UserSchema= Depends(current_user), 
        db: Session =Depends(get_db)):
    
    if user.id_rol!=1:
        student= await search_student(user.usuario,db)
        id_student= student.id
        new_data_document.id_estudiante= id_student

    document_db= db.query(DocumentoDB).filter(
        DocumentoDB.id_estudiante == new_data_document.id_estudiante,  
        DocumentoDB.id_lista_documentos == new_data_document.id_lista_documentos
        ).first()
    if not document_db: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Documento no encontrado")
    
    for key, value in vars(new_data_document).items():
        if value != None:
            setattr(document_db, key, value)
    db.commit()
    db.refresh(document_db)
    return document_db
    
@documents.delete("/", status_code= status.HTTP_204_NO_CONTENT)
async def delete_document(document_identificator: DeleteDocumentsDBSchema, db: Session =Depends(get_db), user: UserSchema= Depends(current_user)):
    if user.id_rol!=1:
        student= await search_student(user.usuario,db)
        id_student= student.id
        document_identificator.id_estudiante= id_student
    
    document_db= db.query(DocumentoDB).filter(
        DocumentoDB.id_estudiante == document_identificator.id_estudiante,  
        DocumentoDB.id_lista_documentos == document_identificator.id_lista_documentos
        ).first()
    if not document_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Documento no encontrado")
    db.delete(document_db)
    db.commit() 