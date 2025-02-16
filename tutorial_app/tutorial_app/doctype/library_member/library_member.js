// Copyright (c) 2025, ThanhNC and contributors
// For license information, please see license.txt

frappe.ui.form.on("Library Member", {
	refresh(frm) {

	},
});

frappe.listview_settings['Library Member'] = {
	onload: function(listview) {
		frappe.route_options = {
			"full_name": ["=", 'Thanh']
		};
	}
};