
import {newShape} from './shapes';
import {random} from './helpers'

export class PixiShapesView {
  constructor(model){
    this.model = model;
  }

  createShape(){
   return newShape(random(1, 6));
  }

  createRandomShape(x, y) {
    return newShape(random(0, 3), x, y);
  }

  removeShape(shape) {
    shape.clear();
    this.model.countShapes--;
    this.model.areaShapes -= shape.area;
    this.showInfoShape();
    const idx = this.model.shapes.indexOf(shape);
    if (idx > -1) {
      this.model.shapes.splice(idx, 1);
    }
  }

  showInfoShape(){
    this.model.counterBlock.innerHTML = this.model.countShapes;
    this.model.areaBlock.innerHTML = this.model.areaShapes + 'px^2';
  }
}