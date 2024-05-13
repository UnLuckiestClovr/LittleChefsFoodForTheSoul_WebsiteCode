from fastapi import APIRouter, Depends, HTTPException, Path

from dependencies import get_token_header
from models.apimodels import Recipe

import dal.mongodb as mongo

router = APIRouter(
    prefix="/search",
    tags=["recipess"],
    responses={404 : {"description": "Not Found"}}
)

@router.get("/get")
async def testEndpoint():
    return "Endpoint Reached!"
