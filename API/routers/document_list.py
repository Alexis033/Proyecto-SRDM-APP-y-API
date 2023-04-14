from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config.db import get_db
from model.models import ListaDocumentosDB
from schema.user_schema import UserSchema
from schema.document_list_schema import ListaDocumentosDBSchema

from routers.authentication_users import current_user

document_list= APIRouter(prefix="/documentList",
                tags=["document List"])

@document_list.get('/')
async def get_list_documents( user: UserSchema= Depends(current_user), db: Session =Depends(get_db)):
    list_documents= db.query(ListaDocumentosDB).all()
    return list_documents