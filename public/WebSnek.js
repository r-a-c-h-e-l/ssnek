import { nextSnakeState, initialSnakeState as snake } from './Snek.js';
import { calcX, calcY, initialBoardState as board } from './Board.js';

// const EAST = { x: 1, y: 0 };
// const WEST = { x: -1, y: 0 };
// const NORTH = { x: 0, y: -1 };
// const SOUTH = { x: 0, y: 1 };
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const initialSnake = snake();
const boardArgs = {
  width: windowWidth,
  height: windowHeight,
  cellsize: initialSnake.cellsize,
}
const initialBoard = board(boardArgs)

console.log({ initialSnake, initialBoard });
// drawing context
let ctx;

// initial state for all components
let state = {
  snake: initialSnake,
  board: initialBoard,
  food: {},
  directions: ['EAST'],
}

console.log({state});

const initializeCanvas = ({ width, height}) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}


function draw() {
  // state = nextDraw(state);
  // clear board
  // draw food
  // draw snake
  // clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, state.board.width, state.board.height)

  // draw snake
  ctx.fillStyle = 'rgb(0,200,50)'
  state.snake.body.forEach(p => {
    ctx.fillRect(p.x, p.y, state.snake.cellsize, state.snake.cellsize)
  })
}

function nextDraw() {
  const nextSnake = nextSnakeState(state)
  state = {
    ...state,
    snake: nextSnake.snake,
    directions: nextSnake.directions,
  }
  console.log({ nextState: state });
  draw();
}

// const step = t1 => t2 => {
//   if (t2 - t1 > 100) {
//     nextDraw()
//     window.requestAnimationFrame(step(t2))
//   } else {
//     window.requestAnimationFrame(step(t1))
//   }
// }

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      console.log('north');
      state = {
        ...state,
        directions: state.directions.concat(['NORTH'])
      }
      console.log({stateAfterKey: state});
      break;
    case 'ArrowDown':
      console.log('south');
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
initializeCanvas({width: windowWidth, height: windowHeight})
draw();
// window.requestAnimationFrame(step(0))
let intervalId;
intervalId = window.setInterval(nextDraw, 100);
window.stopDraw = () => window.clearInterval(intervalId)
