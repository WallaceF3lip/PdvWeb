from pydantic import BaseModel

class PaymentMethodModel(BaseModel):
    credito: float = 0
    debito: float = 0
    dinheiro: float = 0
    pix: float = 0