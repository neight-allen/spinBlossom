$ = require('jquery');

function Shape(selector){
  this.element = $(selector.data("shape-id"));
  this.selector = selector;
}

Object.defineProperty(Shape.prototype, "rotation", {
    get: function rotation() {
        return $(this.element).data("rotate");
    },
    set: function rotation(newRotation) {
      $(this.element).data("rotate", newRotation);
      $(this.element).css("transform", `rotate(${newRotation}deg)`);
      $(this.selector).find("img").css("transform", `rotate(${newRotation}deg)`);
    }
});

module.exports = Shape
