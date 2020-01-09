// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});  // ends var lightmap

// Initialize all of the LayerGroups we'll be using
var layers = {
  Biological: new L.LayerGroup(),
  Chemistry: new L.LayerGroup(),
  Computer: new L.LayerGroup(),
  Earth: new L.LayerGroup(),
  Math: new L.LayerGroup(),
  Physics: new L.LayerGroup(),
};

// // Create the map with starting center point and zoom level
// to display the majority of the U.S. when landing on page.
var map = L.map("map-id", {
  center: [34.8283, -96.5795], // near Geographic Center of the U.S., adjusted slightly for best display
  zoom: 5,
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Layer group visible when landing on page (in other words: addTo(map))
// This puts all the markers and icons on the landing page.
var layerGroup1 = new L.LayerGroup([  
  layers.Biological,
  layers.Chemistry,
  layers.Computer,
  layers.Earth,
  layers.Math,
  layers.Physics,
]).addTo(map);

// Layer groups that can be clicked on but are not "on" when landing on page.
// This allows us to control what's clicked "on" and "off".
var layerGroupBiological = new L.LayerGroup([
  layers.Biological,
])
var layerGroupChemistry = new L.LayerGroup([
  layers.Chemistry,
])
var layerGroupComputer = new L.LayerGroup([
  layers.Computer,
]) 
var layerGroupEarth = new L.LayerGroup([
  layers.Earth,
])
var layerGroupMath = new L.LayerGroup([
  layers.Math,
])
var layerGroupPhysics = new L.LayerGroup([
  layers.Physics,
])

// Create a control for the layers. This puts the name of each grad program on the map control
// and attaches the name to it's appropriate layer of information as coded above.

var layerControl = new L.control.layers(null, {
  "All Science": layerGroup1,
  'Biological Sciences  <i class="ion-usb" color="red"></i>': layerGroupBiological,
  'Chemistry  <i class="ion-paintbucket"></i>': layerGroupChemistry,
  'Computer Science  <i class="ion-monitor"></i>': layerGroupComputer,
  'Earth Sciences  <i class="ion-planet"></i>': layerGroupEarth,
  'Mathematics  <i class="ion-connection-bars"></i>': layerGroupMath,
  'Physics  <i class="ion-nuclear"></i>': layerGroupPhysics,
}).addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  iBiological: L.ExtraMarkers.icon({
    icon: "ion-usb",  
    iconColor: "black",
    markerColor: "red",  
    shape: "star"
  }),
  iChemistry: L.ExtraMarkers.icon({
    icon: "ion-paintbucket",
    iconColor: "black",
    markerColor: "green",
    shape: "circle"
  }),
  iComputer: L.ExtraMarkers.icon({
    icon: "ion-monitor",   
    iconColor: "black",
    markerColor: "green",  
    shape: "penta"
  }),
  iEarth: L.ExtraMarkers.icon({
    icon: "ion-planet",  
    iconColor: "black",
    markerColor: "orange",  
    shape: "circle"
  }),
  iMath: L.ExtraMarkers.icon({
    icon: "ion-connection-bars",
    iconColor: "black",
    markerColor: "blue", 
    shape: "circle"
  }),
  iPhysics: L.ExtraMarkers.icon({
    icon: "ion-nuclear",
    iconColor: "black",
    markerColor: 'blue', 
    shape: 'star'
  })
};

// Read data from saved file (Source: https://catalog.data.gov/dataset/postsecondary-school-location-2016-17)
//d3.json("data/Universities.geojson", function(collegeData) {
d3.json("data/scienceranking.geojson", function(collegeData) {  
    // Put data into a variable
        //collegeFeatures(collegeData.features);
    var collegeInfo = collegeData.features;
        // console.log(collegeInfo);

    // Loop through the colleges and put key data into variables to be used later
    for (var i = 0; i < collegeInfo.length; i++) {

      var college = collegeInfo[i].properties;
          //console.log(college);
      var collegeName = college.INSTNM;
        // console.log(collegeName); prints each college name without needing [i] b'c in the loop
      var collegeLat = parseFloat(college.Y);
      var collegeLon = parseFloat(college.X);
          // console.log(collegeLat, collegeLon);
      var collegeStreet = college.STREET;
      var collegeCity = college.CITY;
      var collegeState = college.STATE;
      //var collegeCityState = college.NMCBSA;
      var collegeZip = college.ZIP;
          //console.log(collegeStreet, collegeCityState, collegeZip);
      //var totalNumberColleges = collegeInfo.length
          //console.log(totalNumberColleges); 
      var gradProgram = college.Degree;  
      var degreeRank = college.Rank;
      
      // Filter the data for each Graduate Program layer
        // Business
      console.log(college.Degree);
      if (gradProgram == "Biological Sciences") {
        filteredBiological = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iBiological}).addTo(layers.Biological).bindPopup("Biological Sciences<hr>" + filteredBiological)
      };  // ends filter for Biological Sciences

        // Chemistry
        if (gradProgram == "Chemistry") {
        filteredChemistry = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iChemistry}).addTo(layers.Chemistry).bindPopup("Chemistry<hr>" + filteredChemistry)
      };  // ends filter for Chemistry

        // Computer Science
      if (gradProgram == "Computer Sciences") {
        filteredComputer = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iComputer}).addTo(layers.Computer).bindPopup("Computer Science<hr>" + filteredComputer)
      };  // ends filter for Computer Science

        // Earth Sciences
      if (gradProgram == "Earth Sciences") {
        filteredEarth = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iEarth}).addTo(layers.Earth).bindPopup("Earth Sciences<hr>" + filteredEarth)
      };  // ends filter for Earth Sciences

       // Math
      if (gradProgram == "Mathematics") {
        filteredMath = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iMath}).addTo(layers.Math).bindPopup("Mathematics<hr>" + filteredMath)
      };  // ends filter for Math

        // Physics
      if (gradProgram == "Physics") {
        filteredPhysics = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iPhysics}).addTo(layers.Physics).bindPopup("Physics<hr>" + filteredPhysics)
      };  // ends filter for Physics

    };  // ends for-loop
});  // ends d3.json

