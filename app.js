import {PixiShapesController} from './src/controller/'
import {PixiShapesModel} from './src/model/'
import {PixiShapesView} from './src/view/'

const model = new PixiShapesModel();
const view  = new PixiShapesView(model);
const controller = new PixiShapesController(view, model);

controller.startGame();