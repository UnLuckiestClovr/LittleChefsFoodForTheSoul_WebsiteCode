from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import NewRecipe

import dal.mongodb as mongo

router = APIRouter(
    prefix="/post",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.post("/")
async def createRecipe(body: NewRecipe = None):
    return mongo.createRecipe(body)