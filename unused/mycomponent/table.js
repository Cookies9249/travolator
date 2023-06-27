// ##### TABLE: STOPS #####

// Change item positions (Up)
function moveUp(id) {
    const index = getIndex(id);

    try {
        locations[index].method = null;
        locations[index].leave = null;
        locations[index].arrive = null;
        locations[index].time = null;
        locations[index].fees = null;
    }
    catch (err) {
    }

    try {
        locations[index - 1].method = null;
        locations[index - 1].leave = null;
        locations[index - 1].arrive = null;
        locations[index - 1].time = null;
        locations[index - 1].fees = null;
    }
    catch (err) {
    }

    array_move(locations, index, Math.max(0, index - 1));

    try {
        locations[index - 2].method = null;
        locations[index - 2].leave = null;
        locations[index - 2].arrive = null;
        locations[index - 2].time = null;
        locations[index - 2].fees = null;
    }
    catch (err) {
    }

    rerender();
}

// Change item positions (Down)
function moveDown(id) {
    const index = getIndex(id);

    try {
        locations[index].method = null;
        locations[index].leave = null;
        locations[index].arrive = null;
        locations[index].time = null;
        locations[index].fees = null;
    }
    catch (err) {
    }

    try {
        locations[index - 1].method = null;
        locations[index - 1].leave = null;
        locations[index - 1].arrive = null;
        locations[index - 1].time = null;
        locations[index - 1].fees = null;
    }
    catch (err) {
    }

    array_move(locations, index, Math.min(locations.length - 1, index + 1));

    try {
        locations[index].method = null;
        locations[index].leave = null;
        locations[index].arrive = null;
        locations[index].time = null;
        locations[index].fees = null;
    }
    catch (err) {
    }

    rerender();
}

// Remove item
function remove(id) {
    locations = locations.filter(location => location.id !== id);

    rerender();
}

// Add new item
function add() {
    // Check inputs
    const parsed = location_input.value.split(/,(.*)/s);

    if (parsed.length <= 2) {
        location_input.style.background = "#c4434325";
        return;
    } else if (parsed[0].length == 0) {
        location_input.style.background = "#c4434325";
        return;
    }

    // Create new id
    const id = "id" + Math.random().toString(16).slice(2);

    // Configure data
    const json = {
        "id": id,
        "type": "building",
        "addr": location_input.value,
        "desc": "Added by you!",
        "method": null,
        "leave": null,
        "arrive": null,
        "time": null,
        "fees": null
    };

    // Add to array
    locations.push(json);
    location_input.value = "";
    rerender();
}

// General util
function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

function getIndex(id) {
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].id === id) {
            return i;
        }
    }
}

