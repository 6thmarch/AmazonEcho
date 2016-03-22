
/**
 * App ID for the skill
 */
var APP_ID = ""; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var http = require('http');

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var username = ""; //Enter username for RM Bridge here
var passwd = ""; //Enter password for RM Bridge here
var server = ""; //Enter RM Bridge address here
var port = 7474; //Enter RM Bridge Port Number here
var auth = "Basic " + new Buffer(username + ":" + passwd).toString("base64");
var action = undefined;
var device = undefined;
var quantity = 1;
var attribute = undefined;
var codesToSend = [];

var BroadlinkRMControlSkill = function() {
    AlexaSkill.call(this, APP_ID);
};

/*Devices Initialization
Create arrays and push in the words that you call the device for each device.
For example: Sometimes you call the speaker as 'speaker', 'audio' or 'audioinput'.
All in lower case and concatenated.
*/
	var aktimateArray = [];
	aktimateArray.push("aktimate");
	aktimateArray.push("audio");
	aktimateArray.push("audioinput");
	aktimateArray.push("speaker");	
	
	var projectorArray = [];
	projectorArray.push("projector");
	
	var projectorScreenArray = [];
	projectorScreenArray.push("projectorscreen");
	projectorScreenArray.push("projectionscreen");

	var hdmiSwitchArray = [];
	hdmiSwitchArray.push("hdmiswitch");
	hdmiSwitchArray.push("videoswitch");
	hdmiSwitchArray.push("hdmiswitcher");
	hdmiSwitchArray.push("videoswitcher");
	hdmiSwitchArray.push("videoswitch");
	hdmiSwitchArray.push("video");
	hdmiSwitchArray.push("videoinput");
	hdmiSwitchArray.push("screen");
	hdmiSwitchArray.push("display");
	
	var leftTableLightArray = [];
	leftTableLightArray.push("lefttablelight");

	var rightTableLightArray = [];
	rightTableLightArray.push("righttablelight");

	var airPurifierArray = [];
	airPurifierArray.push("airpurifier");
	
	var asusMonitorArray = [];
	asusMonitorArray.push("monitor");
	asusMonitorArray.push("asusmonitor");
	
	var airConArray = [];
	airConArray.push("aircon");
	airConArray.push("aircond");
	airConArray.push("airconditioner");
	airConArray.push("ac");
	
	var fanArray = [];
	fanArray.push("fan");
	
	var curtainArray = [];
	curtainArray.push("curtain");
	
	var magicBallArray = [];
	magicBallArray.push("magicball");
	magicBallArray.push("discoball");
	
	var allEntertainmentsArray = [];
	allEntertainmentsArray.push("entertainment");
	allEntertainmentsArray.push("entertainments");

	var minixProjectorArray = [];
	minixProjectorArray.push("minixprojector");
	
	var minixMonitorArray = [];
	minixMonitorArray.push("minixmonitor");
	
	var imacProjectorArray = [];
	imacProjectorArray.push("imacprojector");
	imacProjectorArray.push("desktopprojector");

	
	var imacMonitorArray = [];
	imacMonitorArray.push("imacmonitor");
	imacMonitorArray.push("desktopmonitor");
	
	var qboxProjectorArray = [];
	qboxProjectorArray.push("qboxprojector");
	
	var qboxMonitorArray = [];
	qboxMonitorArray.push("qboxmonitor");
	
	var qboxArray = [];
	qboxArray.push("qbox");
	
	var listOfDevices = [];
	listOfDevices.push(aktimateArray);
	listOfDevices.push(projectorArray);
	listOfDevices.push(projectorScreenArray);
	listOfDevices.push(hdmiSwitchArray);
	listOfDevices.push(leftTableLightArray);
	listOfDevices.push(rightTableLightArray);
	listOfDevices.push(airPurifierArray);
	listOfDevices.push(asusMonitorArray);
	listOfDevices.push(airConArray);
	listOfDevices.push(fanArray);
	listOfDevices.push(curtainArray);
	listOfDevices.push(magicBallArray);
	listOfDevices.push(allEntertainmentsArray);
	listOfDevices.push(minixProjectorArray);
	listOfDevices.push(minixMonitorArray);
	listOfDevices.push(imacProjectorArray);
	listOfDevices.push(imacMonitorArray);
	listOfDevices.push(qboxProjectorArray);
	listOfDevices.push(qboxMonitorArray);
	
	var aktimateAttributesArray = [];
	aktimateAttributesArray.push("volume");
	
	var fanAttributesArray = [];
	fanAttributesArray.push("speed");
	fanAttributesArray.push("timer");
	fanAttributesArray.push("oscil");
	fanAttributesArray.push("oscillate");
	fanAttributesArray.push("oscillation");
	
	var airConAttributesArray = [];
	airConAttributesArray.push("temperature");
	
	var hdmiSwitchAttributesArray = [];
	hdmiSwitchAttributesArray.push("inputone");
	hdmiSwitchAttributesArray.push("inputtwo");
	hdmiSwitchAttributesArray.push("inputthree");
	hdmiSwitchAttributesArray.push("inputfour");

