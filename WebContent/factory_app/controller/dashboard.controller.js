sap.ui.controller("factory_app.controller.dashboard", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf factory_app.dashboard
 */
	onInit: function() {
		var serviceUrl = "/sap/opu/odata/sap/ZY_WS19_321_FACTORY_SRV/";		
		var oModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl);
		this.getView().setModel(oModel);		
	},	
	

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf factory_app.dashboard
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf factory_app.dashboard
 */
// onAfterRendering: function() {
//	 
//		
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf factory_app.dashboard
 */
// onExit: function() {
//
// }
	
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
	
	cancelAssignment : function(e){

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
	
	editAssignment : function(e){
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
				
				var oUpdateAssignment = {
						AssignmentDate : sap.ui.getCore().byId("AssignmentDatePopup").getValue(),										
						TechnicianId : sap.ui.getCore().byId("TechnicianIdPopup").getValue(),
						TicketId : ticketId,
						TimeFrom : sap.ui.getCore().byId("TimeFromPopup").getValue(),
						TimeTo : sap.ui.getCore().byId("TimeToPopup").getValue(),						
				};
				
				
				oModel.update(sPath,oUpdateAssignment,false, function(oData, oResponse){
						sap.m.MessageToast.show("Assignment Updated");
						sap.ui.getCore().byId("Popup").destroy();
					},function(oError){
						sap.m.MessageToast.show("Technician with ID already exists.", oError);						
					}
				);				
				
				sap.m.MessageToast.show("Assignment Updated. You may have to refresh the page");
				sap.ui.getCore().byId("Popup").destroy();
				oModel.refresh(true);
				
			}
		})
		
		var oDialog = new sap.m.Dialog("Popup",{
			title : "Edit Assignment",
			modal : true,
			contentWidth : "1em",
			buttons : [saveButton , cancelButton],
			content : [ 
			            new sap.m.Label({
			            	text : "Date"
						}), new sap.m.Input({
							id : "AssignmentDatePopup",
							placeholder : "e.x. 01/01/2016"							
						}),new sap.m.Label({
			            	text : "Technician ID"			            	
						}), new sap.m.Input({
							id : "TechnicianIdPopup",
							placeholder : "e.x. T101"
						}),new sap.m.Label({
			            	text : "Ticket ID"
						}), new sap.m.Input({
							maxLength : 20,
							id : "TicketIdPopup",							
							value : ticketId,
							enabled : false
						}),new sap.m.Label({
			            	text : "Time From"
						}), new sap.m.Input({
							id : "TimeFromPopup",
							placeholder : "e.x. 12:00"
						}),new sap.m.Label({
			            	text : "Time To"
						}), new sap.m.Input({
							id : "TimeToPopup",
							placeholder : "e.x. 13:00"
						})
			            ]
		});
		
		sap.ui.getCore().byId("Popup").open();
		
	}

});