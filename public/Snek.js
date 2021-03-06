const cardinals = {
  'NORTH': { x: 0, y: -1 },
  'EAST': { x: 1, y: 0 },
  'SOUTH': { x: 0, y: 1 },
  'WEST': { x: -1, y: 0 },
}

// willEat: takes { snake, food } = state
// returns true if x, y of snake[0] is within range around food
const willEat = ({ snake, food }) => {
  const foodBuffer = 15;
  const xRange = {
    min: food.x - foodBuffer,
    max: food.x + snake.cellsize + foodBuffer,
  }
  const yRange = {
    min: food.y - foodBuffer,
    max: food.y + snake.cellsize + foodBuffer,
  }
  const xInRange = snake.body[0].x >= xRange.min && snake.body[0].x <= xRange.max;
  const yInRange = snake.body[0].y >= yRange.min && snake.body[0].y <= yRange.max;
  return xInRange && yInRange;
}

// willLoop: takes { snake, directions, board } = state
// loops in the positive direction
const willLoop = ({ snake, directions, board }) => {
  const currentDirection = directions[0];
  const coords = cardinals[currentDirection];
  let x = snake.body[0].x + coords.x;
  let y = snake.body[0].y + coords.y
  const xBounds = { min: 0, max: board.width }
  const yBounds = { min: 0, max: board.height }
  if (x <= xBounds.min) x = xBounds.max;
  if (x >= xBounds.max) x = xBounds.min;
  if (y <= yBounds.min) y = yBounds.max;
  if (y >= xBounds.max) y = yBounds.min;
  return { x, y };
}

// willCrash: takes { snake } = state
const willCrash = ({ snake, directions, board }) => {
  const head = newHead({ snake, directions, board })
  let isCannibalizing = false;
  console.log({ snake });
  for (let i = 1; i < snake.body.length; i++) {
    console.log(snake.body[i]);
    const segment = snake.body[i]
    const xRange = {
      min: segment.x,
      max: segment.x + snake.cellsize,
    }
    const yRange = {
      min: segment.y,
      max: segment.y + snake.cellsize,
    }
    const xInRange = head.x >= xRange.min && head.x <= xRange.max;
    const yInRange = head.y >= yRange.min && head.y <= yRange.max;
    if (xInRange && yInRange) isCannibalizing = true;
  }
  return isCannibalizing;
}

const newHead = ({ snake, directions, board }) => {
  const currentDirection = directions[0];
  const { x, y } = willLoop({ snake, directions, board })
  switch(currentDirection) {
    case 'NORTH':
    return { x , y: y - snake.cellsize };
    case 'EAST':
    return { x: x + snake.cellsize, y }
    case 'SOUTH':
    return { x, y: y + snake.cellsize }
    case 'WEST':
    return { x: x - snake.cellsize, y }
  }
}

const moveSnake = ({ snake, directions, board }) => {
 const head = newHead({ snake, directions, board })
 const newDirection = directions.length > 1 ? directions.slice(1, directions.length) : directions;
 return {
   snake: {
     ...snake,
     body: [head].concat(snake.body).slice(0, snake.body.length),
     full: false,
   },
   directions: directions.length > 1 ? directions.slice(1, directions.length) : directions,
 }
}

const growSnake = ({ snake, directions, board }) => {
 const head = newHead({ snake, directions, board })
 return {
   snake: {
     ...snake,
     body: [head].concat(snake.body),
     full: true,
   },
   directions: directions.length > 1 ? directions.slice(1, directions.length) : directions,
 }
}

const nextSnakeState = ({ snake, food, directions, board }) => {
    if (willCrash({ snake, directions, board })) {
      return { snake: { ...snake, body: [] }, directions: [] }
    }
    if (willEat({ snake, food})) {
      return growSnake({ snake, directions, board })
    } else {
      return moveSnake({ snake, directions, board })
    }
}

const initSnake = ({bottom, units, cellsize}) => {
  const body = [bottom];
  let currentX = bottom.x;
  for (let i = 1; i < units; i++) {
    body.unshift({ x: currentX + cellsize, y: bottom.y });
    currentX = body[i].x;
  }
  return body;
}

const initialSnakeState = (startingPoint) => {
  const bottom = startingPoint || { x: 2, y: 2 };
  const cellsize = 25 // make this a constant;
  return {
    cellsize,
    full: false,
    body: initSnake({ bottom, cellsize, units: 2 })
  }
}

export { initialSnakeState, nextSnakeState };
