from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field

class NewRecipe(BaseModel):
    RecipeName: str = Field()
    Description: str = Field()
    Categories: List[str] = Field()
    Ingredients: List[str] = Field()
    Image: str = Field()

class Recipe(BaseModel):
    RID: str = Field()
    RecipeName: str = Field()
    Description: str = Field()
    Categories: List[str] = Field()
    Ingredients: List[str] = Field()
    Image: str = Field()