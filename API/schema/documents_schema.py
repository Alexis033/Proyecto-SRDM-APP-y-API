from pydantic import BaseModel, constr

class DocumentsDBSchema(BaseModel):
    id: int | None
    id_estudiante: int
    id_lista_documentos: int
    estado: constr(regex=r'^[0-2]$') | None =1
    url_documento: str
    class Config:
        orm_mode = True


class DeleteDocumentsDBSchema(BaseModel):
    id_estudiante: int
    id_lista_documentos: int
    class Config:
        orm_mode = True