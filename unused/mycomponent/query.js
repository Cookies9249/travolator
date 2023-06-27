// ##### AI QUERY #####

// Query stops from AI
async function queryAI() {
    const parsed_from = departure.value.split(/,(.*)/s);
    const parsed_to = destination.value.split(/,(.*)/s);

    // Validate inputs
    if ((parsed_from.length <= 2) && (parsed_to.length <= 2)) {
        departure.style.background = "#f4d7d7";
        destination.style.background = "#f4d7d7";
        return;
    } else if (parsed_from.length <= 2) {
        departure.style.background = "#f4d7d7";
        return;
    } else if (parsed_to.length <= 2) {
        destination.style.background = "#f4d7d7";
        return;
    }
    alert("1")
    sendDataToPython({
        value: [departure.value, destination.value],
        dataType: "json",
    });

    // Add to table dataset (origin)
    aiAdd("building", departure.value, "Added by you!");

//     // Change table HTML (to loading)
//     location_list.innerHTML = `
// <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
//     <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
//     <h3 style="font-family: 'Poppins';">Loading...</h3>
// </div>`;

//     // Call OpenAI GPT-3
//     fetch("https://api.openai.com/v1/completions", {
//             method: 'POST',
//             headers: {'Authorization': 'Bearer',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "model": "text-davinci-003",
//             "prompt": `Generate real-life places between ${departure.value} and ${destination.value},your response must be in JSON format as follows:\n[\n{\n"type": "<insert attraction type: building, landscape, nature>",\n"name": "<insert place name here>",\n"address": "<insert exact address here>",\n... // continue in this list format\n]\nStart now:`,
//             "temperature": 0.7,
//             "max_tokens": 1000,
//             "top_p": 1,
//             "frequency_penalty": 0,
//             "presence_penalty": 0
//         })
//     }).then(response => response.json())
//         .then(data => {
//             var GPTreply = data.choices[0].text;
//             var reply = JSON.parse(GPTreply);

//             for (var i = 0; i < reply.length; i++) {
//                 const type = reply[i].type || "building";
//                 const name = reply[i].name || "N/A";
//                 const addr = reply[i].address || "N/A";
//                 aiAdd(type, `${name}, ${addr}`, "Added by AI!");
//             }
//         })
//         .catch(err => {});
    
    // Add to table dataset (destination)
    aiAdd("building", destination.value, "Added by you!");
}

function aiAdd(type, addr, desc) {
    const id = "id" + Math.random().toString(16).slice(2);

    const json = {
        "id": id,
        "type": type,
        "addr": addr,
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