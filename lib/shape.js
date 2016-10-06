$ = require('jquery');

function Shape(element){
  this.element = element;
}

Object.defineProperty(Shape.prototype, "rotation", {
    get: function rotation() {
        return $(this.element).data("rotate");
    },
    set: function rotation(newRotation) {
      $(this.element).data("rotate", newRotation);
      $(this.element).css("transform", `rotate(${newRotation}deg)`);
    }
});

module.exports = Shape
