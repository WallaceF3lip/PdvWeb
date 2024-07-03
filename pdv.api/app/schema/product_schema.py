def individual_product(product) -> dict:
    return {
        "id": str(product["_id"]),
        "name": product["name"],
        "price": product["price"],
        "category": product["category"]
    }

def list_products(products) -> list:
    return [individual_product(product) for product in products]