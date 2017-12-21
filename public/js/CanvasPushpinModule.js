var CanvasLayer, CanvasPushpin;

(function () {
var canvasIdNumber = 0;

function generateUniqueID() {
var canvasID = 'canvasElm' + canvasIdNumber;
        canvasIdNumber++;

if (window[canvasID]) {
return generateUniqueID();
        }

return canvasID;
    }

function getCanvas(canvasID) {
var c = document.getElementById(canvasID);

if (c) {
            c = c.getContext("2d");
        }

return c;
    }

//The canvas layer will render a CanvasPushpin when it is added to the layer. 
    CanvasLayer = function () {
alert('CanvasLayer debug 10.00');
var canvasLayer = new Microsoft.Maps.EntityCollection();
        Microsoft.Maps.Events.addHandler(canvasLayer, 'entityadded', function (e) {
alert('CanvasLayer debug 10.01 e.entity._canvasID('+e.entity._canvasID+')');
if (e.entity._canvasID) {
alert('CanvasLayer debug 10.02');
                e.entity._renderCanvas();
            }
        });
return canvasLayer;
    };

    CanvasPushpin = function (location, renderCallback) {
alert('CanvasPushpin debug 10.00');
var canvasID = generateUniqueID();

var pinOptions = {
            htmlContent: '<canvas id="' + canvasID + '"></canvas>'
        };
alert('CanvasPushpin debug 10.01');

var pin = new Microsoft.Maps.Pushpin(location, pinOptions);
alert('CanvasPushpin debug 10.02');

        pin._canvasID = canvasID;
alert('CanvasPushpin debug 10.02.00 pin._canvasID('+pin._canvasID+')');

        pin._renderCanvas = function () {
alert('CanvasPushpin debug 10.03');
            renderCallback(pin, getCanvas(pin._canvasID));
        };

return pin;
    };
})();

// Call the Module Loaded method
Microsoft.Maps.moduleLoaded('CanvasPushpinModule');		  
