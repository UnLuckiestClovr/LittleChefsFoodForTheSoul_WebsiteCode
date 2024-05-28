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

RecipeOrder {
    "OID" : <UUID>, // Order ID
    "UID" : <UUID>, // User ID
    "Items" : <List<OrderItem>> // List of Item IDs
}

OrderItem {
    "id" : <Long>, // Item ID
    "RID" : <String>, // Recipe ID
    "order" : <RecipeOrder> // A ForeignKey to the RecipeOrder that owns the OrderItem
}
----------------------------------------------

Service Port Info:

Eureka : 15000
RabbitMQ : 15001
Email Handler : 15002
MongoDB : 15004
Redis-Stack : 15005 & 15006
SQLServer : 15007


(If multiple ports [Replication Setting] From port A to port B)

API Gateway : 15010
UserService : 15020 - 15029     [ 15011 internal ]
RecipeService : 15030 - 15039   [ 15012 internal ]
BasketService : 15040 - 15049   [ 15013 internal ]
OrderService : 15050 - 15059    [ 15014 internal ]



Docker Commands ------------------------------

docker network create littlechefrecipes

docker run -p 15000:8761 -d --name LittleChefsEureka --net littlechefrecipes -d steeltoeoss/eureka-server

docker run -p 15004:27017 -d --name LittleChefsMongoDB --net littlechefrecipes -d mongo:latest

docker run -d --name LittleChefsRedis -p 15006:6379 -p 15007:8001 --net littlechefrecipes redis/redis-stack:latest
(Redis-Stack has two ports, the first is the actual redis DTB, the second is Redis-Insight which is like the MongoCompass of Redis and is accessed through "http://localhost:15007")

docker run --name LittleChefsSQLServer -p 15008:3306 --net littlechefrecipes -e MYSQL_ROOT_PASSWORD=abc123!!! -e MYSQL_DATABASE=orders -d mysql:latest