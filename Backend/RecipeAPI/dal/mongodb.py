import pymongo, json, uuid

from pymongo import ReturnDocument

from models.apimodels import NewRecipe, Recipe

MongoHost = "localhost"
MongoPort = 15004

MongoClient = pymongo.MongoClient(f"mongodb://{MongoHost}:{MongoPort}/") # Test Connection, Change to Containerized Naming Conventions during Uploading

objDatabase = MongoClient["LittleChefsRecipes"]

# ----------------------------------------------

def createRecipe(newRecipe: NewRecipe):
    try:
        recipe = Recipe(
            RID= uuid.uuid4(),
            RecipeName=newRecipe.RecipeName,
            Description=newRecipe.Description,
            Ingredients=newRecipe.Ingredients,
            Images=newRecipe.Images
        )

        recipeColl = objDatabase["Recipes"]
        recipeColl.insert_one(json.loads(recipe.json()))
        return {
            "success" : ","
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Creation Failed"
        }

def getRecipe(RID: str):
    try:
        recipeColl = objDatabase["Recipes"]
        result = recipeColl.find_one({"RID" : RID})
        return {
            "success" : True,
            "Recipe" : result
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Fetch for Recipe {RID} Failed"
        }

