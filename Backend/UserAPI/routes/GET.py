from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import User

import dal.mongodb as mongo

router = APIRouter(
    prefix="/search",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/get")
async def testEndpoint():
    return "Endpoint Reached!"

@router.get("/")
async def getAllUsers():
    return mongo.FetchUsers()

@router.get("/byid/{UID}")
async def getUserbyID(UID: str = Path(alias="UID")):
    return mongo.FetchUser_ByID(UID)