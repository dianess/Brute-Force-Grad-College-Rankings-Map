// Creating map object
var myMap = L.map("map", {
  center: [34.8283, -96.5795], // near geographic center of U.S., adjusted for best display
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

 // Read geoJSON
 d3.json("data/allrankings.geojson", function(collegeData) {  
  var collegeInfo = collegeData.features;
    //console.log(collegeInfo);
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < collegeInfo.length; i++) {
    var college = collegeInfo[i].properties;
    var collegeName = college.INSTNM;
        //console.log(collegeName);
      var collegeLat = parseFloat(college.Y);
      var collegeLon = parseFloat(college.X);
        // console.log(collegeLat, collegeLon);
      var GradProgram = college.Degree;
        // console.log(GradProgram);
      var degreeRank = parseFloat(college.Rank);
        // console.log(degreeRank);

    // Set the data location property to a variable
    var location = collegeLat;   // Given how we use this below, might want to us CollegeLat, CollegeLon
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