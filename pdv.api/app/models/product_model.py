# from uuid import UUID, uuid4
# from pydantic import Field
from pydantic import BaseModel
# from typing import Optional

class productModel(BaseModel):
  name: str = None
  price: float = None
  category: str = None
  image: str = None