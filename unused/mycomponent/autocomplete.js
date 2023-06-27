// ##### AUTOCOMPLETE #####

// Text input detection
departure.addEventListener("keyup", function (e) {
    const inputValue = e.key;

    if (/^[a-zA-Z]$/.test(inputValue)) {
        handleIn(departure);
    }
});
destination.addEventListener("keyup", function (e) {
    const inputValue = e.key;

    if (/^[a-zA-Z]$/.test(inputValue)) {
        handleIn(destination);
    }
});
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
                var name = result.features[i].properties.address_line1
                var addr = result.features[i].properties.address_line2
                const insert = `<span data-addr="${name}, ${addr}" class="complete"><b>${name}</b>, ${addr}</span>`;
                autocomplete.innerHTML += insert;
            }

            // Add click functionality to autocomplete bar
            const spans = document.getElementsByClassName("complete");
            for (var i = 0; i < spans.length; i++) {
                (function (index) {
                    spans[index].addEventListener("click", function () {
                        // Set input to autocomplete
                        element.value = spans[index].getAttribute("data-addr");
                        autocomplete.innerHTML = "";
                        autocomplete.style.display = "none";
                    });
                })(i);
            }
            
            // Remove autocomplete display if needed
            if (!(departure === document.activeElement) && !(destination === document.activeElement) && !(location_input === document.activeElement)) {
                autocomplete.innerHTML = "";
                autocomplete.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
}

// Hide autocomplete when finished
departure.addEventListener("focusout", hideComplete);
destination.addEventListener("focusout", hideComplete);
location_input.addEventListener("focusout", hideComplete);

function hideComplete() {
    setTimeout(function () {
        autocomplete.innerHTML = "";
        autocomplete.style.display = "none";
    }, 300);
}
