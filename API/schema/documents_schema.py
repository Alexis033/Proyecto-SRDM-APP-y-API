from pydantic import BaseModel, conint
from typing import Optional


class DocumentsDBSchema(BaseModel):
    id: Optional[int]
    id_estudiante: int
    id_lista_documentos: int
    estado: conint(ge=0, le=2) = 1
    url_documento: str

    class Config:
        orm_mode = True


class UpdateDocumentsDBSchema(BaseModel):
    id_estudiante: int
    id_lista_documentos: int
    estado: conint(ge=0, le=2) = 0
    url_documento: Optional[str]

    class Config:
        orm_mode = True


class DeleteDocumentsDBSchema(BaseModel):
    id_estudiante: int
    id_lista_documentos: int

    class Config:
        orm_mode = True
