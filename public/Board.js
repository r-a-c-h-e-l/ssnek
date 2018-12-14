import { initialSnakeState as snek } from './Snek.js';

const initialBoardState = ({ width, height, cellsize }) => {
  return {
    cols: Math.round(width / cellsize),
    rows: Math.round(height / cellsize),
    width,
    height,
  }
}

const calcX = ({ x, cols, width }) => {
  return Math.round( x * width / cols);
}

const calcY = ({ y, rows, height }) => {
  return Math.round( y * height / rows);
}

export { calcX, calcY, initialBoardState };
