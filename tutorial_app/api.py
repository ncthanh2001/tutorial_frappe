import frappe

@frappe.whitelist()
def bulk_disable_items(item_names):
    if isinstance(item_names, str):
        item_names = frappe.parse_json(item_names) 

    if not isinstance(item_names, list):
        return {"status": "error", "message": "Invalid input"}

    for item in item_names:
        frappe.db.set_value("Item", item, "disabled", 1)

    frappe.db.commit()
    return {"status": "success", "message": f"Disabled {len(item_names)} items"}
 
