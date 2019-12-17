// Creating map object
var myMap = L.map("map", {
  center: [38.8283, -96.5795],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// // Store API query variables
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assemble API query URL
// var url = baseURL + date + complaint + limit;

// // Grab the data with d3
// d3.json(url, function(response) {

 // Read geoJSON
 d3.json("data/test_data.geojson", function(collegeData) {  
  var collegeInfo = collegeData.features;
  // console.log(collegeInfo);
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < collegeInfo.length; i++) {
    var college = collegeInfo[i].properties;
    var collegeName = college.INSTNM;
      // console.log(collegeName);
      var collegeLat = parseFloat(college.Y);
      var collegeLon = parseFloat(college.X);
      // console.log(collegeLat, collegeLon);
      var collegeStreet = college.STREET;
      var collegeCityState = college.NMCBSA;
      var collegeZip = college.ZIP;
      //console.log(collegeStreet, collegeCityState, collegeZip);
      var totalNumberColleges = collegeInfo.length;
      // console.log(totalNumberColleges);
      var GradProgram = college.Degree;
      // console.log(GradProgram);
      var degreeRank = parseFloat(college.Rank);
      // console.log(degreeRank);

    // Set the data location property to a variable
    var location = collegeCityState;
    // console.log(location);

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([collegeLat, collegeLon])
        .bindPopup(collegeName + "<hr>" + GradProgram + "<p>Ranked: " + degreeRank + "</p>"));
    }  // ends if (location)

  }  // ends for-loop

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});  // ends d3.json  