//End of Devices Initialization

// Extend AlexaSkill
BroadlinkRMControlSkill.prototype = Object.create(AlexaSkill.prototype);
BroadlinkRMControlSkill.prototype.constructor = BroadlinkRMControlSkill;

BroadlinkRMControlSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BroadlinkRMControlSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
    };

BroadlinkRMControlSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    	 
    console.log("BroadlinkRMControlSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

BroadlinkRMControlSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here

      
};


BroadlinkRMControlSkill.prototype.intentHandlers = {

    "OnOffEventIntent": function (intent, session, response) {
    	var event = "OnOffEvent";
        handleEventRequest(intent, session, response, event);
    },
    "AudioControlEventIntent": function (intent, session, response) {
    	var event = "AudioControlEvent";

        handleEventRequest(intent, session, response, event);
    },
    "VideoControlEventIntent": function (intent, session, response) {
    	var event = "VideoControlEvent";

        handleEventRequest(intent, session, response, event);
    },
     "GeneralControlEventIntent": function (intent, session, response) {
        var event = "GeneralControlEvent";

        handleEventRequest(intent, session, response, event);
    },
    "DeviceRepromptEventIntent": function (intent, session, response) {
        var event = "DeviceRepromptEvent";

        handleEventRequest(intent, session, response, event);
    },


    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "With Broadlink RM Control, you can send commands via RM Bridge to Broadlink RM1 or RM2 for execution.  " +
            "For example, you could say turn off the tv, turn on the lights or open the curtains. Now, what would you like to do?";
        var repromptText = "For example, you could say turn off the tv, turn on the lights or open the curtains. Now, what would you like to do?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Cancelling",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Cancelling",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    }
};

/**
 * Function to handle the onLaunch skill behavior
 */

function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    
    var cardTitle = "Broadlink RM Control";
    var repromptText = "With Broadlink RM Control, you can send commands via RM Bridge to Broadlink RM1 or RM2 for execution.  For example, you could say turn off the tv, turn on the lights, or open the curtains. Now, what would you like to do?";
    var speechText = "<p>Broadlink RM Control.</p> <p>What would you like to do?</p>";
    var cardOutput = "Broadlink RM Control. What would you like to do?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.

    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardOutput);
}

/**
 * Gets a poster prepares the speech to reply to the user.
 */
function handleEventRequest(intent, session, response, triggeringEvent) {
    
		var actionPrefix;
		var sessionAttributes = {};
		var speechText = "";
		
		InputPreprocessing(intent, triggeringEvent, function(error){
			if(error == 'none'){
				matchCommandToCode(function(err){
					if(codesToSend.length > 0){

						console.log("length of codes to send: ", codesToSend.length);
						console.log("codesToSend: " + codesToSend);
		    	    
						performRequestedActions(0,function(resultSpeech, result){
							sessionAttributes.text = result;
							session.attributes = sessionAttributes;
								
							speechText = resultSpeech;        	
							var speechOutput = {
								speech: "<speak>" + speechText + "</speak>",
								type: AlexaSkill.speechOutputType.SSML
								};
				           
							response.tell(speechOutput);
							CleanUp();
						});
    	
					}
					else{				
					speechText =  "Sorry, I didn't get that. Would you like to repeat your command?";
					var speechOutput = {
		                speech: "<speak><p>" + speechText + "</p></speak>",
		                type: AlexaSkill.speechOutputType.SSML
		            };
					repromptText =  "Would you like to repeat your command?";
					var repromptOutput = {
		                speech: "<speak><p>" + speechText + "</p></speak>",
		                type: AlexaSkill.speechOutputType.SSML
		            };
					response.ask(speechOutput, repromptOutput);
			}

					
					
				});
			}			
			else if (error == 'action undefined' || error == 'device undefined')
			{
				
					speechText =  "Sorry, I didn't get that. Would you like to repeat your command?";
					var speechOutput = {
		                speech: "<speak><p>" + speechText + "</p></speak>",
		                type: AlexaSkill.speechOutputType.SSML
		            };
					repromptText =  "Would you like to repeat your command?";
					var repromptOutput = {
		                speech: "<speak><p>" + speechText + "</p></speak>",
		                type: AlexaSkill.speechOutputType.SSML
		            };
					response.ask(speechOutput, repromptOutput);
					
			}
			
		});
		
    
    	
 
}

