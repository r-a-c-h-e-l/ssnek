import { nextSnakeState, initialSnakeState as snake } from './Snek.js';
import { calcX, calcY, initialBoardState as board } from './Board.js';
import { newFood as food } from './Food.js';

let intervalId;
let stopDraw;
const width = window.innerWidth;
const height = window.innerHeight;
const initialSnake = snake();
const initialFood = food({ width, height });
const initialBoard = board({ width, height, cellsize: initialSnake.cellsize })

// drawing context
let ctx;

// initial state for all components
let state = {
  snake: initialSnake,
  board: initialBoard,
  food: initialFood,
  directions: ['EAST'],
}

const initializeCanvas = ({ width, height}) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function drawCrash() {
  // clear canvas
  ctx.fillStyle = '#2c3e50'
  ctx.fillRect(0, 0, state.board.width, state.board.height)

  const x = state.board.width / 2 - 50
  const y = (state.board.height / 2 - 50)
  ctx.fillStyle = '#2ecc71'
  ctx.fillRect(x, y, 100, 100)

  // left eye
  ctx.beginPath()
  ctx.moveTo(x + 25, y + 25)
  ctx.lineTo(x+ 35, y + 25)
  ctx.stroke()
  // left eye
  ctx.beginPath()
  ctx.moveTo(x + 75, y + 25)
  ctx.lineTo(x+ 85, y + 25)
  ctx.stroke()
  // mouf
  ctx.beginPath()
  ctx.moveTo(x + 25, y + 75)
  ctx.lineTo(x+ 85, y + 55)
  ctx.stroke()

  ctx.font = '16px sans';
  ctx.fillStyle = '#e74c3c'
  ctx.fillText('hit refresh to start over!', x - 25 , y + 140);
}

function draw() {
  // clear
  const cell = state.snake.cellsize;

  ctx.fillStyle = '#2c3e50'
  ctx.fillRect(0, 0, state.board.width, state.board.height)

  // draw food
  ctx.fillStyle = '#e74c3c'
  ctx.fillRect(state.food.x, state.food.y, cell, cell)

  // draw snake
  ctx.fillStyle = '#2ecc71'
  state.snake.body.forEach(p => {
    ctx.fillRect(p.x, p.y, cell, cell)
  })

}

function nextDraw() {
  const nextSnake = nextSnakeState(state)
  state = {
    ...state,
    snake: nextSnake.snake,
    directions: nextSnake.directions,
    food: nextSnake.snake.full ? food({ width, height }) : state.food,
  }
  console.log({ nextState: state });
  if (!nextSnake.snake.body.length) {
    stopDraw();
    drawCrash();
    return;
  }
  draw();
}

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      state = {
        ...state,
        directions: state.directions.concat(['NORTH'])
      }
      console.log({stateAfterKey: state});
      break;
    case 'ArrowDown':
      state = {
        ...state,
        directions: state.directions.concat(['SOUTH'])
      }
      break;
    case 'ArrowRight':
      state = {
        ...state,
        directions: state.directions.concat(['EAST'])
      }
      break;
    case 'ArrowLeft':
      state = {
        ...state,
        directions: state.directions.concat(['WEST'])
      }
      break;
  }
});
initializeCanvas({ width, height })
draw();
intervalId = window.setInterval(nextDraw, 100);
stopDraw = () => window.clearInterval(intervalId)
window.stopDraw = stopDraw;
