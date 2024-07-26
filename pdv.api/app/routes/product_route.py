import base64
from fastapi import APIRouter
from models.product_model import productModel
from config.db import collectio_products
from schema.product_schema import list_products, individual_product
from bson import ObjectId

router = APIRouter(prefix="/product", tags=["Products"])

# GET Request
@router.get("/getAll")
async def get_products():
  products = []
  for product in collectio_products.find():
    products.append(individual_product(product))
  if products: 
    return products
  else:
    return {"message": "Products not found"}

# GET Request
@router.get("/getById/{id}")
async def get_product_by_id(id: str):
  product = collectio_products.find_one({"_id": ObjectId(id)})
  if product:
    return individual_product(product) 
  else:
    return {"message": "Product not found"}

# POST Request
@router.post("/create")
async def post_product(product: productModel):
  collectio_products.insert_one(dict(product))
  return {"message": "Product created"}


# PUT Request
@router.put("/update/{id}")
async def put_product(id: str, product: productModel):
  collectio_products.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(product)})
  return {"message": "Product updated"}

# DELETE Request
@router.delete("/delete/{id}")
async def delete_product(id: str):
  collectio_products.find_one_and_delete({"_id": ObjectId(id)})
  return {"message": "Product deleted"}