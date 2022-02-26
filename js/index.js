var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //   console.log(gamePattern);
  playSound(randomChosenColour);
}
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  // console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});
function playSound(clicked) {
  var audio = new Audio("sounds/" + clicked + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 100);
}
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
