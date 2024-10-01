import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()  # loads the environment variables from .env

MONGO_SERVE_CONNECTION_STRING = os.environ["MONGO_SERVE_CONNECTION_STRING"]

# client = MongoClient("mongodb://localhost:27017")

client = MongoClient(MONGO_SERVE_CONNECTION_STRING)

db = client.pdv_db

collectio_products = db['products']
collectio_category = db['category']
collectio_sales = db['sales']