import base64
from fastapi import APIRouter
from models.product_model import productModel
from config.db import collectio_products
from schema.product_schema import list_products, individual_product
from bson import ObjectId

router = APIRouter()

# GET Request
@router.get("/products/", tags=["Products"])
async def  get_products():
  products = list_products(collectio_products.find())
  if products:
    return individual_product(products)
  else:
    return {"message": "Products not found"}

# GET Request
@router.get("/products/{id}", tags=["Products"])
async def get_product_by_id(id: str):
  product = collectio_products.find_one({"_id": ObjectId(id)})
  if product:
    return individual_product(product)
  else:
    return {"message": "Product not found"}

# POST Request
@router.post("/product/", tags=["Products"])
async def post_product(product: productModel):
  collectio_products.insert_one(dict(product))

# PUT Request
@router.put("/products/{id}", tags=["Products"])
async def put_product(id: str, product: productModel):
  collectio_products.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(product)})

# DELETE Request
@router.delete("/products/{id}", tags=["Products"])
async def delete_product(id: str):
  collectio_products.find_one_and_delete({"_id": ObjectId(id)})