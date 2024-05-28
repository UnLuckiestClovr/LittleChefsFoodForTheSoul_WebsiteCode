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
            RID= str(uuid.uuid4()),
            RecipeName=newRecipe.RecipeName,
            Description=newRecipe.Description,
            Categories=newRecipe.Categories,
            Ingredients=newRecipe.Ingredients,
            Image=newRecipe.Image
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
            "message" : f"Recipe Creation Failed : {e}"
        }

def getAllRecipes():
    try:
        recipeColl = objDatabase["Recipes"]
        result = recipeColl.find()  # Convert cursor to list
        recipes = [{k: v for k, v in item.items() if k != "_id"} for item in result]
        if not result:  # Check if result is empty
            return {
                "success": True,
                "Recipes": []
            }
        else:
            return {
                "success": True,
                "Recipes": recipes
            }
    except Exception as e:
        return {
            "success": False,
            "message": "Recipe Fetch Failed"
        }


def getRecipeByID(RID: str):
    try:
        recipeColl = objDatabase["Recipes"]
        result = recipeColl.find_one({"RID": RID})
        if result:
            # Convert ObjectId to string for serialization
            if "_id" in result:
                result["_id"] = str(result["_id"])
            return {
                "success": True,
                "Recipe": result
            }
        else:
            return {
                "success": False,
                "message": f"No recipe found for ID: {RID}"
            }
    except Exception as e:
        return {
            "success": False,
            "message": f"Recipe Fetch for Recipe {RID} Failed: {str(e)}"
        }

def getRecipeByIngredient(ingredient: str):
    try:
        recipeColl = objDatabase["Recipes"]
        result = list(recipeColl.find({"Ingredients" : {"$in" : [ingredient]}}))
        recipes = [{k: v for k, v in item.items() if k != "_id"} for item in result]
        if not result:  # Check if result is empty
            return {
                "success": True,
                "Recipes": []
            }
        else:
            return {
                "success": True,
                "Recipes": recipes
            }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Recipe Fetch for Recipe with {ingredient} Failed"
        }

def getRecipeByCategory(category: str):
    try:
        recipeColl = objDatabase["Recipes"]
        result = list(recipeColl.find({"Categories" : {"$in" : [category]}}))
        recipes = [{k: v for k, v in item.items() if k != "_id"} for item in result]
        if not result:  # Check if result is empty
            return {
                "success": True,
                "Recipes": []
            }
        else:
            return {
                "success": True,
                "Recipes": recipes
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