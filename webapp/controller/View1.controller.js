//https://developers.sap.com/group.cp-frontend-ui5-1.html
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("myApp3.myApp3.controller.View1", {
		onInit: function () {

		},

		handleSearch: function (evt) {
			// create model filter
			var filters = [];
			var query = evt.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("address", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("List");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		// show in a pop-up which list element was pressed
		handleListItemPress: function (oEvent) {
			//			MessageBox.show(
			//				"You pressed item: " + oEvent.getSource().getBindingContext(), {
			//					icon: sap.m.MessageBox.Icon.INFORMATION,
			//					title: "It works!",
			//					actions: [sap.m.MessageBox.Action.OK]
			//				}
			//			);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedOrderId = oEvent.getSource().getBindingContext().getProperty("id");
			oRouter.navTo("Detail", {
				id: selectedOrderId
			});
		}
	});
});