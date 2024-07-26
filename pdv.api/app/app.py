from fastapi import FastAPI
from routes.product_route import router as productsRoute
from routes.category_route import router as categoriesRoute
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(productsRoute)
app.include_router(categoriesRoute)

