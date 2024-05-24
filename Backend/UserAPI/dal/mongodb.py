import pymongo, json, uuid, hashlib, os

from pymongo import ReturnDocument

from models.apimodels import NewUser, User, LoginAttempt

MongoHost = "LittleChefsMongo"
MongoPort = 27017

MongoClient = pymongo.MongoClient(f"mongodb://{MongoHost}:{MongoPort}/") # Test Connection, Change to Containerized Naming Conventions during Uploading

objDatabase = MongoClient["LittleChefsUsers"]

def FetchUsers():
    try:
        userColl = objDatabase["Users"]
        result = list(userColl.find())

        users = [{k: v for k, v in user.items() if k != "_id"} for user in result]

        return users
    except Exception as e:
        print(f"Error fetching users: {e}")
        return None

def CreateNewUser(userInput: NewUser):
    try:
        userColl = objDatabase["Users"]
        passColl = objDatabase["PassStorage"]

        userID = uuid.uuid4()

        newUser = User(
            UID=userID,
            Username=userInput.username,
            FullName=userInput.name,
            Email=userInput.email
        )

        userColl.insert_one(json.loads(newUser.json()))

        passOBJ = {
            "UID": newUser.UID,
            "Password" : userInput.password
        }
        passColl.insert_one(passOBJ)

        return newUser
    except Exception as e:
        print(f"error : {e}")
        return None

def FetchUser_ByID(UID: str):
    try:
        userColl = objDatabase["Users"]
        result = userColl.find_one({"UID": UID})
        return result
    except:
        return None

def UpdateUser(updatedItem: User):
    try:
        userColl = objDatabase["Users"]
        result = userColl.find_one_and_replace({"UID": updatedItem.UID})
        return result
    except:
        return None

def DeleteUser(UID: int):
    try:
        userColl = objDatabase["Users"]
        result = userColl.find_one_and_delete({"UID": UID})
        return result
    except:
        return None

def AttemptLogin(Attempt: LoginAttempt):
    try:
        userColl = objDatabase["Users"]
        passColl = objDatabase["PassStorage"]

        userData = dict(json.dumps(userColl.find_one({"Username" : Attempt.Username})))
        usernameResult = userData.get("UID", None)
        passwordResult = dict(json.dumps(passColl.find_one({"Password" : Attempt.Password}))).get("UID", None)

        if (usernameResult == None or passwordResult == None):
            return None
        elif (usernameResult == passwordResult):
            return userData
    except:
        return False