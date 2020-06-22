import * as PIXI from 'pixi.js'
import {random, getRandomColor} from './helpers';

const polygonArea = (points) => {
  const couplePoint = [];
  for (let i = 0; i <Math.ceil(points.length/2); i++){
    couplePoint[i] = points.slice((i*2), (i*2) + 2);
  }

  const countCouplePoint = couplePoint.length;
  let j = 0;
	let area = couplePoint[countCouplePoint - 1][0] * couplePoint[0][1] - couplePoint[countCouplePoint - 1][1] * couplePoint[0][0];
  while (j<countCouplePoint-1) {
		area += couplePoint[j][0] * couplePoint[j+1][1] - couplePoint[j][1] * couplePoint[j+1][0];
		j++;
	}
	return Math.round(area /= 2);
}
const minWidth = 25,
maxWidth = 100,
minHeight = 25, 
maxHeight = 100;

export const newShape = (number, x = random(0, 800), y = -maxHeight) => {
  const typeShape = ['circle', 'rect', 'elipse', '3sides', '5sides', '6sides'];
  const type = typeShape[number];
 
  const randomWidth =  random(minWidth, maxWidth);      
  const randomHeight =  random(minHeight, maxHeight); 
  const side3Point = [
    random(0, maxWidth),
    random(0, maxHeight),
    random(maxWidth/2, maxWidth),
    random(maxHeight/2, maxHeight),
    random(0, maxWidth/2),
    random(maxHeight/2, maxHeight)
  ];

  const side5Point = [
    random(maxWidth / 3, maxWidth * 2 / 3), 
    random(0, maxHeight / 3),
    random(maxWidth * 2 / 3, maxWidth), 
    random(maxHeight / 3, maxHeight * 2 / 3),
    random(maxWidth / 2, maxWidth), 
    random(maxHeight * 2 / 3, maxHeight),
    random(0, maxWidth/2), 
    random(maxHeight * 2 / 3, maxHeight),
    random(0, maxWidth / 3), 
    random(maxWidth / 3, maxHeight * 2 / 3)
  ]

  const side6Point = [
    random(maxWidth / 4, maxWidth / 2),
    random(0, maxHeight/ 3),
    random(maxWidth / 2, maxWidth * 3 / 4), 
    random(0, maxHeight / 3),
    random(maxWidth * 3 / 4, maxWidth),
    random(maxHeight / 3, maxHeight * 2 / 3),
    random(maxWidth/2, maxWidth *3/4),
    random(maxHeight * 2 / 3, maxHeight),
    random(maxWidth / 4, maxWidth / 2), 
    random(maxHeight *2/ 3, maxHeight),
    random(0, maxWidth / 3), 
    random(maxHeight / 3, maxHeight *2 /3),
  ]

  const graphics = new PIXI.Graphics();
      graphics.beginFill(getRandomColor());
      graphics.h = randomHeight/2;
    switch (type){
    case 'circle':
      graphics.drawCircle(0, 0, graphics.h);
      graphics.area = Math.round(Math.PI * Math.pow(graphics.h, 2));
      break;
    case 'rect':
      graphics.drawRect(0, 0, randomWidth, randomHeight);
      graphics.area = randomWidth*randomHeight;
      break;  
    case 'elipse':
      graphics.drawEllipse(0, 0, randomWidth/2, randomHeight/2);
      graphics.area =  Math.round(Math.PI * randomWidth * randomHeight);
      break;   
    case '3sides':
      graphics.drawPolygon(side3Point);
      graphics.area = polygonArea(side3Point);
      break;      
    case '5sides':
      graphics.drawPolygon(side5Point);
      graphics.area = polygonArea(side5Point);
      break;     
    case '6sides':
      graphics.drawPolygon(side6Point);
      graphics.area = polygonArea(side6Point);
      break;    
    
    default: 
      graphics.drawCircle(0, 0, graphics.h);
      graphics.area = Math.round(Math.PI * Math.pow(graphics.h, 2));

      break;
    }
    graphics.endFill(); 
    graphics.x = x;
    graphics.y = y;
    graphics.interactive = true; 
    graphics.buttonMode = true; 
    return graphics;
}


