def indivual_sale(sale) -> dict:
    return {
        "id": str(sale["_id"]),
        "date": sale["date"],
        "client": sale["client"],
        "paymentMethod": sale["paymentMethod"],
        "totalValue": sale["totalValue"],
        "products": sale["products"],
        "pending": sale["pending"]
    }

def list_sales(sales) -> list:
    return [indivual_sale(sale) for sale in sales]
