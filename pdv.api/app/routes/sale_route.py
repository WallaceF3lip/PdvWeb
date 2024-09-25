import base64
from fastapi import APIRouter
from models.sale_model import saleModel
from config.db import collectio_sales
from schema.sale_schema import list_sales, indivual_sale
from bson import ObjectId

router = APIRouter(prefix="/sale", tags=["Sales"])

# GET Request
@router.get("/getAll")
async def get_sales():
    sales = []
    for sale in collectio_sales.find():
        sales.append(indivual_sale(sale))
    if sales: 
        return sales
    else:
        return {"message": "Sales not found"}

# GET Request
@router.get("/getById/{id}")
async def get_sale_by_id(id: str):
    sale = collectio_sales.find_one({"_id": ObjectId(id)})
    if sale:
        return indivual_sale(sale) 
    else:
        return {"message": "Sale not found"}

# POST Request
@router.post("/create")
async def post_sale(sale: saleModel):
    collectio_sales.insert_one(dict(sale))
    return {"message": "Sale created"}

# PUT Request
@router.put("/update/{id}")
async def put_sale(id: str, sale: saleModel):
    collectio_sales.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(sale)})
    return {"message": "Sale updated"}

# DELETE Request
@router.delete("/delete/{id}")
async def delete_sale(id: str):
    collectio_sales.find_one_and_delete({"_id": ObjectId(id)})
    return {"message": "Sale deleted"}