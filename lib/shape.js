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
      var $myElement = $(this.element);
      var oldScreenRotate = $myElement.data("screen-rotate");
      var newScreenRotate = Math.round(newRotation/5)*5;
      $myElement.data("rotate", newRotation);
      $myElement.data("screen-rotate", newScreenRotate)
      if($myElement.data("screen-rotate") != oldScreenRotate){
        $myElement.css("transform", `rotate(${newScreenRotate}deg)`);
        $(this.selector).find("img").css("transform", `rotate(${newScreenRotate}deg)`);
      }
    }
});

module.exports = Shape
