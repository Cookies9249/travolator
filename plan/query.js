// ##### AI QUERY #####

// Query stops from AI
function loadTable() {
    // Validate
    if (location_list.innerHTML.length > 0) {
        alert("Data Loaded")
        return;
    }

    // Geoapify API
    var requestOptions = {
        method: 'GET',
    };

    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${departure_input}&apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // Add to table dataset (origin)
            var departure_addr = `${result.features[0].properties.address_line1}, ${result.features[0].properties.address_line2}`
            var lat = result.features[0].properties.lat
            var lon = result.features[0].properties.lon
            addRow("building", departure_addr, lat, lon, "Added by you!");

            // AI Generated timetable
            queryAI()

            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${destination_input}&apiKey=${API_KEY}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // Add to table dataset (destination)
                    var destination_addr = `${result.features[0].properties.address_line1}, ${result.features[0].properties.address_line2}`
                    var lat = result.features[0].properties.lat
                    var lon = result.features[0].properties.lon
                    addRow("building", destination_addr, lat, lon, "Added by you!");
                })
        })
}

function addRow(type, addr, lat, lon, desc) {
    const id = "id" + Math.random().toString(16).slice(2);

    const json = {
        "id": id,
        "type": type,
        "addr": addr,
        "lat": lat,
        "lon": lon,
        "desc": desc,
        "method": null,
        "leave": null,
        "arrive": null,
        "time": null,
        "fees": null
    };

    locations.push(json);
    rerender();
}

function queryAI() {
    const GPT_API_KEY = "";

    // Change table HTML (to loading)
    location_list.innerHTML = `
<div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    <h3 style="font-family: 'Poppins';">Loading...</h3>
</div>`;

    // Call OpenAI GPT-3

    /* NOTE: This section only works with an OpenAI API Key,
        which requires for the user to open a billing account (requires money)
        Thus, under '.catch', example data (sourced from ChatGPT) is given
        as an alternative. */

    fetch("https://api.openai.com/v1/completions", {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + GPT_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": `Generate real-life places between ${departure_input} and ${destination_input},your response must be in JSON format as follows:[{"type": "<type: building, landscape, nature>","name": "<name>","address": "<exact address>","lat": "<latitude>","lon": "<longitude>"}... // continue in this list format]`,
            "temperature": 0.7,
            "max_tokens": 1000,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        })})

        .then(response => response.json())
        .then(data => {
            var GPTreply = data.choices[0].text;
            var reply = JSON.parse(GPTreply);

            for (var i = 0; i < reply.length; i++) {
                const type = reply[i].type || "building";
                const name = reply[i].name;
                const addr = reply[i].address;
                const lat = reply[i].lat;
                const lon = reply[i].lon;
                addRow(type, `${name}, ${addr}`, lat, lon, "Added by AI!");
            }
        })
        .catch(error => {
            example_reply = [
                {"type": "building","name": "Ripley's Aquarium of Canada","address": "288 Bremner Blvd, Toronto, ON M5V 3L9, Canada","lat": "43.642403","lon": "-79.386809"},
                {"type": "building","name": "Royal Ontario Museum","address": "100 Queens Park, Toronto, ON M5S 2C6, Canada","lat": "43.66833","lon": "-79.39425"},
                {"type": "building","name": "Art Gallery of Ontario","address": "317 Dundas St W, Toronto, ON M5T 1G4, Canada","lat": "43.6536","lon": "-79.39233"},
                {"type": "landscape","name": "Toronto Islands","address": "Toronto Islands, Toronto, ON, Canada","lat": "43.616668","lon": "-79.383333"},
                {"type": "landscape","name": "Gatineau Park","address": "Gatineau Park, Chelsea, QC J9B 2P6, Canada","lat": "45.5469","lon": "-75.8538"},
                {"type": "building","name": "National Gallery of Canada","address": "380 Sussex Dr, Ottawa, ON K1N 9N4, Canada","lat": "45.429924","lon": "-75.698632"}
            ]
              
            for (var i = 0; i < example_reply.length; i++) {
                const type = example_reply[i].type || "building";
                const name = example_reply[i].name;
                const addr = example_reply[i].address;
                const lat = parseFloat(example_reply[i].lat);
                const lon = parseFloat(example_reply[i].lon);
                addRow(type, `${name}, ${addr}`, lat, lon, "Added by AI!");
            }
        })
        
    
    
}