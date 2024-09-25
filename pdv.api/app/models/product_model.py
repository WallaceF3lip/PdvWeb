from pydantic import BaseModel

class product(BaseModel):
  name: str = None
  price: float = None
  category: str = None

class productModel(product, BaseModel):
  image: str = None

class productSaleModel(product, BaseModel):
  quantity: int = None