from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import Item, User, NewUser, LoginAttempt

import dal.mongodb as mongo

router = APIRouter(
    prefix="/",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.delete("/{RID}")
async def deleteRecipeByID(RID: str = Path(..., alias='RID')):
    return mongo.deleteRecipe(RID)