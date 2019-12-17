// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  MBA_Business: new L.LayerGroup(),
  Law: new L.LayerGroup(),
  Medicine: new L.LayerGroup(),
  Engineering: new L.LayerGroup(),
  Nursing: new L.LayerGroup(),
  Education: new L.LayerGroup(),
  Fine_Arts: new L.LayerGroup(),
  Health: new L.LayerGroup(),
  Library_Information_Studies: new L.LayerGroup(),
  Public_Affairs: new L.LayerGroup(),
  Science: new L.LayerGroup(),
  Social_Sciences_Humanities: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [38.8283, -96.5795], // Geographic Center of the U.S.
  zoom: 5,
  layers: [
    layers.MBA_Business,
    layers.Law,
    layers.Medicine,
    layers.Engineering,
    layers.Nursing,
    layers.Education,
    layers.Fine_Arts,
    layers.Health,
    layers.Library_Information_Studies,
    layers.Public_Affairs,
    layers.Science,
    layers.Social_Sciences_Humanities
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "MBA Business": layers.MBA_Business,
  "Law": layers.Law,
  "Medicine": layers.Medicine,
  "Engineering": layers.Engineering,
  "Nursing": layers.Nursing,
  "Education": layers.Education,
  "Fine Arts": layers.Fine_Arts,
  "Health": layers.Health,
  "Library and Information Studies": layers.Library_Information_Studies,
  "Public Affairs": layers.Public_Affairs,
  "Science": layers.Science,
  "Social Sciences and Humanities": layers.Social_Sciences_Humanities
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  MBA_Business: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  Law: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  Medicine: L.ExtraMarkers.icon({
    icon: "ion-medkit",   // medkit
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  Engineering: L.ExtraMarkers.icon({
    icon: "ion-calculator",  // calculator
    iconColor: "white",
    markerColor: "brown",
    shape: "circle"
  }),
  Nursing: L.ExtraMarkers.icon({
    icon: "ion-pulse",  // pulse
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Education: L.ExtraMarkers.icon({
    icon: "ion-paper",   // paper
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  Fine_Arts: L.ExtraMarkers.icon({
    icon: "ion-photos",  // check how to use "md-photos"
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  Health: L.ExtraMarkers.icon({
    icon: "ion-nutrition",   // nutrition (carrot)
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  Library_Information_Studies: L.ExtraMarkers.icon({
    icon: "ion-information-circle",   // information symbol
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  Public_Affairs: L.ExtraMarkers.icon({
    icon: "ion-megaphone",    // megaphone
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Science: L.ExtraMarkers.icon({
    icon: "ion-flask",  // flask
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Social_Sciences_Humanities: L.ExtraMarkers.icon({
    icon: "ion-people",  // people
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
  // All: L.ExtraMarkers.icon({
  //   icon: "ion-school",  // school (grad cap)
  //   iconColor: "white",
  //   markerColor: "green",
  //   shape: "circle"
  // })
};

// Read data from saved file (Source: https://catalog.data.gov/dataset/postsecondary-school-location-2016-17)
d3.json("data/Universities.geojson", function(collegeData) {
    // Put data into a variable
    //collegeFeatures(collegeData.features);
    var collegeInfo = collegeData.features;
    // console.log(collegeInfo);
    // var markers = L.markerClusterGroup(); // error L.markerClusterGroup not a function

    // ? Create an object to keep track of the number of markers in each layer
    var gradSchoolCount = {
      MBA_Business: 0,
      Law: 0,
      Medicine: 0,
      Engineering: 0,
      Nursing: 0,
      Education: 0,
      Fine_Arts: 0,
      Health: 0,
      Library_Information_Studies: 0,
      Public_Affairs: 0,
      Science: 0,
      Social_Sciences_Humanities: 0
    };

    // Loop through the colleges
    for (var i = 0; i < collegeInfo.length; i++) {

      var college = collegeInfo[i].properties;
      //console.log(college);
      var collegeName = college.INSTNM;
      // console.log(collegeName);
      var collegeLat = parseFloat(college.Y);
      var collegeLon = parseFloat(college.X);
      // console.log(collegeLat, collegeLon);
      var collegeStreet = college.STREET;
      var collegeCityState = college.NMCBSA;
      var collegeZip = college.ZIP;
      //console.log(collegeStreet, collegeCityState, collegeZip);
      var totalNumberColleges = collegeInfo.length
      //console.log(totalNumberColleges);   // = 7521

      // Set the data location property to a variable
      var location = collegeCityState;   // Given how we use this below, might want to us CollegeLat, CollegeLon
      // console.log(location);

      // Check for location property
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        // markers.addLayer(L.marker([collegeLat, collegeLon])    // ** have to fix L.markerClusterGroup first
        //   .bindPopup(collegeName)); // + "<hr>" + GradProgram + "<p>Ranked: " + degreeRank + "</p>"));
      }  // ends if (location)

    //}  // ends for-loop

    // Add our marker cluster layer to the map
    // myMap.addLayer(markers);  // ** have to fix "markers first"

      function collegeFeatures(collegeInfo) {

        // Define a function to run once for each feature in the features array
        // Give each feature a pop-up box describing the name & address of each college
        function onEachFeature(feature, layer) {
          layer.bindPopup('<div align="center">' + "<h3>" + "College: "  + collegeName + "</h3><hr><p>" + collegeStreet + "</p>" +
            "<p>" + collegeCityState + "</p>" + "<p>" + collegeZip + "</p></div>");
        }  //ends function onEachFeature
        
        // Create a GeoJSON layer containing the features array on the collegeInfo object
        // Run the onEachFeature function once for each piece of data in the array
        var collegeStuff = L.geoJSON(collegeInfo, {
          onEachFeature: onEachFeature,
      
          // Works with the function style above and to change the default markers to circles
          // with specific colors
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style(feature));
          },  // ends pointToLayer
      
        });  //ends var collegeStuff
      
        // Sending our collegeStuff layer to the createMap function
        createMap(collegeStuff);
      
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([collegeLat, collegeLon], {
        icon: icons[gradSchoolCount]
      });  // ends newMarker

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[gradSchoolCount]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(collegeName + "<br> Ranking: ");  // + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }      // ends collegeFeatures
    };  // ends for-loop

    // Call the updateLegend function, which will... update the legend!
    //updateLegend(updatedAt, stationCount);
  });  // ends d3.json

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//    "<p class='business'>MBA Business: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='law'>Law: " + stationCount.COMING_SOON + "</p>",
//     "<p class='medicine'>Medicine: " + stationCount.EMPTY + "</p>",
//     "<p class='engineering'>Engineering: " + stationCount.LOW + "</p>",
//     "<p class='nursing'>Nursing: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