function InputPreprocessing(intent, triggeringEvent, eventCallback){
	if(triggeringEvent == "OnOffEvent")
		{
			if(intent.slots.onOffAction.value != undefined){
				action = intent.slots.onOffAction.value;
			}
			if(intent.slots.device.value != undefined){
				device = intent.slots.device.value;
			}

		}
		else if (triggeringEvent == "AudioControlEvent")
		{
			if(intent.slots.audioControlAction.value != undefined){
				action = intent.slots.audioControlAction.value;
			}
			if(intent.slots.device.value != undefined){
				 device = intent.slots.device.value;	
			}
			if(intent.slots.attribute.value != undefined){
				 attribute = intent.slots.attribute.value;	
			}
			if(intent.slots.quantity.value != undefined){
			//Quantity value restricted to 10 times at a single instance in case Alexa heard wrongly a number that would cause a sudden huge volume increase
				 quantity = intent.slots.quantity.value;
				 if(quantity > 10)
				 {
				 	quantity = 10;

				 }	
			}

		}
		else if (triggeringEvent == "VideoControlEvent")
		{
			if(intent.slots.videoControlAction.value != undefined){
				action = intent.slots.videoControlAction.value;
			}
			if(intent.slots.device.value != undefined){
				 device = intent.slots.device.value;	
			}
			if(intent.slots.attribute.value != undefined){
				 attribute = intent.slots.attribute.value;	
			}
			
		}
		else if (triggeringEvent == "GeneralControlEvent")
		{
			if(intent.slots.generalControlAction.value != undefined){
				action = intent.slots.generalControlAction.value;
			}
			if(intent.slots.device.value !== undefined){
				 device = intent.slots.device.value;
				 	
			}
			if(intent.slots.attribute.value != undefined){
				 attribute = intent.slots.attribute.value;	
			}
		}
		else if (triggeringEvent == "DeviceRepromptEvent")
		{
			if(intent.slots.device.value !== undefined){
				 device = intent.slots.device.value;				 	
			}
		}
		
		if(action != undefined && (device != undefined | attribute != undefined )){
				
			if(device == undefined && attribute != undefined ){
				if(aktimateAttributesArray.indexOf(attribute) > -1)
				{
					device = "aktimate";
				}
				else if(fanAttributesArray.indexOf(attribute) > -1)
				{
					device = "fan";
				}
				else if(airConAttributesArray.indexOf(attribute) > -1)
				{
					device = "aircon";
				}		
			}			
		}
		
		if(device == undefined){
			eventCallback('device undefined');
		}
		else if(action == undefined){
			eventCallback('action undefined');	
		}
		else if (device != undefined && action != undefined)
		{
			device = device.toLowerCase();
			device = device.replace(/\.|-| /g,'');
			action = action.toLowerCase();
			action = action.replace(/\.|-| /g,'');
			
			if(attribute != undefined)
			{
				attribute = attribute.toLowerCase();
				attribute = attribute.replace(/\.|-| /g,'');
			
			}

			eventCallback('none');

		}
		

		//console.log("Action Value after pre-process: ", action);
		//console.log("Device Value after pre-process: ", device);
		//console.log("Quantity Value after pre-process: ", quantity);
		//console.log("Attribute Value after pre-process: ", attribute);
}

