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
  Library_Information_Studies: new L.LayerGroup(),
  Public_Affairs: new L.LayerGroup(),
  Science: new L.LayerGroup(),
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
    layers.Library_Information_Studies,
    layers.Public_Affairs,
    layers.Science,
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
  "Library and Information Studies": layers.Library_Information_Studies,
  "Public Affairs": layers.Public_Affairs,
  "Science": layers.Science,
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
  iMBA_Business: L.ExtraMarkers.icon({
    icon: "ios-stats",
    iconColor: "black",
    markerColor: "brown",  // graduation tassle color is drab (light brown)
    shape: "star"
  }),
  iLaw: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "black",
    markerColor: "purple", // graduation tassle color
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
    markerColor: "orange",  // graduation tassle color
    shape: "circle"
  }),
  iNursing: L.ExtraMarkers.icon({
    icon: "ion-pulse",  // pulse
    iconColor: "black",
    markerColor: "apricot", // graduation tassle color
    shape: "circle"
  }),
  iEducation: L.ExtraMarkers.icon({
    icon: "ion-paper",   // paper
    iconColor: "black",
    markerColor: "blue", // graduation tassle color is light blue
    shape: "star"
  }),
  iFine_Arts: L.ExtraMarkers.icon({
    icon: "ion-photos",  // check how to use "md-photos"
    iconColor: "black",
    markerColor: "brown",  // graduation tassle color
    shape: "circle"
  }),
  iLibrary_Information_Studies: L.ExtraMarkers.icon({
    icon: "ion-information-circle",   // information symbol
    iconColor: "black",
    markerColor: "lemon",   // graduation tassle color
    shape: "circle"
  }),
  iPublic_Affairs: L.ExtraMarkers.icon({
    icon: "ion-megaphone",    // megaphone
    iconColor: "black",
    markerColor: "blue",  // graduation tassle color is peacock blue
    shape: "circle"
  }),
  iScience: L.ExtraMarkers.icon({
    icon: "ion-flask-outline",  // flask
    iconColor: "black",
    markerColor: "yellow",  // graduation tassle color is golden yellow
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
    var gradSchoolCount = {
      MBA_Business: 0,
      Law: 0,
      Medicine: 0,
      Engineering: 0,
      Nursing: 0,
      Education: 0,
      Fine_Arts: 0,
      Library_Information_Studies: 0,
      Public_Affairs: 0,
      Science: 0
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
      console.log(college.Degree);  // logged Law 13 times, Business 14, Engineering 10
      if (gradProgram == "Business") {
            //console.log(collegeName);  // logs all the universities who are ranked in business
        filteredBusiness = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
            //console.log(filteredBusiness);
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
        L.marker([collegeLat, collegeLon], {icon: icons.iMedicine}).addTo(layers.Medicine).bindPopup("Medicine: " + filteredMedicine)
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

     // Science
    if (gradProgram == "Science") {
    filteredScience = [collegeName + "<p>Ranked: " + degreeRank + "</p>"]
    L.marker([collegeLat, collegeLon], {icon: icons.iScience}).addTo(layers.Science).bindPopup("Science<hr>" + filteredScience)
    };  // ends filter for Science

    //collegeFeatures(collegeData.features);

      function collegeFeatures(collegeList) {

        // Define a function to run once for each feature in the features array
        // Give each feature a pop-up box describing the name & address of each college
        function onEachFeature(feature, layer) {
          layer.bindPopup('<div align="center">' + "<h3>" + "College: "  + collegeName + "</h3><hr><p>" + collegeStreet + "</p>" +
            "<p>" + collegeCity + ", " + collegeState + "</p>" + "<p>" + collegeZip + "</p></div>");
            console.log(collegeName);
        }  //ends function onEachFeature
      
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([collegeLat, collegeLon], {
        icon: icons[gradSchoolCount]
      });  // ends newMarker
      console.log("added a new marker??");  //this line does not run in the code!!! I think because collegeFeatures is never called

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[gradSchoolCount])   // throws error - Cannot read property 'addLayer' of undefined (ie fix gradSchoolcount)
      .bindPopup(collegeName + "Graduate Program: ");

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      //newMarker.bindPopup(collegeName + "Graduate Program: ");  // + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
 
    }      // ends collegeFeatures
    };  // ends for-loop

    // Call the updateLegend function, which will... update the legend!
    // updateLegend(gradProgram);  // goes with section below
  });  // ends d3.json

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
