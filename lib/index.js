const _ = require('underscore');
const $ = require('jquery');

//Show some shapes

$("body").append($(`<img class='shape' data-rotate=0 id='yang' src='/images/yang.png'>`));
$("body").append($(`<img class='shape' data-rotate=180 id='yin' src='/images/yin.png'>`));

//Rotate selected shape on drag

var yangDown = false;
var initialPosition = {x: 0, y: 0};
var initialRot = 0;
var currentRot = 0;

var rotateYang = function(e){
  $this = $("#yang");
  currentRot = initialRot + e.clientY - initialPosition.y;
  $this.css("transform", `rotate(${currentRot}deg)`);
}

$("body").on("mousedown", function(e){
  e.preventDefault();
  initialPosition = {x: e.clientX, y: e.clientY};
  initialRot = $("#yang").data("rotate");
  yangDown = true;
  $("body").on("mousemove", rotateYang)
});

$("body").on("mouseup", function(){
  yangDown = false;
  $("body").off("mousemove", rotateYang);
  $("#yang").data("rotate", currentRot);
  if($("#yang").data("rotate") === $("#yin").data("rotate"))
  {
    alert("you win!");
  }
});

//Tell them they've won if the shapes match
