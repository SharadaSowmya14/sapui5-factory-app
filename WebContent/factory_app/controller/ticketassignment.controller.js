sap.ui.controller("factory_app.controller.ticketassignment", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf factory_app.ticketassignment
*/
	onInit: function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf factory_app.ticketassignment
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf factory_app.ticketassignment
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf factory_app.ticketassignment
*/
//	onExit: function() {
//
//	}
	onBack : function(){
		var app = new sap.m.App({
			initialPage : this.createId("iddashboard")
		});
		
		var page = sap.ui.view({
			id : this.createId("iddashboard"),
			viewName : "factory_app.view.dashboard",
			type : sap.ui.core.mvc.ViewType.XML
		});
		
		app.addPage(page);
		app.placeAt("content","only");
	},
	
	confirmAssignment : function(){
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		
		var oNewAssign = {
		
				TicketId : sap.ui.getCore().byId(this.createId("TicketId"))
					.getSelectedKey(),					
				TechnicianId : sap.ui.getCore().byId(this.createId("TechnicianId"))
					.getSelectedKey(),
				AssignmentDate : sap.ui.getCore().byId(this.createId("AssignmentDate"))
					.getValue(),
				TimeFrom : sap.ui.getCore().byId(this.createId("TimeFrom"))
					.getValue(),
				TimeTo : sap.ui.getCore().byId(this.createId("TimeTo"))
					.getValue()
		};
		
		oModel.create('/AssignSet',oNewAssign, {
			success : function(oData, oResponse){
				sap.m.MessageToast.show("New Assignment Confirmed");
			},
			error : function(oError){
				sap.m.MessageToast.show("Error creating new assignment");				
			}
		})
		
	}
});