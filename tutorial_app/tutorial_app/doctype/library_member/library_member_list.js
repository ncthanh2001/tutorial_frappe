// Copyright (c) 2025, ThanhNC and contributors
// For license information, please see license.txt
function ButtonFunction(listview) {
	console.log("ButtonFunction");
	frappe.msgprint("ButtonFunction");
}
frappe.listview_settings['Library Member'] = {
	onload: function(listview) {
		frappe.route_options = {
			"name": ["=", '%LM%']
		};
	},
	refresh: function(listview) {
        listview.page.add_inner_button("Button Name", function() {
            ButtonFunction(listview);
        });;

		listview.page.add_action_item(__("Actions"), () => {
            frappe.msgprint("Action Clicked");
        });
    },
};