sap.ui.controller("factory_app.controller.technicianaddition", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf factory_app.technicianaddition
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
	 * @memberOf factory_app.technicianaddition
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf factory_app.technicianaddition
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf factory_app.technicianaddition
	 */
	// onExit: function() {
	//
	// }
	onBack : function() {
		var app = new sap.m.App({
			initialPage : this.createId("idtechnician")
		});

		var page = sap.ui.view({
			id : this.createId("idtechnician"),
			viewName : "factory_app.view.technician",
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	},

	addTechnician : function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		
		var oNewTechnician = {

			TechnicianId : sap.ui.getCore().byId(this.createId("technicianid")).getValue(),
			TechnicianName : sap.ui.getCore().byId(
					this.createId("techniciannameid")).getValue(),
			WorkingHrs : sap.ui.getCore().byId(this.createId("workinghrsid"))
					.getSelectedKey(),
			Availability : sap.ui.getCore().byId(
							this.createId("availableid")).getSelectedKey(),
			SkillSet : sap.ui.getCore().byId(this.createId("skillsetid"))
					.getValue(),
			Location : sap.ui.getCore().byId(this.createId("locationid"))
					.getValue(),
			Notes : sap.ui.getCore().byId(
					this.createId("notesid")).getValue(),
			Contact : sap.ui.getCore().byId(
					this.createId("contactid")).getValue()
		}
		
		oModel.create('/TechnicianSet',oNewTechnician, {
			success : function(oData, oResponse){
				sap.m.MessageToast.show("New Technician Added");
			},
			error : function(oError){
				sap.m.MessageToast.show("Error creating new technician.");				
			}
		});

	}
});