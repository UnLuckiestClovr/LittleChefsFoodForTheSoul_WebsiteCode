from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import Item, User, NewUser, LoginAttempt

import dal.mongodb as mongo

router = APIRouter(
    prefix="/search",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/")
async def testEndpoint():
    return "Endpoint Reached!"

@router.get("/id/{RID}")
async def getRecipeByRID(RID: str = Path(..., alias='RID')):
    return mongo.getRecipeByID(RID)

@router.get("/ingredient/{ingredient}")
async def getRecipeByIngredient(ingredient: str = Path(..., alias='ingredient')):
    return mongo.getRecipeByIngredient(ingredient)

@router.get("/category/{category}")
async def getRecipeByIngredient(category: str = Path(..., alias='category')):
    return mongo.getRecipeByCategory(category)