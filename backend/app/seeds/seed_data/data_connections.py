# backend/app/seeds/seed_data/data_connections.py

data_connections = [
    {
        "user_id": 1,
        "business_id_1": 1,
        "business_id_2": 2,
        "service_id": 1,
        "connection_type": "Supplier",
        "connection_status": "Active",
        "connection_description": "Supplying premium coffee machines to the Gadget Garage."
    },
    {
        "user_id": 2,
        "business_id_1": 2,
        "business_id_2": 5,
        "service_id": 5,
        "connection_type": "Supplier",
        "connection_status": "Active",
        "connection_description": "The Gadget Garage supplies electronic devices to Fresh Fields Grocery."
    },
    {
        "user_id": 3,
        "business_id_1": 3,
        "business_id_2": 4,
        "service_id": 3,
        "connection_type": "Partnership",
        "connection_status": "Inactive",
        "connection_description": "Page Turner Bookstore collaborated with Chic Threads Boutique on an event."
    },
    {
        "user_id": 4,
        "business_id_1": 4,
        "business_id_2": 6,
        "service_id": 6,
        "connection_type": "Partnership",
        "connection_status": "Active",
        "connection_description": "Chic Threads Boutique partners with Sunset Grill for exclusive dining experiences."
    },
    {
        "user_id": 5,
        "business_id_1": 5,
        "business_id_2": 9,
        "service_id": 9,
        "connection_type": "Supplier",
        "connection_status": "Active",
        "connection_description": "Fresh Fields Grocery supplies pet food and pet care products to Paws & Claws Pet Shop."
    }
]
