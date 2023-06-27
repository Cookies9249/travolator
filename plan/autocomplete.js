// ##### AUTOCOMPLETE #####

// Text input detection
location_input.addEventListener("keyup", function (e) {
    const inputValue = e.key;

    if (/^[a-zA-Z]$/.test(inputValue)) {
        handleIn(location_input);
    }
});

function handleIn(element) {
    if (element.value.length == 0) {
        return;
    }
    element.style.background = "#fff";

    // Geoapify API
    var requestOptions = {
        method: 'GET',
    };

    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${element.value}&apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // Set styles
            autocomplete.style.display = "flex";
            autocomplete.style.top = element.getBoundingClientRect().top + element.offsetHeight + 5 + "px";
            autocomplete.style.left = element.getBoundingClientRect().left + "px";
            autocomplete.style.width = element.offsetWidth + "px";

            // Generate HTML
            autocomplete.innerHTML = "";
            for (var i = 0; i < result.features.length; i++) {
                var addr = result.features[i].properties.formatted;
                var lat = result.features[i].properties.lat;
                var lon = result.features[i].properties.lon;

                const insert = `<span data-addr="${addr}" data-lat="${lat}" data-lon="${lon}" class="complete">${addr}</span>`;
                autocomplete.innerHTML += insert;
            }

            // Add click functionality to autocomplete bar
            const spans = document.getElementsByClassName("complete");
            for (var i = 0; i < spans.length; i++) {
                (function (index) {
                    spans[index].addEventListener("click", function () {
                        // Set input to autocomplete
                        var addr = spans[index].getAttribute("data-addr");
                        var lat = spans[index].getAttribute("data-lat");
                        var lon = spans[index].getAttribute("data-lon"); 

                        element.value = addr
                        autocomplete.innerHTML = "";
                        autocomplete.style.display = "none";

                        // Input
                        input_data = [addr, parseFloat(lat), parseFloat(lon)]
                    });
                })(i);
            }
            
            // Remove autocomplete display if needed
            if (!(location_input === document.activeElement)) {
                autocomplete.innerHTML = "";
                autocomplete.style.display = "none";
            }
        })
}

// Hide autocomplete when finished
location_input.addEventListener("focusout", hideComplete);

function hideComplete() {
    setTimeout(function () {
        autocomplete.innerHTML = "";
        autocomplete.style.display = "none";
    }, 300);
}
