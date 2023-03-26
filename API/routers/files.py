from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from schema.user_schema import UserSchema
import os
from shutil import rmtree
from routers.authentication_users import current_user


files= APIRouter(prefix="/files",
                tags=["files"])

@files.post("/{studentId}")
async def upload_file(studentId:str, filename:str, user: UserSchema= Depends(current_user), file: UploadFile= File(...)):
    upload_folder = os.path.join("files", studentId)
    os.makedirs(upload_folder, exist_ok=True)
    file_location = os.path.join(upload_folder, filename)
    with open(file_location, "wb") as myfile:
        content = await file.read()
        myfile.write(content)
        myfile.close()
    return {"message": "File uploaded successfully",
            "file_location": file_location}

@files.get("/{path}")
def get_file (path: str, user: UserSchema= Depends(current_user)):
    return FileResponse(path)

@files.get("/download/{path}")
def download_file (path: str, user: UserSchema= Depends(current_user)):
    file_name= path.split("\\")[-1]
    return FileResponse(path, media_type="application/octet-stream", filename= file_name)

@files.delete("/delete/{path}")
def delete_file (path:str, user: UserSchema= Depends(current_user)):
    try:
        os.remove(path)
        return JSONResponse(content={
            "removed": True
            })
    except FileNotFoundError:
        return JSONResponse(content={
            "removed": False,
             "message": "File not found" },
             status_code= 404)
    
@files.delete("/folder/{studentId}")
def delete_folder (studentId:str, user: UserSchema= Depends(current_user)):
    folder_path = os.path.join("files", studentId)
    try:
        rmtree(folder_path)
        return JSONResponse(content={
            "removed": True
            })
    except FileNotFoundError:
        return JSONResponse(content={
            "removed": False,
             "message": "Folder not found" },
             status_code= 404)