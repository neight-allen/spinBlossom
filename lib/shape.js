$ = require('jquery');

function Shape(selector){
  this.element = $(selector.data("shape-id"));
  this.selector = selector;
}

Shape.prototype.screenToRealRotate = function(){
  $(this.element).data("real-rotate", $(this.element).data("screen-rotate"))
}

Object.defineProperty(Shape.prototype, "rotation", {
    get: function rotation() {
        return $(this.element).data("real-rotate");
    },
    set: function rotation(newRotation) {
      var $myElement = $(this.element)
      var oldScreenRotate = $myElement.data("screen-rotate")
      $myElement.data("rotate", newRotation);
      $myElement.data("screen-rotate", Math.round(newRotation/5)*5)
      if($myElement.data("screen-rotate") != oldScreenRotate){
        $myElement.css("transform", `rotate(${newRotation}deg)`);
        $(this.selector).find("img").css("transform", `rotate(${newRotation}deg)`);
      }
    }
});

module.exports = Shape