// Rerender table
function rerender() {
    location_list.innerHTML = "";

    locations.forEach(function (location, index) {
        // Name and addr variables
        const parsed = location.addr.split(/,(.*)/s) || [];
        var name = "N/A";
        var addr = "N/A";

        if (parsed.length > 2) {
            name = parsed[0];
            addr = parsed[1];
        }

        // Reassign variables
        const id = location.id;
        const type = location.type || "building";
        const desc = location.desc || "Added by you!";
        const method = location.method;
        const leave = location.leave || "XX:XX";
        const arrive = location.arrive || "XX:XX";
        const time = location.time || "XX:XX";
        const fees = location.fees || "$XX.XX";

        // Type of attraction
        var attraction_type = `<i class="fa-solid fa-building"></i>`;
        if (String(type).toLowerCase() === "landscape") {
            attraction_type = `<i class="fa-solid fa-image"></i>`;
        } else if (String(type).toLowerCase() === "nature") {
            attraction_type = `<i class="fa-solid fa-tree"></i>`;
        }

        // Convert to HTML
        var insert = `
<div class="stop" title="${desc}">
    <div class="location">
        <h4 class="name">${attraction_type}&emsp;${name}</h4>
        <h4 class="addr">${addr}</h4>
    </div>
    <div class="editor">
        <div class="move">
            <button onclick="moveUp('${id}')">&uarr;</button>
            <button onclick="moveDown('${id}')">&darr;</button>
        </div>
        <button onclick="remove('${id}')">&times;</button>
    </div>
</div>`;

        // Route panels (Between items)
        if ((locations.length > 1) && (index != locations.length - 1)) {
            insert = insert + `
<div class="method">
    <div class="choices">
        <i class="fas fa-walking ${(method == 0 ? "active" : "")}" onclick="selectMethod('${id}', 0)"></i>
        <i class="fa-solid fa-bicycle ${(method == 1 ? "active" : "")}" onclick="selectMethod('${id}', 1)"></i>
        <i class="fa-solid fa-car ${(method == 2 ? "active" : "")}" onclick="selectMethod('${id}', 2)"></i>
        <i class="fa-solid fa-train ${(method == 3 ? "active" : "")}" onclick="selectMethod('${id}', 3)"></i>
        <i class="fa-solid fa-plane ${(method == 4 ? "active" : "")}" onclick="selectMethod('${id}', 4)"></i>
        <div class="vr"></div>
        <i class="fa-brands fa-uber ${(method == 5 ? "active" : "")}" onclick="selectMethod('${id}', 5)"></i>
        <i class="fa-brands fa-lyft ${(method == 6 ? "active" : "")}" onclick="selectMethod('${id}', 6)"></i>
        <span class="point">&rarr;</span>

    </div>
    <div class="infos">
        <div class="time">
            <span class="info"><span class="main-info">Leave:</span> <input data-id="${id}" type="datetime-local" class="date-input" value="${leave}" oninput="updateLeave(this)"></span>
            <span class="info"><span class="main-info">Arrive:</span> <input data-id="${id}" type="datetime-local" class="date-input" value="${arrive}" oninput="updateArrive(this)"></span>
        </div>
        <div class="trip-info">
            <span class="info"><span class="main-info">Time:</span> <input data-id="${id}" type="time" class="info-input" value="${time}" oninput="updateTime(this)"></span>
            <span class="info"><span class="main-info">Fees:</span> <input data-id="${id}" type="number" min="0.00" max="10000.00" step="0.01" class="info-input" value="${fees}" oninput="updateFees(this)"></span>
        </div>
    </div>
</div>`;
        }

        // Insert HTML
        location_list.innerHTML += insert;
    });

    if (location_list.innerHTML.length == 0) {
        location_list.innerHTML = `
<h1 style="color: #212121; text-align: center">
        No planned stops? :(
</h1>
        `;
    }
}
rerender();

// ##### TABLE: ROUTES #####

// Information functionality
function updateLeave(src) {
    const source = src;
    const index = getIndex(source.getAttribute("data-id"));

    locations[index].leave = source.value;
}
function updateArrive(src) {
    const source = src;
    const index = getIndex(source.getAttribute("data-id"));

    locations[index].arrive = source.value;
}
function updateTime(src) {
    const source = src;
    const index = getIndex(source.getAttribute("data-id"));

    locations[index].time = source.value;
}
function updateFees(src) {
    const source = src;
    const index = getIndex(source.getAttribute("data-id"));

    locations[index].fees = source.value;
}

// Link (maps) functionality
function selectMethod(id, index) {
    const idx = getIndex(id);
    locations[idx].method = index;

    // Get origin and destination variables
    const origin = locations[idx].addr;
    const destin = locations[idx + 1].addr;

    // Open Google Maps window
    var travelmode = "driving";
    switch (locations[idx].method) {
        case 0:
            travelmode = "walking";
            break;
        case 1:
            travelmode = "bicycling";
            break;
        case 2:
            travelmode = "driving";
            break;
        case 3:
            travelmode = "transit";
            break;
        case 4:
            travelmode = "flights";
            window.open(`https://www.google.com/maps/dir/${origin}/${destin}`, "_blank");
            return;
        case 5:
            window.open(`https://m.uber.com/looking`, "_blank");
            return;
        case 6:
            window.open(`https://ride.lyft.com/`, "_blank");
            return;

    }
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destin}&travelmode=${travelmode}`, "_blank");
    rerender();
} 