function performRequestedActions(startIndex, eventCallback){

			var qty;
			var qtyPerformed =0 ;
      		if(Array.isArray(codesToSend[startIndex]))
      		{
      			qty = codesToSend[startIndex][1];
      			code = codesToSend[startIndex][0];
      		}
      		else
      		{
      			qty = 1;	
      			code = codesToSend[startIndex];
      		}
      		console.log("qty:" + qty);

	  		for(var j = 0 ; j < qty ; j++)	  		
	  		{
	  	 	sendCommandToRMBridge(code, function(result) {
				
			if(result == "communication error"){
				speechText = "There is a problem communicating with RM Bridge. Make sure RM Bridge is online and try again.";
				eventCallback(speechText, result);
				return;				
			}		
			else if (result['code'] != 0) {
			  	speechText = "<p>Command " + code + " failed to execute. Please try again.</p>";
			  	eventCallback(speechText, result);
			  	return;
			}		
			else
			{
				qtyPerformed++;
				if(qtyPerformed == qty && startIndex != codesToSend.length-1)
				{
					performRequestedActions(++startIndex, function(speechText, result){
						speechText = speechText;
						result = result;
						eventCallback(speechText, result);
	
					});
				}
				else if(qtyPerformed == qty && startIndex == codesToSend.length-1)
				{
					speechText = "<p>Okay.</p>";
					eventCallback(speechText, result);
					return;
				}
											
			}
			});
		}
}

function sendCommandToRMBridge(code, eventCallback) {

var options = {
  hostname: server,
  port: port,
  path: '/code/' + code,
  method: 'GET',
  headers : {
            "Authorization" : auth,
            'Content-Type': 'application/json'
        }
};
		console.log("Sending code: ", code, " to RM Bridge.");
	  var request =  http.request(options, function(res) {
	        var body = '';	
	        res.on('data', function (chunk) {
	            body += chunk;
	        });	
	        res.on('end', function () {
	            var stringResult = JSON.parse(body);
	            console.log("stringResult: " + JSON.stringify(stringResult));
	            eventCallback(stringResult);	            
	        });
	        
	    });
	    
	    request.on('error', function (e) {
       		 console.log("HTTP Post Request error: ", e);
       		 eventCallback("communication error");
			
    	});
	    

	//End the request.
	request.end();

}



// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Broadlink Bridge Control Skill.
    
    var skill = new BroadlinkRMControlSkill();
    skill.execute(event, context);

};



// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Broadlink Bridge Control Skill.
    
    var skill = new BroadlinkRMControlSkill();
    skill.execute(event, context);
};

//Command matching algorithm
function matchCommandToCode(eventCallback){		
	//console.log("Device Value in matchCommandToCode(): ", device);
	//console.log("Action Value in matchCommandToCode(): ", action);	
	CompileActions(false, function(err){
		if (codesToSend.length <= 0)
		{
			//if array doesnt contain command, then try command contain array. Attempt to mitigate noises.
			CompileActions(true, function(err){
				
			});
		}
	});
	eventCallback();
		
}

