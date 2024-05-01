Backend Uses -
    Python - FastAPI
    C# - .NET API
    Javascript - Node.js / Express  { For Custom Gateway }

    MongoDB
    Redis-Stack
    SQLServer
    

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