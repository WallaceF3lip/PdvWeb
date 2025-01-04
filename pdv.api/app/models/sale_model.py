from pydantic import BaseModel
from models.product_model import productSaleModel
from models.paymentMethod_model import PaymentMethodModel

class saleModel(BaseModel):
    date: str = None
    client: str = None
    paymentMethod: PaymentMethodModel
    totalValue: float = None
    products: list = productSaleModel
    pending: bool = False
    address: str = None
    delivery: bool = False