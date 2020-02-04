sap.ui.controller("factory_app.controller.technician", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf factory_app.technician
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
	 * @memberOf factory_app.technician
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf factory_app.technician
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf factory_app.technician
	 */
	// onExit: function() {
	//
	// }
	navigate : function(evt) {
		var viewlink = "factory_app.view." + evt.getSource().data("link");
		var viewid = "id" + evt.getSource().data("link");

		var app = new sap.m.App({
			initialPage : this.createId(viewid)
		});

		var page = sap.ui.view({
			id : this.createId(viewid),
			viewName : viewlink,
			type : sap.ui.core.mvc.ViewType.XML
		});

		app.addPage(page);
		app.placeAt("content", "only");
	},
	
	cancelTechnician : function(e){

		var oModel = this.getView().getModel();
		var sPath = e.getSource().getBindingContext().getPath();
		
		sap.m.MessageBox.confirm("Confirm Delete",{
			onClose : function(oAction){
				if(oAction=="OK"){
					oModel.remove(sPath, {
					  method: "DELETE",
					  success: function(data) {
						  sap.m.MessageToast.show("Entry Deleted.");  
					  },
					  error: function(e) {
						  sap.m.MessageToast.show("Error deleting.");
					  }
					});
				}
			}
		});			
			
	},
	
	editTechnician : function(e){
		var oModel = this.getView().getModel();
		var sPath = e.getSource().getBindingContext().getPath();
		
		var obj = oModel.getProperty(sPath);
		var technicianId = obj.TechnicianId;
		
		var cancelButton = new sap.m.Button({
			text : "Cancel",
			type : sap.m.ButtonType.Reject,
			press : function(){
				sap.ui.getCore().byId("Popup").destroy();
			}
		})
		var saveButton = new sap.m.Button({
			text : "Save",
			type : sap.m.ButtonType.Accept,
			press : function() {
				var serviceURL = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
				
				var oUpdateTechnician = {
						TechnicianId : technicianId,
						TechnicianName : sap.ui.getCore().byId("TicketNamePopup").getValue(),
						WorkingHrs : sap.ui.getCore().byId("WorkingHrsPopup").getValue(),
						Availability : sap.ui.getCore().byId("AvailabilityPopup").getValue(),
						SkillSet : sap.ui.getCore().byId("SkillSetPopup").getValue(),
						Location : sap.ui.getCore().byId("LocationPopup").getValue(),
						Notes : sap.ui.getCore().byId("NotesPopup").getValue(),
						Contact : sap.ui.getCore().byId("ContactPopup").getValue(),
				};
				
				
				oModel.update(sPath,oUpdateTechnician,false, function(oData, oResponse){
						sap.m.MessageToast.show("Technician Updated");
						sap.ui.getCore().byId("Popup").destroy();
					},function(oError){
						sap.m.MessageToast.show("Error while updating technician.", oError);						
					}
				);				
				
				sap.m.MessageToast.show("Technician Updated. You may have to refresh the page");
				sap.ui.getCore().byId("Popup").destroy();
				oModel.refresh(true);
				
			}
		})
		
		var oDialog = new sap.m.Dialog("Popup",{
			title : "Edit Technician",
			modal : true,
			contentWidth : "1em",
			buttons : [saveButton , cancelButton],
			content : [ 
			            new sap.m.Label({
			            	text : "Technician Id"
						}), new sap.m.Input({
							id : "TechnicianIdPopup",
							value : technicianId,
							enabled : false
						}),new sap.m.Label({
			            	text : "Technician Name"			            	
						}), new sap.m.Input({
							id : "TicketNamePopup"
						}),new sap.m.Label({
			            	text : "Working Hours"
						}), new sap.m.Input({
							id : "WorkingHrsPopup",						
						}),new sap.m.Label({
			            	text : "Availability"
						}), new sap.m.Input({
							id : "AvailabilityPopup",						
						}),new sap.m.Label({
			            	text : "Skill Set"
						}), new sap.m.Input({
							id : "SkillSetPopup"
						}),new sap.m.Label({
			            	text : "Location"
						}), new sap.m.Input({
							id : "LocationPopup"
						}),new sap.m.Label({
			            	text : "Notes"
						}), new sap.m.Input({
							id : "NotesPopup"
						}),new sap.m.Label({
			            	text : "Contact"
						}),new sap.m.Input({
							id : "ContactPopup"
						})
			            ]
		});
		
		sap.ui.getCore().byId("Popup").open();
		
	}

});