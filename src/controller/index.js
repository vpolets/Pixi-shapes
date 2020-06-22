import * as PIXI from 'pixi.js';

export class PixiShapesController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  startGame(){
    this.createScene();
    this.playGame();


    /*Handle random click */
    this.model.app.addEventListener('dblclick', (e) => {
    const randomShape = this.view.createRandomShape(e.offsetX, e.offsetY);
    this.model.countShapes++;
    this.model.areaShapes += randomShape.area;
    this.view.showInfoShape();
    this.model.shapes.push(randomShape);
    this.model.pixiScene.stage.addChild(randomShape);

      /*Delete random shape click */
      randomShape.on('click', (e) => {
        this.view.removeShape(randomShape)
        e.stopPropagation();
      });
    });

    /*Change gravity value  */
    this.model.gravityButton.addEventListener('click', (e) => {
      this.model.gravity = +e.target.value;

    });

    /*Change  generated shapes per sec value  */
    this.model.generatedButton.addEventListener('click', (e) => {
      this.model.generatedPerSec = +e.target.value;
    });
  }

  createScene(){
    this.model.pixiScene = new PIXI.Application({
      width: this.model.pixiSceneWidth,
      height: this.model.pixiSceneHeight,
      backgroundColor: 0xC3C3C3,
      resolution: 1
    });
    this.model.app.appendChild(this.model.pixiScene.view);
  }

  createGame(){
    for (let i = 0; i < this.model.generatedPerSec; i++){
      const shape = this.view.createShape();
      this.model.countShapes++;
      this.model.areaShapes += shape.area;
      this.view.showInfoShape();
      this.model.shapes.push(shape);
      this.model.pixiScene.stage.addChild(shape);
      shape.on('click', (e) => {
        e.stopPropagation();
        this.view.removeShape(shape);
      });
    }
  }

  playGame(){
    this.createGame();
    setInterval(() => {   
      this.createGame();
     }, this.model.interval);
    
     
    this.model.pixiScene.ticker.add(() => {
      this.model.shapes.map(s => {
        s.y += this.model.gravity;
        if (s.y >= this.model.pixiSceneHeight + s.h) {
          this.view.removeShape(s);
        }
      })
    })
  }
}