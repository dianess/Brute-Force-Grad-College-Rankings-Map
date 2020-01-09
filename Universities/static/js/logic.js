// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});  // ends var lightmap

// Initialize all of the LayerGroups we'll be using. This is used below each time
// the code shows "layers."
var layers = {
  MBA_Business: new L.LayerGroup(),
  Law: new L.LayerGroup(),
  Medicine: new L.LayerGroup(),
  Engineering: new L.LayerGroup(),
  Nursing: new L.LayerGroup(),
  Education: new L.LayerGroup(),
  Fine_Arts: new L.LayerGroup(),
  Library_Information_Studies: new L.LayerGroup(),
  Public_Affairs: new L.LayerGroup(),
};  // ends var layers

// Create the map with starting center point and zoom level
// to display the majority of the U.S. when landing on page.
var map = L.map("map-id", {
  center: [34.8283, -96.5795], // near geographic center of the U.S., adjusted for best display
  zoom: 5,
});  // ends var map

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Layer group visible when landing on page (in other words: addTo(map))
// This puts all the markers and icons on the landing page.
var layerGroup1 = new L.LayerGroup([  
  layers.MBA_Business,
  layers.Law,
  layers.Medicine,
  layers.Engineering,
  layers.Nursing,
  layers.Education,
  layers.Fine_Arts,
  layers.Library_Information_Studies,
  layers.Public_Affairs,
]).addTo(map);

// Layer groups that can be clicked on but are not "on" when landing on page.
// This allows us to control what's clicked "on" and "off".
var layerGroupBusiness = new L.LayerGroup([
  layers.MBA_Business,
])
var layerGroupLaw = new L.LayerGroup([
  layers.Law,
])
var layerGroupMedicine = new L.LayerGroup([
  layers.Medicine,
]) 
var layerGroupEngineering = new L.LayerGroup([
  layers.Engineering,
])
var layerGroupNursing = new L.LayerGroup([
  layers.Nursing,
])
var layerGroupEducation = new L.LayerGroup([
  layers.Education,
])
var layerGroupFine_Arts = new L.LayerGroup([
  layers.Fine_Arts,
])
var layerGroupLibrary_Information_Studies = new L.LayerGroup([
  layers.Library_Information_Studies,
])
var layerGroupPublic_Affairs = new L.LayerGroup([
  layers.Public_Affairs,
])

// Create a control for the layers. This puts the name of each grad program on the map control
// and attaches the name to it's appropriate layer of information as coded above.

var layerControl = new L.control.layers(null, {
  "All": layerGroup1,
  'MBA Business  <i class="ion-stats-bars"></i>': layerGroupBusiness,
  'Law  <i class="ion-clipboard"></i>': layerGroupLaw,
  'Medicine  <i class="ion-medkit"></i>': layerGroupMedicine,
  'Engineering  <i class="ion-calculator"></i>': layerGroupEngineering,
  'Nursing  <i class="ion-thermometer"></i>': layerGroupNursing,
  'Education  <i class="ion-university"></i>': layerGroupEducation,
  'Fine Arts  <i class="ion-paintbrush"></i>': layerGroupFine_Arts,
  'Library and Information Studies  <i class="ion-information-circled"></i>': layerGroupLibrary_Information_Studies,
  'Public Affairs  <i class="ion-person-stalker"></i>': layerGroupPublic_Affairs,
}).addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  iMBA_Business: L.ExtraMarkers.icon({
    icon: "ion-stats-bars",  
    iconColor: "black",
    markerColor: "blue",  // graduation tassle color is drab (light brown)
    shape: "star"
  }),
  iLaw: L.ExtraMarkers.icon({
    icon: "ion-clipboard",
    iconColor: "black",
    markerColor: "yellow", 
    shape: "circle"
  }),
  iMedicine: L.ExtraMarkers.icon({
    icon: "ion-medkit",   // medkit
    iconColor: "black",
    markerColor: "green",  // graduation tassle color is kelly green
    shape: "penta"
  }),
  iEngineering: L.ExtraMarkers.icon({
    icon: "ion-calculator",  // calculator
    iconColor: "black",
    markerColor: "orange",  // graduation tassle color is orange
    shape: "circle"
  }),
  iNursing: L.ExtraMarkers.icon({
    icon: "ion-thermometer",
    iconColor: "black",
    markerColor: "yellow", // graduation tassle color is apricot
    shape: "penta"
  }),
  iEducation: L.ExtraMarkers.icon({
    icon: "ion-university",
    iconColor: "black",
    markerColor: 'blue', // graduation tassle color is light blue
    shape: 'penta'
  }),
  iFine_Arts: L.ExtraMarkers.icon({
    icon: "ion-paintbrush",
    iconColor: "black",
    markerColor: "red",  // graduation tassle color
    shape: "star"
  }),
  iLibrary_Information_Studies: L.ExtraMarkers.icon({
    icon: "ion-information-circled",   // information symbol
    iconColor: "black",
    markerColor: "green",
    shape: "circle"
  }),
  iPublic_Affairs: L.ExtraMarkers.icon({
    icon: "ion-person-stalker",
    iconColor: "black",
    markerColor: "green",  // graduation tassle color is peacock blue
    shape: "star"
  })
}; // ends var icons

