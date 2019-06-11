console.log("connected");

topics= ["octopus","giraffe", "fox", "armadillo", "elephant", "bill murray", "morty", "puppies", "kitty", "ducks"];

for(i=0; i<= topics.length -1; i++) {
  var button = $("<button>");
  button.addClass("gif-button hvr-ripple-out");
  button.text(topics[i]);
  $("#el-three").append(button);
}

// var subject =$("#movie-input").val();

// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=GScwovCo30gmvtviTDU5g1XUX9G1aC3y&limit=5";


function imageAnimate(e){
  if($(this).attr("data-state") == "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animated") ;
  } else {
    $(this).attr("src", $(this).attr("data-still"));;
    $(this).attr("data-state", "still");
  };
}

function getGify(event) {
  console.log(event.target);
  var subject = $(event.target).text();
  console.log(subject);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=GScwovCo30gmvtviTDU5g1XUX9G1aC3y&limit=5";
  
  $.ajax({
  url: queryURL,
  method: "GET"
   }).then(function(response) {
     console.log(response.data[0]);
     for(i=0; i<= response.data.length-1; i++) {
      var img = $("<img>");
      var imgBox = $("<div>");
      var imgStats =$("<div>");
      imgBox.addClass("image-box");
      imgStats.addClass("image-stats");
      img.addClass("gif");
      img.attr("src", response.data[i].images.fixed_height_still.url);
      img.attr("data-still", response.data[i].images.fixed_height_still.url);
      img.attr("data-animate", response.data[i].images.fixed_height.url);
      img.attr("data-state", "still");
      imgStats.text("Rated: " + response.data[i].rating)
      imgBox.append(img);
      imgBox.append(imgStats);
      $(".images-container").prepend(imgBox);
      console.log(img);
     }
   })
   
  }



  $(".form-button").on('click', addButton);   
  
  function addButton(e) {
    
    console.log("add button was clicked");
    var newBtn = $("<button>");
    var inputText = $(".form-input").val();
    newBtn.text(inputText);
    newBtn.addClass("gif-button hvr-ripple-out");
    $("#el-three").append(newBtn);
    e.preventDefault();
  }

  $(document).on('click', ".gif", imageAnimate);    
 

$(document).on("mousedown", ".gif-button", function(event) {

  console.log('EVENTfired'+event.target);
  // (2) prepare to moving: make absolute and on top by z-index
  event.target.style.position = 'absolute';
  event.target.style.zIndex = 1000;
  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(event.target);
  // ...and put that absolutely positioned ball under the cursor

  moveAt(event.pageX, event.pageY);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    event.target.style.left = pageX - event.target.offsetWidth / 2 + 'px';
    event.target.style.top = pageY - event.target.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (4) drop the ball, remove unneeded handlers
  event.target.onmouseup = function(e) {
    // console.log(window.innerWidth + ":" + e.pageX);
    // var x = e.pageX - event.target.offsetWidth / 2 + 'px';
    // var y = e.pageY - event.target.offsetHeight / 2 + 'px';
    // console.log("x: "+ x +"y: "+ y );
    if(e.pageX < window.innerWidth*.10 && e.pageY< window.innerHeight*.13) {
      document.body.removeChild(event.target);
    } else {
      document.getElementById('el-three').appendChild(event.target);
      event.target.style.position = "relative";
      event.target.style.top = "";
      event.target.style.left = "";
      getGify(e);


      
    }
    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
  };
});



// $(document).on("click", ".gif-button", getGify);
