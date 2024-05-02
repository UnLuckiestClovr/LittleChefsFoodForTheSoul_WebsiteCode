Backend Uses -
    Python - FastAPI
    Java - Springboot
    Javascript - Node.js / Express  { For Custom Gateway }

    MongoDB
    Redis-Stack
    SQLServer2
    

Frontend Uses - 
    Pug (Formerly Known as Jade)
    Javascript
    Node.js / Express


Models Used: ---------------------------------

User {
    "UID" : <string>, // User ID
    "FullName" : <string>,
    "Email" : <string>,
    "Username" : <string>",
    "Password" : <string>
}

Recipe {
    "RID" : <string>, // Recipe ID
    "RecipeName" : <string>,
    "Description" : <string>,
    "Ingredients" : <string[]> // List of Strings (Doesn't Show Quantity),
    "Images" : <string[]> // List of Image URLs
}

Basket {
    "BID" : <string>, // Basket ID
    "Items" : <BasketItem[]> // List of BasketItem Objects
}

BasketItem {
    "RID" : <string>, // Recipe ID
    "Quantity" : <int>
}

Order {
    "OID" : <string>, // Order ID
    "UID" : <string>, // User ID
    "Items" : <string[]> // List of Item IDs
}

----------------------------------------------

Service Port Info:

Eureka : 15000
Kafka : 15001
Zookeeper : 15002
Email Handler : 15003
MongoDB : 15004
Redis-Stack : 15005
SQLServer : 15006

API Gateway : 15010
UserService : 15011
RecipeService : 15012
BasketService : 15013
OrderService : 15014