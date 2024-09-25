from pydantic import BaseModel
from models.product_model import productSaleModel

class saleModel(BaseModel):
    date: str = None
    client: str = None
    paymentMethod: str = None
    totalValue: float = None
    products: list = productSaleModel
    pending: bool = False