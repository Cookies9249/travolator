const location_input = document.getElementById("new-stop");
const autocomplete = document.getElementById("autocomplete");
const location_list = document.getElementById("stops");
const API_KEY = "b2afdcf99a0b4400a9318a6d39c34dd7"

var locations = [];

// ##### STREAMLIT #####

// Connect to Streamlit
function sendToClient(type, data) {
    var outData = Object.assign({
        isStreamlitMessage: true,
        type: type,
    }, data);
    window.parent.postMessage(outData, "*");
}

// Send data to Python
function sendDataToPython(data) {
    sendToClient("streamlit:setComponentValue", data);
}

// Access data from Python
let departure_input;
let destination_input;
function onDataFromPython(event) {
    if (event.data.type !== "streamlit:render") return;
    departure_input = event.data.args.departure;
    destination_input = event.data.args.destination;
}

// Initialize screen height
function setFrameHeight(height) {
    sendToClient("streamlit:setFrameHeight", {height: height});
}
window.addEventListener("load", function() {
    window.setTimeout(function() {
        setFrameHeight(document.documentElement.clientHeight)
    }, 0);
});

// Initialize
window.addEventListener("message", onDataFromPython);
sendToClient("streamlit:componentReady", {apiVersion: 1});