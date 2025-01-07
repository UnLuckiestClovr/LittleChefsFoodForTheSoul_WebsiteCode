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
