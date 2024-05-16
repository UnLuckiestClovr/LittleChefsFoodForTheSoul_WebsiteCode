import time

from fastapi import FastAPI, Path, Depends
from starlette.responses import Response
from py_eureka_client import eureka_client

app = FastAPI(
    title='Little Chefs User API',
    version='0.1'
)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

# Configuration for Eureka client
EurekaHost = "LittleChefsEureka"
EurekaPort = 8761

max_retries = 3
retry_delay = 2  # Delay between retries in seconds
attempt = 0

while attempt < max_retries:
    time.sleep(3)  # Wait for 3 seconds before the next iteration
    try:
        eureka_client.init(
            eureka_server=f"http://{EurekaHost}:{EurekaPort}/eureka/",
            app_name="UserAPI",
            instance_host="littlechefsfoodforthesoul_websitecode-littlechef-userservice-",
            instance_port=15011,
        )
        print("Eureka client initialized successfully.")
        break
    except Exception as e:
        print(f"Failed to initialize Eureka client: {e}")
        attempt += 1
        print(f"Retrying in {retry_delay} seconds...")
        time.sleep(retry_delay)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="0.0.0.0", port=15011)