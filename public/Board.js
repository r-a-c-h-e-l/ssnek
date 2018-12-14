// import meal
// import snake
// import Meal from './Meal';
import { initialSnakeState as snek } from './Snek.js';

// constants
const EAST = { x: 1, y: 0 };
const WEST = { x: -1, y: 0 };
const NORTH = { x: 0, y: -1 };
const SOUTH = { x: 0, y: 1 };

// const initializeCanvas = ({ width, height}) => {
//   const canvas = document.createElement('canvas');
//   canvas.width = width;
//   canvas.height = height;
//   document.body.appendChild(canvas);
//   return canvas;
// }
const initialBoardState = ({ width, height, cellsize }) => {
  return {
    cols: Math.round(width / cellsize),
    rows: Math.round(height / cellsize),
    width,
    height,
    // canvas: initializeCanvas({ width, height });
  }
}

const calcX = ({ x, cols, width }) => {
  return Math.round( x * width / cols);
}

const calcY = ({ y, rows, height }) => {
  return Math.round( y * height / rows);
}

// function Board(width, height) {
  // this.width = width,
  // this.height = height,
  // this.snakeState = snek();
  // this.cols =  Math.round(width / this.snakeState.cellsize);
  // this.rows = Math.round(height / this.snakeState.cellsize);
  // this.ctx = null;
  // this.initializeBoard = function() {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = this.width;
  //   canvas.height = this.height;
  //   const ctx = canvas.getContext('2d');
  //   document.body.appendChild(canvas);
  //   this.ctx = ctx;
  // }
  //
  // this.calcX = function(x) {
  //   console.log({ cols: this.cols, width: this.width, x});
  //   const calculatedX = Math.round( x * this.width / this.cols);
  //   console.log(calculatedX);
  //   return calculatedX
  // }
  //
  // this.calcY = function(y) {
  //   console.log({ rows: this.rows, height: this.height, y});
  //   return Math.round( y * this.height / this.rows);
  // }

  // draw board
  // state is the separate states of food, snake, and game state.
  // this.draw = (state) => {
  //   // clear board
  //   const ctx = this.ctx;
  //   // draw food
  //   // draw snake
  //   // clear
  //   ctx.fillStyle = '#232323'
  //   ctx.fillRect(0, 0, this.width, this.height)
  //
  //   // draw snake
  //   ctx.fillStyle = 'rgb(0,200,50)'
  //   this.snakeState.body.forEach(p => (
  //     ctx.fillRect(p.x, p.y, this.snakeState.cellsize, this.snakeState.cellsize)
  //   )
  // )

    // state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

    // draw apples
    // ctx.fillStyle = 'rgb(255,50,0)'
    // ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

  // }

  // calculate next state to draw
  // again state here is the combined states of snake, food, game.
  // consider passing in each new instance, so that the object of state can be updated
  // this.nextDraw = function () {
    // take current states, calculate updates to states

   // snakeState = nextSnakeState({ directions, foodState, this.snakeState.body }) => newSnakeBody
   // foodState= nextFoodState() // only run if snake.full is false.
//   }
// }

export { calcX, calcY, initialBoardState };
