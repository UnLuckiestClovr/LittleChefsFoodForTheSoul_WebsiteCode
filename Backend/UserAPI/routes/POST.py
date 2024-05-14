from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import NewUser, LoginAttempt

import dal.mongodb as mongo

router = APIRouter(
    prefix="/post",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.post("/createuser")
async def CreateUser(body: NewUser):
    return mongo.CreateNewUser(body)

@router.post("/loginattempt")
async def LoginAttempt(body: LoginAttempt):
    return mongo.AttemptLogin(body)