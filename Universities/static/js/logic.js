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
  iMBA_Business: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "brown",  // graduation tassle color is drab (light brown)
    shape: "star"
  }),
  iLaw: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "purple", // graduation tassle color
    shape: "circle"
  }),
  iMedicine: L.ExtraMarkers.icon({
    icon: "ion-medkit",   // medkit
    iconColor: "white",
    markerColor: "green",  // graduation tassle color is kelly green
    shape: "penta"
  }),
  iEngineering: L.ExtraMarkers.icon({
    icon: "ion-calculator",  // calculator
    iconColor: "white",
    markerColor: "orange",  // graduation tassle color
    shape: "circle"
  }),
  iNursing: L.ExtraMarkers.icon({
    icon: "ion-pulse",  // pulse
    iconColor: "white",
    markerColor: "apricot", // graduation tassle color
    shape: "circle"
  }),
  iEducation: L.ExtraMarkers.icon({
    icon: "ion-paper",   // paper
    iconColor: "white",
    markerColor: "blue", // graduation tassle color is light blue
    shape: "star"
  }),
  iFine_Arts: L.ExtraMarkers.icon({
    icon: "ion-photos",  // check how to use "md-photos"
    iconColor: "white",
    markerColor: "brown",  // graduation tassle color
    shape: "circle"
  }),
  iHealth: L.ExtraMarkers.icon({
    icon: "ion-nutrition",   // nutrition (carrot)
    iconColor: "white",
    markerColor: "salmon", // graduation tassle color for public health
    shape: "penta"
  }),
  iLibrary_Information_Studies: L.ExtraMarkers.icon({
    icon: "ion-information-circle",   // information symbol
    iconColor: "white",
    markerColor: "lemon",   // graduation tassle color
    shape: "circle"
  }),
  iPublic_Affairs: L.ExtraMarkers.icon({
    icon: "ion-megaphone",    // megaphone
    iconColor: "white",
    markerColor: "blue",  // graduation tassle color is peacock blue
    shape: "circle"
  }),
  iScience: L.ExtraMarkers.icon({
    icon: "ion-flask",  // flask
    iconColor: "white",
    markerColor: "yellow",  // graduation tassle color is golden yellow
    shape: "circle"
  }),
  iSocial_Sciences_Humanities: L.ExtraMarkers.icon({
    icon: "ion-people",  // people
    iconColor: "white",
    markerColor: "white",  // graduation tassle color for humanities
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
      Health: 0,
      Library_Information_Studies: 0,
      Public_Affairs: 0,
      Science: 0,
      Social_Sciences_Humanities: 0
    };
    // console.log(gradSchoolCount.MBA_Business);  // returns 0 (zero)

    // Loop through the colleges and put key data into variables to be used later
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
      //var totalNumberColleges = collegeInfo.length
          //console.log(totalNumberColleges); 
      var gradProgram = college.Degree;  
      var degreeRank = college.Rank;
      
      // Filter the data for each Graduate Program layer
        // Business
      console.log(college.Degree);  // logged Law 13 times, Business 14, Engineering 10
      if (gradProgram == "Business") {
            //console.log(collegeName);  // logs all the universities who are ranked in business
        filteredBusiness = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
            //console.log(filteredBusiness);
        L.marker(([collegeLat, collegeLon]), {
            icons:icons.iMBA_Business
        })
        .addTo(layers.MBA_Business)
      };  // ends filter for Business 

        // Law
        if (gradProgram == "Law") {
        filteredLaw = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
        L.marker(([collegeLat, collegeLon]), {
          icons:icons.iLaw
        })
        .addTo(layers.Law) 
      };  // ends filter for Law

      // Medicine
      if (gradProgram == "Medicine") {
        filteredMedicine = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
        L.marker(([collegeLat, collegeLon]), {
          icons:icons.iMedicine
        })
        .addTo(layers.Medicine)
      };  // ends filter for Medicine

        // Engineering
      if (gradProgram == "Engineering") {
        filteredEngineering = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
        L.marker(([collegeLat, collegeLon]), {
          icons:icons.iEngineering
        })
        .addTo(layers.Engineering)
        // console.log(filteredEngineering); //see comment on Law above
      };  // ends filter for Engineering

       // Nursing
      if (gradProgram == "Nursing") {
        filteredNursing = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
        L.marker(([collegeLat, collegeLon]), {
          icons:icons.iNursing
        })
        .addTo(layers.Nursing)
      };  // ends filter for Nursing

        // Education
      if (gradProgram == "Education") {
        filteredEducation = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
        L.marker(([collegeLat, collegeLon]), {
          icons:icons.iEducation
        })
        .addTo(layers.Education)
      };  // ends filter for Education

        // Fine Arts
      if (gradProgram == "Fine Arts") {
      filteredFineArts = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
      L.marker(([collegeLat, collegeLon]), {
        icons:icons.iFine_Arts
      })
      .addTo(layers.Fine_Arts)
    };  // ends filter for Fine Arts

      // Health
    if (gradProgram == "Health") {
      filteredHealth = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
      L.marker(([collegeLat, collegeLon]), {
        icons:icons.iHealth
      })
      .addTo(layers.Health)
    };  // ends filter for Health

      // Library and Information Studies
    if (gradProgram == "Library and Information Studies") {
      filteredLibraryInformationStudies = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
      L.marker(([collegeLat, collegeLon]), {
        icons:icons.iLibrary_Information_Studies
      })
      .addTo(layers.Library_Information_Studies)
    };  // ends filter for Library and Information Studies

       // Public_Affairs
    if (gradProgram == "Public Affairs") {
    filteredPublicAffairs = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
    L.marker(([collegeLat, collegeLon]), {
      icons:icons.iPublic_Affairs
    })
    .addTo(layers.Public_Affairs)
    };  // ends filter for Public Affairs

     // Science
    if (gradProgram == "Science") {
    filteredScience = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
    L.marker(([collegeLat, collegeLon]), {
      icons:icons.iScience
    })
    .addTo(layers.Science)
    };  // ends filter for Science

      // Social Sciences and Humanities
    if (gradProgram == "Social Sciences and Humanities") {
      filteredSocialSciencesHumanities = [collegeName, collegeLat, collegeLon, gradProgram, degreeRank]
      L.marker(([collegeLat, collegeLon]), {
        icons:icons.iSocial_Sciences_Humanities
      })
      .addTo(layers.Social_Sciences_Humanities)
    };  // ends filter for Social Sciences and Humanities


      function collegeFeatures(collegeInfo) {

        // Define a function to run once for each feature in the features array
        // Give each feature a pop-up box describing the name & address of each college
        function onEachFeature(college, layer) {
          layer.bindPopup('<div align="center">' + "<h3>" + "College: "  + collegeName + "</h3><hr><p>" + collegeStreet + "</p>" +
            "<p>" + collegeCityState + "</p>" + "<p>" + collegeZip + "</p></div>");
            console.log(collegeName);
        }  //ends function onEachFeature
        
        // Create a GeoJSON layer containing the features array on the collegeInfo object
        // Run the onEachFeature function once for each piece of data in the array
        var collegeStuff = L.geoJSON(collegeInfo, {
          onEachFeature: onEachFeature,
      
          // Works with the function style above and to change the default markers to circles
          // with specific colors
          pointToLayer: function (layer, latlng) {
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
      newMarker.bindPopup(collegeName + "Graduate Program: ");  // + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
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
//     "<p class='health'>Health: " + gradSchoolCount.Health + "</p>",
//     "<p class='information'>Library and Information Studies: " + gradSchoolCount.Library_Information_Studies + "</p>",
//     "<p class='publicAffairs'>Public Affairs: " + gradSchoolCount.Public_Affairs + "</p>",
//     "<p class='science'>Science: " + gradSchoolCount.Science + "</p>",
//     "<p class='humanities'>Social Studies and Humanities: " + gradSchoolCount.Social_Sciences_Humanities + "</p>"
//   ].join("");
// }  // ends function updateLegend
