import base64
from fastapi import APIRouter
from models.category_model import categoryModel
from config.db import collectio_category
from schema.category_schema import list_categories, individual_category
from bson import ObjectId


router = APIRouter(prefix="/category", tags=["Categories"])

# GET Request
@router.get("/getAll")
async def get_categories():
    categories = []
    for category in collectio_category.find():
        categories.append(individual_category(category))
    if categories: 
        return categories
    else:
        return {"message": "Categories not found"}

# GET Request
@router.get("/getById/{id}")
async def get_category_by_id(id: str):
    category = collectio_category.find_one({"_id": ObjectId(id)})
    if category:
        return individual_category(category) 
    else:
        return {"message": "Category not found"}

# POST Request
@router.post("/create")
async def post_category(category: categoryModel):
    category.name = category.name.upper()
    collectio_category.insert_one(dict(category))
    return {"message": "Category created"}

# PUT Request
@router.put("/update/{id}")
async def put_category(id: str, category: categoryModel):
    collectio_category.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(category)})
    return {"message": "Category updated"}

# DELETE Request
@router.delete("/delete/{id}")
async def delete_category(id: str):
    collectio_category.find_one_and_delete({"_id": ObjectId(id)})
    return {"message": "Category deleted"}