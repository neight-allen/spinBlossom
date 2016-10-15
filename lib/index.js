require("./styles/index");

const _ = require('underscore');
const $ = require('jquery');
const Shape = require('./shape');
const Levels = require('./level');

//Show some shapes
var selectedShape;
var allShapes = Levels[0].map(function(shape){
  var selectorHTML = `<li data-shape-id="#${shape.id}" class="shapeSelector">
    <img src="/images/${shape.image}" style="transform: rotate(${shape.initialRot}deg)">
  </li>`
  $("#shapeSelectors").append(selectorHTML);
  var $newShape = $(`<img class='shape' data-rotate=${shape.initialRot} id='${shape.id}' src='/images/${shape.image}'>`)
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
  selectedShape.rotation = initialRot + e.clientY - initialPosition.y;
}

$("#shapeSelectors").on("mousedown", ".shapeSelector", function(e){
  e.preventDefault();
  selectedShape = new Shape($(this));
  console.log(selectedShape.rotation);
  initialPosition = {x: e.clientX, y: e.clientY};
  initialRot = selectedShape.rotation;
  mouseDown = true;
  $("body").on("mousemove", rotateSelected)
});

$("body").on("mouseup", function(){
  mouseDown = false;
  $("body").off("mousemove", rotateSelected);
  selectedShape.rotation = Math.round(selectedShape.rotation / 5) * 5;
  var rotationDelta = $(".shape")
    .map(function(){ return $(this).data("rotate"); }).get()
    .reduce((delta, rotation, index, rotations) => delta + rotations[0] - rotation, 0 ) % 360;
  console.log(rotationDelta);
  //Tell them they've won if the shapes match
  if(!rotationDelta) {
    alert("you win!");
  }
});

$(".shapeSelector").on('change', function(){
  selectedShape = new Shape($($(this).val()));
});

function xyToDegrees(coords){
  var radians = Math.atan2(coords.y - center.y, coords.x - center.x);
  return radians * (180/Math.PI);
}
