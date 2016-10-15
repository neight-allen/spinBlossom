require("./styles/index");

const _ = require('underscore');
const $ = require('jquery');
const Shape = require('./shape');
const Levels = require('./level');

//Show some shapes
var selectedShape;
var allShapes = Levels[currentLevel].map(function(shape){
  var selectorHTML = `<li data-shape-id="#${shape.id}" class="shapeSelector">
    <img src="../images/${shape.image}" style="transform: rotate(${shape.initialRot}deg)">
  </li>`
  $("#shapeSelectors").append(selectorHTML);
  var $newShape = $(`<img class='shape' data-rotate=${shape.initialRot} id='${shape.id}' src='../images/${shape.image}'>`)
  $("#pit").append($newShape);
  selectedShape = new Shape($(".shapeSelector:last"));
  selectedShape.rotation = shape.initialRot;
  return selectedShape;
})

//Rotate selected shape on drag

var mouseDown = false;
var initialPosition = {x: 0, y: 0};
var initialRot = 0;
var initialMouseRot = 0;
var currentRot = 0;
var center = {x: 231, y: 231};

var rotateSelected = function(e){
  e.preventDefault();
  selectedShape.rotation = initialRot + posFromEvent(e).y - initialPosition.y;
}

$("#shapeSelectors").on("mousedown touchstart", ".shapeSelector", function(e){
  e.preventDefault();
  selectedShape = new Shape($(this));
  console.log(selectedShape.rotation);
  initialPosition = posFromEvent(e);
  initialRot = selectedShape.rotation;
  mouseDown = true;
  $(document).on("mousemove touchmove", rotateSelected)
});

$(document).on("mouseup touchend", function(){
  mouseDown = false;
  $(document).off("mousemove touchmove", rotateSelected);
  selectedShape.rotation = Math.round(selectedShape.rotation / 5) * 5;
  var rotationDelta = $(".shape")
    .map(function(){ return $(this).data("rotate"); }).get()
    .reduce((delta, rotation, index, rotations) => delta + rotations[0] - rotation, 0 ) % 360;
  console.log(rotationDelta);
  //Tell them they've won if the shapes match
  if(!rotationDelta) {
    alert("you win!");
    location = "../"
  }
});

$(".shapeSelector").on('change', function(){
  selectedShape = new Shape($($(this).val()));
});

function posFromEvent(event){
  if(event.type.match(/touch/)){
    return {x: event.touches[0].clientX, y: event.touches[0].clientY}
  } else {
    return {x: event.clientX, y: event.clientY}
  }
}

function xyToDegrees(coords){
  var radians = Math.atan2(coords.y - center.y, coords.x - center.x);
  return radians * (180/Math.PI);
}
