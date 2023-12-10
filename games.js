var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var gameLevel = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  //choose random colour
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //add animation to random button
  animatePress(randomChosenColour);
  //add sound to random button
  playSound(randomChosenColour);
  //check game start
  gameStarted = true;
  //change h1 according to game level
  $("h1").text("Level " + gameLevel);
  //increase level
  gameLevel += 1;
}

//detect a button click
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
//_________________sound playing function
function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

//__________________animating function using css class
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 400);
}

//add keypress to entire document to check keypress
$(document).keypress(function () {
  if (gameStarted == false) {
    nextSequence();
  }
});

//____________________check answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var wrong_audio = new Audio("./sounds/wrong.mp3");
    wrong_audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game-Over, Press Any Key to Restart");
    startOver();
  }
}

//_______________startover function
function startOver() {
  gameLevel = 0;
  gamePattern = [];
  gameStarted = false;
}
