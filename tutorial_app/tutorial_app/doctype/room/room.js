// Copyright (c) 2025, ThanhNC and contributors
// For license information, please see license.txt

frappe.ui.form.on("Room", {

    
	refresh(frm) {

	},
    type(frm){
        const priceMap = {
            'Large': 1000000,
            'Medium': 500000,
            'Small': 200000
        };
        
        frm.set_value('price', priceMap[frm.doc.type] || 0); 
        
    }
});
