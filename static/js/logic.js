// Create the createMap function.
function createMap(eqMarkersLayer, tectPlatesLayer) {

    // Create the tile layer that will be the background of our map.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: 'pk.eyJ1IjoiaW5zaXlha2siLCJhIjoiY2tza291aXI3MG9zcDJwcGNkODh6dmYzciJ9.gj-VzXCw0EOCflqOHh_11Q'
    });

    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: 'pk.eyJ1IjoiaW5zaXlha2siLCJhIjoiY2tza291aXI3MG9zcDJwcGNkODh6dmYzciJ9.gj-VzXCw0EOCflqOHh_11Q'
    });

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: 'pk.eyJ1IjoiaW5zaXlha2siLCJhIjoiY2tza291aXI3MG9zcDJwcGNkODh6dmYzciJ9.gj-VzXCw0EOCflqOHh_11Q'
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: 'pk.eyJ1IjoiaW5zaXlha2siLCJhIjoiY2tza291aXI3MG9zcDJwcGNkODh6dmYzciJ9.gj-VzXCw0EOCflqOHh_11Q'
    });
    // Create a baseMaps object to hold the lightmap layer.
    var baseMaps = {
        Street: street,
        Satellite: satellite,
        Grayscale: grayscale,
        Outdoors: outdoors,
        Dark: dark
    };

    //Create an overlayMaps object to hold the bikeStations layer.
    var overlayMaps = {
        Earthquakes: eqMarkersLayer,
        "Tectonic Plates": tectPlatesLayer
    };

    // Create the map object with options.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [street, eqMarkersLayer]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    //create legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend"),
            depth = [0, 5, 10, 30, 50, 70, 90];
        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(depth[i] + 1) + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
}

//determine marker color
function markerColor(depth) {
    switch (true) {
        case depth > 90:
            return "#BD0026";
        case depth > 70:
            return "#E31A1C";
        case depth > 50:
            return "#FC4E2A";
        case depth > 30:
            return "#FD8D3C";
        case depth > 10:
            return "#FEB24C";
        case depth > 5:
            return "#FED976";
        default:
            return "#FFEDA0";
    }
}

// Create the createMarkers function.
function createMarkers() {
    //all earthquakes past 7 days
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    var tecturl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
    // Get the data with d3.
    d3.json(url).then(function (data) {
        console.log("features array", data.features)
        console.log("features array first obj", data.features[0])
        console.log("first obj cord array", data.features[0].geometry)
        console.log("coordinates array", data.features[0].geometry.coordinates)
        console.log("lat", data.features[0].geometry.coordinates[1])
        console.log("lon", data.features[0].geometry.coordinates[0])
        //depth for color
        console.log("depth", data.features[0].geometry.coordinates[2])
        // mag for size
        console.log("magnitude", data.features[0].properties.mag)
        console.log("place", data.features[0].properties.place)
        console.log("alert", data.features[0].properties.alert)
        console.log("title", data.features[0].properties.title)

        var eqMarkers = [];
        var tectLine = L.layerGroup();
        var eqData = data.features

        for (var i = 0; i < eqData.length; i++) {
            // loop through the array, create a new marker, and push it to the eqMarkers array
            var coordinates = [eqData[i].geometry.coordinates[1], eqData[i].geometry.coordinates[0]];
            eqMarkers.push(
                L.circleMarker(coordinates, {
                    color: markerColor(eqData[i].geometry.coordinates[2]),
                    weight: 1,
                    fillColor: markerColor(eqData[i].geometry.coordinates[2]),
                    fillOpacity: 0.75,
                    radius: (eqData[i].properties.mag * 5)
                }).bindPopup("<h4> Information </h4> Place: " +
                    eqData[i].properties.place + "</br> Magnitude: " +
                    eqData[i].properties.mag + "</br> Depth: " +
                    eqData[i].geometry.coordinates[2])
            );
            var eqMarkersLayer = L.layerGroup(eqMarkers);
        };
        d3.json(tecturl).then(function (data2) {
            L.geoJSON(data2, {
                color: "orange",
                weight: 3
            }).addTo(tectLine);
        })




        createMap(eqMarkersLayer, tectLine);

    });

}
//call to execute all
createMarkers();
