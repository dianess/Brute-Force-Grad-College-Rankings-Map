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
  center: [38.8283, -95.5795], // Geographic Center of the U.S.
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
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  Engineering: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  Nursing: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Education: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  Fine_Arts: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  Health: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  Library_Information_Studies: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  Public_Affairs: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  Science: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  Social_Sciences_Humanities: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};

// Read data from saved file (Source: https://catalog.data.gov/dataset/postsecondary-school-location-2016-17)
d3.json("data/Postsecondary_School_Location_201617.geojson", function(collegeData) {
    // Put data into a variable
    var collegeInfo = collegeData.features;
    console.log(collegeInfo);
    // var stationStatus = statusRes.data.stations;
    // var stationInfo = infoRes.data.stations;

    // Create an object to keep track of the number of markers in each layer
    var stationCount = {
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

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var stationStatusCode;

    // Loop through the colleges
    for (var i = 0; i < collegeInfo.length; i++) {

      var college = collegeInfo[i].properties;
      console.log(college);
      var collegeName = college.INSTNM;
      console.log(collegeName);
      var collegeLat = college.LAT;
      var collegeLon = college.LON;
      console.log(collegeLat, collegeLon);
      var collegeStreet = college.STREET;
      var collegeCityState = college.NMCBSA;
      var collegeZip = college.ZIP;
      console.log(collegeStreet, collegeCityState, collegeZip);

      // Create a new station object with properties of both station objects
      var college = Object.assign({}, collegeInfo[i]); //, stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "MBA Business";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "Law";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "Medicine";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "Engineering";
      }
      // Otherwise the station is normal
      else if (!station.num_bikes_available) {
        stationStatusCode = "Nursing";
      }  
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "Education";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "Fine Arts";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "Health";
      }
      // Otherwise the station is normal
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "Library and Information Studies";  
      }
      // Otherwise the station is normal
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "Public Affairs";  
      }
      // Otherwise the station is normal
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "Science";  
      }
      // Otherwise the station is normal
      else {
        stationStatusCode = "Social Sciences and Humanities";  
      }

      // Update the station count
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([college.lat, station.lon], {
        icon: icons[stationStatusCode]
      });  // ends newMarker

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }  // ends for loop

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });  // ends d3.json

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(time, stationCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
    "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
    "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
    "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
