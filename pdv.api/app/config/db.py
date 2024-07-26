from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.pdv_db

collectio_products = db['products']
collectio_category = db['category']