// Read data from saved file (Source: https://catalog.data.gov/dataset/postsecondary-school-location-2016-17)
d3.json("data/universityrankings.geojson", function(collegeData) {  
    // Put data into a variable
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
      console.log(college.Degree);  // logged Law 13 times, Business 14, Engineering 10
      if (gradProgram == "Business") {
            //console.log(collegeName);  // logs all the universities who are ranked in business
          //Option 2 //filteredBusiness = [collegeName + "<p>" + collegeCity + ", " + collegeState + "</p>"]
        filteredBusiness = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
            //console.log(filteredBusiness);
          // Option 2 //L.marker([collegeLat, collegeLon], {icon: icons.iMBA_Business}).addTo(layers.MBA_Business).bindPopup("Business: " + "Ranked " + degreeRank + "<hr>" + filteredBusiness)
          L.marker([collegeLat, collegeLon], {icon: icons.iMBA_Business}).addTo(layers.MBA_Business).bindPopup("Business<hr>" + filteredBusiness)
        };  // ends filter for Business 

        // Law
        if (gradProgram == "Law") {
        filteredLaw = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iLaw}).addTo(layers.Law).bindPopup("Law<hr>" + filteredLaw)
      };  // ends filter for Law

        // Medicine   (Note that we're using the Primary Care program, not Research)
      if (gradProgram == "Medicine") {
        filteredMedicine = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iMedicine}).addTo(layers.Medicine).bindPopup("Medicine<hr>" + filteredMedicine)
      };  // ends filter for Medicine

        // Engineering
      if (gradProgram == "Engineering") {
        filteredEngineering = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
          //console.log(filteredEngineering);
        L.marker([collegeLat, collegeLon], {icon: icons.iEngineering}).addTo(layers.Engineering).bindPopup("Engineering<hr>" + filteredEngineering)
      };  // ends filter for Engineering

       // Nursing
      if (gradProgram == "Nursing") {
        filteredNursing = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iNursing}).addTo(layers.Nursing).bindPopup("Nursing<hr>" + filteredNursing)
      };  // ends filter for Nursing

        // Education
      if (gradProgram == "Education") {
        filteredEducation = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
        L.marker([collegeLat, collegeLon], {icon: icons.iEducation}).addTo(layers.Education).bindPopup("Education<hr>" + filteredEducation)
      };  // ends filter for Education

        // Fine Arts
      if (gradProgram == "Fine Arts") {
      filteredFineArts = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
      L.marker([collegeLat, collegeLon], {icon: icons.iFine_Arts}).addTo(layers.Fine_Arts).bindPopup("Fine Arts<hr>" + filteredFineArts)
    };  // ends filter for Fine Arts

      // Library and Information Studies
    if (gradProgram == "Library and Information Studies") {
      filteredLibraryInformationStudies = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
      L.marker([collegeLat, collegeLon], {icon: icons.iLibrary_Information_Studies}).addTo(layers.Library_Information_Studies).bindPopup("Library and Information Studies<hr>" + filteredLibraryInformationStudies)
    };  // ends filter for Library and Information Studies

       // Public Affairs
    if (gradProgram == "Public Affairs") {
    filteredPublicAffairs = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
    L.marker([collegeLat, collegeLon], {icon: icons.iPublic_Affairs}).addTo(layers.Public_Affairs).bindPopup("Public Affairs<hr>" + filteredPublicAffairs)
    };  // ends filter for Public Affairs

    };  // ends for-loop
});  // ends d3.json

