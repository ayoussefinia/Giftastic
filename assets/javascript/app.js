console.log("connected");

topics= ["octopus","cuttlefish", "fennec fox", "armadillo", "gerenuk", "babirusa", "blob fish", "spider crab", "manatee", "river dolphin"];

for(i=0; i<= topics.length -1; i++) {
  var button = $("<button>");
  button.addClass("gif-button hvr-ripple-out");
  button.text(topics[i]);
  $(".el-three").append(button);
}

// var subject =$("#movie-input").val();

// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=GScwovCo30gmvtviTDU5g1XUX9G1aC3y&limit=5";

$(document).on("click", ".gif-button", getGify);


function getGify(event) {
  var subject = $(this).text();
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=GScwovCo30gmvtviTDU5g1XUX9G1aC3y&limit=5";
  
  $.ajax({
  url: queryURL,
  method: "GET"
   }).then(function(response) {
     console.log(response);
   })
  }
