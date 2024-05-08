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
            Categories=newRecipe.Categories,
            Ingredients=newRecipe.Ingredients,
            Images=newRecipe.Images
        )

        recipeColl = objDatabase["Recipes"]
        recipeColl.insert_one(json.loads(recipe.json()))
        return {
            "success" : True,
            "Recipe": recipe.json()
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Creation Failed"
        }

def getRecipeByID(RID: str):
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

def getRecipeByIngredient(ingredient: str):
    try:
        recipeColl = objDatabase["Recipes"]
        results = recipeColl.find({"Ingredients" : {"$in" : [ingredient]}})
        return {
            "success" : True,
            "Recipes" : results
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Fetch for Recipe with {ingredient} Failed"
        }

def getRecipeByCategory(category: str):
    try:
        recipeColl = objDatabase["Recipes"]
        results = recipeColl.find({"Categories" : {"$in" : [category]}})
        return {
            "success" : True,
            "Recipes" : results
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Fetch for Recipe under {category} Failed"
        }

def deleteRecipe(RID: str):
    try:
        recipeColl = objDatabase["Recipes"]
        recipeColl.find_one_and_delete({"RID": RID})
        return {
            "success" : True,
            "message" : f"Recipe Deletion for Recipe {RID} Successful"
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Deletion for Recipe {RID} Failed"
        }

def updateRecipe(updatedRecipe: Recipe): 
    try:
        recipeColl = objDatabase["Recipes"]
        recipeColl.find_one_and_replace({"RID":updatedRecipe.RID}, json.loads(updatedRecipe.json()))

        return {
            "success" : True,
            "message" : f"Recipe Deletion for Recipe {updatedRecipe.RID} Successful"
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Updating for Recipe {updatedRecipe.RID} Failed"
        }