function CompileActions(checkContains, eventCallback){
	//console.log("Device Value in CompileActions(): ", device);
	//console.log("Action Value in CompileActions(): ", action);
	//console.log("Attribute Value in CompileActions(): ", attribute);


	if(checkContains == true){
		for(var i=0; i < listOfDevices.length; i++){
	    	for(var j=0 ; j < listOfDevices[i].length ; j++){
	    		if(isInString(listOfDevices[i][j], device))
	    		{
		    		//console.log("Contains comparator: " + i + ":: "+ isInString(listOfDevices[i][j], device));
		    	    //console.log("String to check contains: ", device);
		    	    device = listOfDevices[i][j];
	    		}	
	    	}
		}
	}
		
	if (aktimateArray.indexOf(device) > -1) {
	    //In the array!
	    switch(action){
					case 'on':
						codesToSend.push("SpeakerON");
						break;	
					case 'off':
						codesToSend.push("SpeakerOFF");
						break;
					case 'restart':
						codesToSend.push("SpeakerOFF");
						codesToSend.push("SpeakerON");
						break;
					case 'lower':
					case 'down':
					case 'quieter':
					case 'quieten':
					case 'softer':
					case 'soften':
					case 'decrease':
						if(quantity != undefined)
						{
							codesToSend.push(["AktimateVolumeDown", quantity]);

						}
						else
						{
							codesToSend.push("AktimateVolumeDown");

						}
						break;					
					case 'louder':
					case 'up':
					case 'increase':
					case 'raise':
						if(quantity != undefined)
						{
							codesToSend.push(["AktimateVolumeUp", quantity]);

						}
						else
						{
							codesToSend.push("AktimateVolumeUp");

						}
						break;
					case 'mute':
					case 'unmute':
						codesToSend.push("AktimateMUTE");
						break;
					case 'bluetooth':
						codesToSend.push("AktimateBT");
						break;
					case 'usb':
						codesToSend.push("AktimateUSB");
						break;
					case 'aux1':
					case 'rca1':
					case 'input1':
						codesToSend.push("AktimateAUX1");
						break;
					case 'aux2':
					case 'rca2':
					case 'input2':
						codesToSend.push("AktimateAUX2");
						break;
					case 'line':
						codesToSend.push("AktimateLINE");
						break;
					case 'play':
					case 'pause':
						codesToSend.push("AktimatePlayPause");
						break;
					case 'next':
						codesToSend.push("AktimateNextTrack");
						break;
					case 'back':
					case 'previous':
						codesToSend.push("AktimatePreviousTrack");
						break;				
		} 
	}
	else if(fanArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push('FanOnOff');
				break;
			case 'down':
			case 'off':
				codesToSend.push("FanOnOff");
				break;
			case 'speed':
				codesToSend.push("FanSpeed");
				break;
			case 'oscillation':
			case 'oscillate':
				codesToSend.push("FanOscillate");
				break;
			case 'timer':
				codesToSend.push("FanTimer");
				break;
			
		}
	}
	else if(airConArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("AirConON");
				break;
			case 'down':
			case 'off':
				codesToSend.push("AirConOFF");
				break;
		}
		
	}
	else if(leftTableLightArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("LeftTablelightOnOff");
				break;
			case 'down':
			case 'off':
				codesToSend.push("LeftTablelightOnOff");
				break;
		}
		
	}
	else if(rightTableLightArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("RightTablelightOnOff");
				break;
			case 'down':
			case 'off':
				codesToSend.push("RightTablelightOnOff");
				break;
		}

	}
	else if(airPurifierArray.indexOf(device) > -1)
	{
			switch(action){
				case 'up':
				case 'on':
					codesToSend.push("AirPurifierON");
					break;
				case 'down':
				case 'off':
					codesToSend.push("AirPurifierOFF");
					break;
			}
	}
	else if(asusMonitorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("AsusMonON");
				codesToSend.push("HDMISwitcherOutputAInput2");

				break;
			case 'down':
			case 'off':
				codesToSend.push("AsusMonOFF");
				break;
		}

	}
	else if(allEntertainmentsArray.indexOf(device) > -1)
	{
			switch(action){
				case 'off':
				case 'down':
					codesToSend.push("ProjectorScreenUP");
					codesToSend.push("ProjectorOFF");
					codesToSend.push("AsusMonOFF");
					codesToSend.push("AktimateUSB");
					codesToSend.push("HDMISwitcherOutputAOff");
					codesToSend.push("HDMISwitcherOutputAInput2");
					codesToSend.push("HDMISwitcherOutputBInput1");
					codesToSend.push("HDMISwitcherOutputAOff");
					break;
			}
	}
	else if(minixMonitorArray.indexOf(device) > -1)
	{
		switch(action){
				case 'on':
				case 'up':
					codesToSend.push("CurtainClose");
					codesToSend.push("ProjectorOFF");
					codesToSend.push("ProjectorScreenUP");
					codesToSend.push("SpeakerON");
					codesToSend.push("AktimateLINE");
					codesToSend.push("AsusMonON");							
					codesToSend.push("HDMISwitcherOutputAInput3");
					break;
		}
	}
	else if(minixProjectorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("CurtainClose");
				codesToSend.push("ProjectorON");
				codesToSend.push("ProjectorScreenDOWN");
				codesToSend.push("SpeakerON");
				codesToSend.push("AktimateLINE");
				codesToSend.push("AsusMonOFF");								
				codesToSend.push("HDMISwitcherOutputAInput3");
				break;
		}
	}
	else if(qboxArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("QboxOnOff");
				break;
			case 'off':
			case 'down':
				codesToSend.push("QboxOnOff");
				break;
			case 'restart':
				codesToSend.push("QboxOnOff");
				codesToSend.push("QboxOnOff");

				break;
		}
	}
	else if(qboxMonitorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("ProjectorOFF");
				codesToSend.push("ProjectorScreenUP");
				codesToSend.push("SpeakerON");
				codesToSend.push("AktimateLINE");
				codesToSend.push("AsusMonON");								
				codesToSend.push("HDMISwitcherOutputAInput4");
				break;
		}
	}
	else if(qboxProjectorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("CurtainClose");
				codesToSend.push("ProjectorON");
				codesToSend.push("ProjectorScreenDOWN");
				codesToSend.push("SpeakerON");
				codesToSend.push("AktimateLINE");
				codesToSend.push("AsusMonOFF");								
				codesToSend.push("HDMISwitcherOutputAInput4");
				break;
		}
	}
	else if(imacMonitorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("ProjectorOFF");
				codesToSend.push("ProjectorScreenUP");
				codesToSend.push("SpeakerON");
				codesToSend.push("AktimateUSB");
				codesToSend.push("AsusMonON");								
				codesToSend.push("HDMISwitcherOutputAInput2");
				break;
		}
	}
	else if(imacProjectorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'on':
			case 'up':
				codesToSend.push("CurtainClose");
				codesToSend.push("ProjectorON");
				codesToSend.push("ProjectorScreenDOWN");
				codesToSend.push("SpeakerON");
				codesToSend.push("AktimateUSB");
				codesToSend.push("AsusMonOFF");								
				codesToSend.push("HDMISwitcherOutputAInput2");
				break;
		}
	}
	else if(projectorArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("ProjectorON");
				break;
			case 'down':
			case 'off':
				codesToSend.push("ProjectorOFF");
				break;
		}
	}
	else if(projectorScreenArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'deactivate':
			case 'keep':				
			case 'retract':
				codesToSend.push("ProjectorScreenUP");
				break;
			case 'down':				
			case 'activate':
			case 'prepare':
				codesToSend.push("ProjectorScreenDOWN");
				break;
			case 'pause':
			case 'stop':
				codesToSend.push("ProjectorScreenPAUSE");
				break;
		}

	}
	else if(hdmiSwitchArray.indexOf(device) > -1)
	{
		if(attribute != undefined)
		{	
			switch(attribute){
				case 'a':
				case 'outputa':
						switch(action){
							case 'input1':
							case 1:
									codesToSend.push("HDMISwitcherOutputAInput1");
									break;
							case 'inpu2':
							case 2:
									codesToSend.push("HDMISwitcherOutputAInput2");
									break;
							case 'input3':
							case 3:
									codesToSend.push("HDMISwitcherOutputAInput3");
									break;
							case 'input4':
							case 4:
									codesToSend.push("HDMISwitcherOutputAInput4");
									break;
							case 'off':
									codesToSend.push("HDMISwitcherOutputAOff");
									break;
						}
						break;
						
				case 'b':
				case 'outputb':
						switch(action){
							case 'input1':
							case 1:
									codesToSend.push("HDMISwitcherOutputBInput1");
									break;
							case 'input2':
							case 2:
									codesToSend.push("HDMISwitcherOutputBInput2");
									break;
							case 'input3':
							case 3:
									codesToSend.push("HDMISwitcherOutputBInput3");
									break;
							case 'input4':
							case 4:
									codesToSend.push("HDMISwitcherOutputBInput4");
									break;
							case 'off':
									codesToSend.push("HDMISwitcherOutputBOff");					
									break;
						}
						break;
						
				}
			}
			else
			{
				switch(action){
					case 'on':
					case 'up':
							codesToSend.push("HDMISwitcherOnOff");
							break;
					case 'off':
					case 'down':
							codesToSend.push("HDMISwitcherOnOff");
							break;
					case 'restart':
							codesToSend.push("HDMISwitcherOnOff");
							codesToSend.push("HDMISwitcherOnOff");
							break;
				}
			}
				
			
	}
	else if(magicBallArray.indexOf(device) > -1)
	{
		switch(action){
			case 'up':
			case 'on':
				codesToSend.push("MagicBallON");
				break;
			case 'off':
			case 'down':
				codesToSend.push("MagicBallOFF");
				break;
		}
	}
	else if(curtainArray.indexOf(device) > -1)
	{
		switch(action){
			case 'open':
				codesToSend.push("CurtainOpen");
				break;
			case 'close':
				codesToSend.push("CurtainClose");
				break;
							
		}
	}
	eventCallback();

	
}

function CleanUp(){
	//Variables clean-up
	action = undefined;
	device = undefined;
	attribute = undefined;
	quantity = 1;
	codesToSend = [];
	//console.log("Variables action, device and attribute cleaned up. They are all set to undefined.");

}

function isInString(word, sentence) {
    return new RegExp('\\b' + word + '\\b').test(sentence);
}
