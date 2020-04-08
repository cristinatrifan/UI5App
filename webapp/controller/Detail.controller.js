sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("myApp3.myApp3.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myApp3.myApp3.view.Detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/ztcr_fi__c_CDSorder(guid'" + oArgs.id + "')",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},
		
		handleNavButtonPress: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},
		
		handleOrder: function (evt) {
		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		MessageBox.confirm(
			bundle.getText("OrderDialogMsg"),
			function (oAction) {
				if (MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("OrderDialogSuccessMsg");
					MessageToast.show(successMsg);
					//call proper service method and update model (not part of this tutorial)
				}
			},
			bundle.getText("OrderDialogTitle")
		);
	}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myApp3.myApp3.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myApp3.myApp3.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myApp3.myApp3.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});