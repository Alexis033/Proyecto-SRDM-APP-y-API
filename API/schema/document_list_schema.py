from pydantic import BaseModel

class ListaDocumentosDBSchema(BaseModel):
    id = int
    nombre_documento = str
    class Config:
        orm_mode = True
