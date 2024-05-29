import pymongo, json, uuid, hashlib, os, bcrypt

from pymongo import ReturnDocument

from models.apimodels import NewUser, User, LoginAttempt

MongoHost = "localhost"
MongoPort = 15004

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

        userID = str(uuid.uuid4())

        newUser = User(
            UID=userID,
            Username=userInput.Username,
            FullName=userInput.FullName,
            Email=userInput.Email
        )

        userColl.insert_one(json.loads(newUser.json()))

        passOBJ = {
            "UID": newUser.UID,
            "Password" : userInput.Password
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

def AttemptLogin(Attempt):
    try:
        userColl = objDatabase["Users"]
        passColl = objDatabase["PassStorage"]

        # Find the user document by username and exclude the _id field
        user_doc = userColl.find_one({"Username": Attempt.Username}, {"_id": 0})
        
        if not user_doc:
            print("No user found with the given username")
            return None
        
        # Find the password document by password and exclude the _id field
        pass_doc = passColl.find_one({"UID": user_doc.get("UID", None)}, {"_id": 0})
        
        if not pass_doc:
            print("No password found with the given UID")
            return None
        
        saltHashPass = pass_doc.get("Password", None)
        
        # Split salt and hashed password based on the delimiter
        delimiter = ':::'
        storedSalt, storedHashedPassword = saltHashPass.split(delimiter)

        # Append the retrieved salt to the user's input password
        hashedUserInputPassword = bcrypt.hashpw(Attempt.Password.encode('utf-8'), storedSalt.encode('utf-8')).decode('utf-8')

        if hashedUserInputPassword == storedHashedPassword:
            # Passwords match, return the user document
            return user_doc
        else:
            # Passwords don't match, handle invalid login
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None