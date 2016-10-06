const _ = require('underscore');
const $ = require('jquery');

//Show some shapes

// $("body").append($(`<img class='shape' data-rotate=0 id='yang' src='/images/yang.png'>`));
// $("body").append($(`<img class='shape' data-rotate=180 id='yin' src='/images/yin.png'>`));

//Rotate selected shape on drag

var mouseDown = false;
var initialPosition = {x: 0, y: 0};
var initialRot = 0;
var initialMouseRot = 0;
var currentRot = 0;
var center = {x: 231, y: 231};
var $selected = $("#yang");

var rotateCurrent = function(e){
  e.preventDefault();
  currentRot = initialRot - initialMouseRot + xyToDegrees({x: e.clientX, y: e.clientY});
  currentRot = Math.floor(currentRot / 5) * 5;
  $selected.css("transform", `rotate(${currentRot}deg)`);
}

$("body").on("mousedown", function(e){
  initialPosition = {x: e.clientX, y: e.clientY};
  initialRot = $selected.data("rotate");
  initialMouseRot = xyToDegrees(initialPosition);
  mouseDown = true;
  $("body").on("mousemove", rotateCurrent)
});

$("body").on("mouseup", function(){
  mouseDown = false;
  $("body").off("mousemove", rotateCurrent);
  $selected.data("rotate", currentRot);
  // console.log($("#yang").data("rotate"), $("#yin").data("rotate"))
  var rotationDelta = ($("#yang").data("rotate") - $("#yin").data("rotate")) % 360;
  console.log(rotationDelta);
  if(!rotationDelta) {
    alert("you win!");
  }
});

$(".shapeSelector").on('change', function(){
  $selected = $($(this).val());
});

function xyToDegrees(coords){
  var radians = Math.atan2(coords.y - center.y, coords.x - center.x);
  return radians * (180/Math.PI);
}

//Tell them they've won if the shapes match
