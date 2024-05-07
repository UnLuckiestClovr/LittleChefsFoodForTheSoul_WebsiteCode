# external libraries
from fastapi import FastAPI, Path, Depends
from starlette.responses import Response
from py_eureka_client import eureka_client

from routes import POST, GET, PUT, DELETE

app = FastAPI(
    title='Little Chefs Recipe API',
    version='0.1'
)

app.include_router(POST.router)
app.include_router(GET.router)
app.include_router(PUT.router)
app.include_router(DELETE.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

# Configuration for Eureka client
EurekaHost = "localhost"
EurekaPort = 15000

eureka_client.init(
    eureka_server=f"http://{EurekaHost}:{EurekaPort}/eureka/",
    app_name="RecipeAPI",
    instance_port=15012,  # Port where your FastAPI service is running
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="0.0.0.0", port=15012)