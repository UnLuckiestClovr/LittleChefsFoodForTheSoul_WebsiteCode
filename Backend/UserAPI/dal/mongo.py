import pymongo, json, uuid

from pymongo import ReturnDocument

from models.apimodels import NewRecipe, Recipe

MongoHost = "localhost"
MongoPort = 15004

MongoClient = pymongo.MongoClient(f"mongodb://{MongoHost}:{MongoPort}/") # Test Connection, Change to Containerized Naming Conventions during Uploading

objDatabase = MongoClient["LittleChefsUsers"]

# ----------------------------------------------