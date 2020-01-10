let scienceURL = "<a href=Universities_for_Science/index.html>Click here!!!</a>"
console.log("pressed science")

let nonScienceURL = "<a href=Universities/index.html>Click here!!!</a>"

let generalURL = "<a href=Degrees_at_University/index.html>Click here!!!</a>"

let dataURL = "<a href=Data/index.html>Click here!!!</a>"

$("#my-form").submit(function(event){
  event.preventDefault();
  let textInput = $("#my-input").val();
  if (textInput === "science") {
    $("#target").html(scienceURL);
  } else if (textInput === "non-science") {
    $("#target").html(nonScienceURL);
  } else if (textInput === "all degrees") {
    $("#target").html(generalURL);
  } else if (textInput === "data") {
    $("#target").html(dataURL);
  } else {
    $("#target").html('Choose "science", "non-science", "all degrees", or "data"')
  }
})