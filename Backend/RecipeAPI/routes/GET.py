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

@router.get("/{RID}")
async def getRecipeByRID(RID: str = Path(..., alias='RID')):
    return mongo.getRecipeByID(RID)

@router.get("/searchingredient/{ingredient}")
async def getRecipeByIngredient(ingredient: str = Path(..., alias='ingredient')):
    return mongo.getRecipeByIngredient(ingredient)