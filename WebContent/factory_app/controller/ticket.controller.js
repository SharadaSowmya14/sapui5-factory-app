sap.ui.controller("factory_app.controller.ticket", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf factory_app.ticket
*/
	onInit: function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";		
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf factory_app.ticket
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf factory_app.ticket
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf factory_app.ticket
*/
//	onExit: function() {
//
//	}
	navigate : function(evt){
		var viewlink = "factory_app.view."+ evt.getSource().data("link");
		var viewid = "id"+evt.getSource().data("link");
		
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
	
	cancelTicket : function(e){

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
	
	editTicket : function(e){
		var oModel = this.getView().getModel();
		var sPath = e.getSource().getBindingContext().getPath();
		
		var obj = oModel.getProperty(sPath);
		var ticketId = obj.TicketId;
		
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
				
				var oUpdateTicket = {
						TicketId : ticketId,
						TicketName : sap.ui.getCore().byId("TicketNamePopup").getValue(),										
						TicketType : sap.ui.getCore().byId("TicketTypePopup").getValue(),
						TicketDesc : sap.ui.getCore().byId("TicketDescPopup").getValue(),
						WorkingHrs : sap.ui.getCore().byId("WorkingHrsPopup").getValue(),
						Location : sap.ui.getCore().byId("LocationPopup").getValue(),
						Machine : sap.ui.getCore().byId("MachinePopup").getValue(),
						SkillSet : sap.ui.getCore().byId("SkillSetPopup").getValue(),
				};
				
				
				oModel.update(sPath,oUpdateTicket,false, function(oData, oResponse){
						sap.m.MessageToast.show("Ticket Updated");
						sap.ui.getCore().byId("Popup").destroy();
					},function(oError){
						sap.m.MessageToast.show("Error while updating ticket.", oError);						
					}
				);				
				
				sap.m.MessageToast.show("Ticket Updated. You may have to refresh the page");
				sap.ui.getCore().byId("Popup").destroy();
				oModel.refresh(true);
				
			}
		})
		
		var oDialog = new sap.m.Dialog("Popup",{
			title : "Edit Ticket",
			modal : true,
			contentWidth : "1em",
			buttons : [saveButton , cancelButton],
			content : [ 
			            new sap.m.Label({
			            	text : "Ticket Id"
						}), new sap.m.Input({
							id : "TicketIdPopup",
							value : ticketId,
							enabled : false
						}),new sap.m.Label({
			            	text : "Ticket Name"			            	
						}), new sap.m.Input({
							id : "TicketNamePopup"
						}),new sap.m.Label({
			            	text : "Ticket Type"
						}), new sap.m.Input({
							id : "TicketTypePopup",						
						}),new sap.m.Label({
			            	text : "Ticket Description"
						}), new sap.m.Input({
							id : "TicketDescPopup",						
						}),new sap.m.Label({
			            	text : "Working Hours"
						}), new sap.m.Input({
							id : "WorkingHrsPopup"
						}),new sap.m.Label({
			            	text : "Location"
						}), new sap.m.Input({
							id : "LocationPopup"
						}),new sap.m.Label({
			            	text : "Machine"
						}), new sap.m.Input({
							id : "MachinePopup"
						}),new sap.m.Label({
			            	text : "Skill Set"
						}),new sap.m.Input({
							id : "SkillSetPopup"
						})
			            ]
		});
		
		sap.ui.getCore().byId("Popup").open();
		
	}

});