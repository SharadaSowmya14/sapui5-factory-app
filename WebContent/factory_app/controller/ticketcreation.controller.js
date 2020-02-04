sap.ui.controller("factory_app.controller.ticketcreation", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf factory_app.ticketcreation
	 */
	onInit : function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf factory_app.ticketcreation
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf factory_app.ticketcreation
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf factory_app.ticketcreation
	 */
	// onExit: function() {
	//
	// }
	onBack : function() {
		var app = new sap.m.App({
			initialPage : this.createId("idticket")
		});

		var page = sap.ui.view({
			id : this.createId("idticket"),
			viewName : "factory_app.view.ticket",
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	},

	addTicket : function() {

		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);

		var oNewTicket = {

			TicketId : sap.ui.getCore().byId(this.createId("ticketid"))
					.getValue(),					
			TicketName : sap.ui.getCore().byId(this.createId("ticketnameid"))
					.getValue(),
			TicketType : sap.ui.getCore().byId(this.createId("tickettypeid"))
					.getSelectedKey(),
			TicketDesc : sap.ui.getCore().byId(this.createId("ticketdescriptionid"))
					.getValue(),
			WorkingHrs : sap.ui.getCore().byId(this.createId("workinghoursid"))
					.getValue(),
			Location : sap.ui.getCore().byId(this.createId("locationid"))
					.getValue(),
			Machine : sap.ui.getCore().byId(this.createId("machineid"))
					.getValue(),
			SkillSet : sap.ui.getCore().byId(this.createId("skillsetid"))
					.getValue()
		}
		
		oModel.create('/TicketSet', oNewTicket, {
			success : function(oData, oResponse) {
				sap.m.MessageToast.show("New Ticket Added");
			},
			error : function(oError) {
				sap.m.MessageToast.show("Ticket with ID could not be created.");				
			}
		})

	}
});