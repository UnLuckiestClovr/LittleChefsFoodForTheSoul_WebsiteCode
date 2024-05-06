from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field

class NewUser(BaseModel):
    FullName: Optional[str] = Field()
    Email: str = Field()
    Username: str = Field()
    Password: str = Field()

class User(BaseModel):
    UID: str = Field()
    FullName: Optional[str] = Field()
    Email: str = Field()
    Username: str = Field()

class LoginAttempt(BaseModel):
    Username: str = Field()
    Password: str = Field()