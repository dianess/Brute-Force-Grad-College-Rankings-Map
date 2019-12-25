// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  Biological: new L.LayerGroup(),
  Chemistry: new L.LayerGroup(),
  Computer: new L.LayerGroup(),
  Earth: new L.LayerGroup(),
  Math: new L.LayerGroup(),
  Physics: new L.LayerGroup(),
  Statistics: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [38.8283, -96.5795], // Geographic Center of the U.S.
  zoom: 5,
  layers: [
    layers.Biological,
    layers.Chemistry,
    layers.Computer,
    layers.Earth,
    layers.Math,
    layers.Physics,
    layers.Statistics,
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Biological Sciences": layers.Biological,
  "Chemistry": layers.Chemistry,
  "Computer Science": layers.Computer,
  "Earth Sciences": layers.Earth,
  "Mathematics": layers.Math,
  "Physics": layers.Physics,
  "Statistics": layers.Statistics,
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

// ** Marker color is not working right now ** 12/20/19 4:30 PM
// Initialize an object containing icons for each layer group
var icons = {
  iBiological: L.ExtraMarkers.icon({
    icon: "ion-stats-bars",  //want to use ion-stats
    iconColor: "black",
    markerColor: "darkred",  // graduation tassle color is drab (light brown)
    shape: "star"
  }),
  iChemistry: L.ExtraMarkers.icon({
    icon: "ion-clipboard",
    iconColor: "black",
    markerColor: "purple", // graduation tassle color
    shape: "circle"
  }),
  iComputer: L.ExtraMarkers.icon({
    icon: "ion-medkit",   // medkit
    iconColor: "black",
    markerColor: "green",  // graduation tassle color is kelly green
    shape: "penta"
  }),
  iEarth: L.ExtraMarkers.icon({
    icon: "ion-calculator",  // calculator
    iconColor: "black",
    markerColor: "orange",  // graduation tassle color
    shape: "circle"
  }),
  iMath: L.ExtraMarkers.icon({
    icon: "ion-thermometer",
    iconColor: "black",
    markerColor: "red", // graduation tassle color
    shape: "circle"
  }),
  iPhysics: L.ExtraMarkers.icon({
    icon: "ion-university",
    iconColor: "black",
    markerColor: 'blue', // graduation tassle color is light blue
    shape: 'star'
  }),
  iStatistics: L.ExtraMarkers.icon({
    icon: "ion-paintbrush",
    iconColor: "black",
    markerColor: "darkpurple",  // graduation tassle color
    shape: "circle"
  })
  // iAll: L.ExtraMarkers.icon({
  //   icon: "ion-school",  // school (grad cap)
  //   iconColor: "white",
  //   markerColor: "green",
  //   shape: "circle"
  // })
};

// Read data from saved file (Source: https://catalog.data.gov/dataset/postsecondary-school-location-2016-17)
//d3.json("data/Universities.geojson", function(collegeData) {
d3.json("data/test_data.geojson", function(collegeData) {  
    // Put data into a variable
        //collegeFeatures(collegeData.features);
    var collegeInfo = collegeData.features;
        // console.log(collegeInfo);

    // ? Create an object to keep track of the number of markers in each layer
    var gradScienceCount = {
      Biological: 0,
      Chemistry: 0,
      Computer: 0,
      Earth: 0,
      Math: 0,
      Physics: 0,
      Statistics: 0
    };
    // console.log(gradSchoolCount.MBA_Business);  // returns 0 (zero)

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
        L.marker([collegeLat, collegeLon], {icon: icons.iChemistry}).addTo(layers.Chemistry).bindPopup("Chemistryhr>" + filteredChemistry)
      };  // ends filter for Chemistry

        // Computer Science
      if (gradProgram == "Computer Sciences") {
        filteredComputer = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iComputer}).addTo(layers.Computer).bindPopup("Computer Sciencehr>" + filteredComputer)
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
        L.marker([collegeLat, collegeLon], {icon: icons.iPhysics}).addTo(layers.Physics).bindPopup("EPhysics<hr>" + filteredPhysics)
      };  // ends filter for Physics

        // Statistics
      if (gradProgram == "Statistics") {
      filteredStatistics = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
      L.marker([collegeLat, collegeLon], {icon: icons.iStatistics}).addTo(layers.Statistics).bindPopup("Statistics<hr>" + filteredStatistics)
    };  // ends filter for Statistics

    };  // ends for-loop
});  // ends d3.json

    //collegeFeatures(collegeData.features);

      //function collegeFeatures(collegeList) {

        // Define a function to run once for each feature in the features array
        // Give each feature a pop-up box describing the name & address of each college
        // function onEachFeature(feature, layer) {
        //   layer.bindPopup('<div align="center">' + "<h3>" + "College: "  + collegeName + "</h3><hr><p>" + collegeStreet + "</p>" +
        //     "<p>" + collegeCity + ", " + collegeState + "</p>" + "<p>" + collegeZip + "</p></div>");
        //     console.log(collegeName);
        // }  //ends function onEachFeature
      
      // Create a new marker with the appropriate icon and coordinates
      // var newMarker = L.marker([collegeLat, collegeLon], {
      //   icon: icons[gradSchoolCount]
      // });  // ends newMarker
      // console.log("added a new marker??");  //this line does not run in the code!!! I think because collegeFeatures is never called

      // Add the new marker to the appropriate layer
      // newMarker.addTo(layers[gradSchoolCount])   // throws error - Cannot read property 'addLayer' of undefined (ie fix gradSchoolcount)
      // .bindPopup(collegeName + "Graduate Program: ");

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      //newMarker.bindPopup(collegeName + "Graduate Program: ");  // + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
 
    //}      // ends collegeFeatures

    // Call the updateLegend function, which will... update the legend!
    // updateLegend(gradProgram);  // goes with section below
 

// // // Update the legend's innerHTML with the information for each grad program chosen
// function updateLegend(gradProgram) {
//   //console.log(gradProgram);  // undefined until we get the right data
//   document.querySelector(".legend").innerHTML = [
//     //"<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='business'>MBA Business: " + gradSchoolCount.MBA_business + "</p>",
//     "<p class='law'>Law: " + gradSchoolCount.Law + "</p>",
//     "<p class='medicine'>Medicine: " + gradSchoolCount.Medicine + "</p>",
//     "<p class='engineering'>Engineering: " + gradSchoolCount.Engineering + "</p>",
//     "<p class='nursing'>Nursing: " + gradSchoolCount.Nursing + "</p>",
//     "<p class='education'>Education: " + gradSchoolCount.Education + "</p>",
//     "<p class='fineArts'>Fine Arts: " + gradSchoolCount.Fine_Arts + "</p>",
//     "<p class='information'>Library and Information Studies: " + gradSchoolCount.Library_Information_Studies + "</p>",
//     "<p class='publicAffairs'>Public Affairs: " + gradSchoolCount.Public_Affairs + "</p>",
//     "<p class='science'>Science: " + gradSchoolCount.Science + "</p>"
//   ].join("");
// }  // ends function updateLegend
