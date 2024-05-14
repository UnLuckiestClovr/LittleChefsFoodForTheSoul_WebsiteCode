from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import User

import dal.mongodb as mongo

router = APIRouter(
    prefix="/put",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.put("/updateuser")
async def UpdateUser(body: User):
    return mongo.UpdateUser(body)