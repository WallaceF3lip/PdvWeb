def individual_category(category) -> dict:
    return {
        "id": str(category["_id"]),
        "name": category["name"]
    }

def list_categories(categories) -> list:
    return [individual_category(category) for category in categories]
