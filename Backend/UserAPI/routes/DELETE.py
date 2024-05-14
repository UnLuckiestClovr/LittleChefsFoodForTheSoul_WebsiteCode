from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import User

import dal.mongodb as mongo

router = APIRouter(
    prefix="/delete",
    tags=["users"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.delete("/{UID}")
async def deleteUserByID(UID: str = Path(alias="UID")):
    return mongo.DeleteUser(UID)