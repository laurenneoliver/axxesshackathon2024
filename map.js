
mapboxgl.accessToken = 'pk.eyJ1IjoiZ24tMTIzMTI0NDEyMyIsImEiOiJjbHNxeG9vMDMxNDV6Mmtuc2xsYXRicjZuIn0.ABEoXxqAfLnik2wXY0g1PA';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // You can choose different map styles
    center: [-74.5, 40], // Default center, will be updated later
    zoom: 9
});

map.addControl(new mapboxgl.NavigationControl());

// Add search for pharmacies functionality using Mapbox Geocoding API
map.on('load', function () {
    // Get the latitude and longitude from your other file
    const latitude = YOUR_LATITUDE; // Replace with your latitude
    const longitude = YOUR_LONGITUDE; // Replace with your longitude

    // Center the map at the provided latitude and longitude
    map.setCenter([longitude, latitude]);

    // Search for pharmacies within a 50-mile radius
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/pharmacy.json?proximity=${longitude},${latitude}&limit=10&radius=80467&access_token=${mapboxgl.accessToken}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Add pharmacy markers to the map
            data.features.forEach(function (pharmacy) {
                // Create a HTML element for the marker
                const el = document.createElement('div');
                el.className = 'marker';

                // Create the popup with pharmacy information
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3>${pharmacy.text}</h3>`);

                // Add marker to the map
                new mapboxgl.Marker(el)
                    .setLngLat(pharmacy.center)
                    .setPopup(popup)
                    .addTo(map);
            });
        });
});