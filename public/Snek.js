const cardinals = {
  'NORTH': { x: 0, y: -1 },
  'EAST': { x: 1, y: 0 },
  'SOUTH': { x: 0, y: 1 },
  'WEST': { x: -1, y: 0 },
}

const willEat = ({ snake, food }) => {
  const foodBuffer = 25;
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

const newHead = ({ snake, directions }) => {
  const currentDirection = directions[0];
  const coords = cardinals[currentDirection];
  const x = snake.body[0].x + coords.x;
  const y = snake.body[0].y + coords.y
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

const moveSnake = ({ snake, directions }) => {
 const head = newHead({ snake, directions })
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

const growSnake = ({ snake, directions }) => {
 const head = newHead({ snake, directions })
 return {
   snake: {
     ...snake,
     body: [head].concat(snake.body),
     full: true,
   },
   directions: directions.length > 1 ? directions.slice(1, directions.length) : directions,
 }
}

const nextSnakeState = ({ snake, food, directions }) => {
    if (willEat({ snake, food})) {
      return growSnake({ snake, directions })
    } else {
      return moveSnake({ snake, directions })
    }
}

const initSnake = ({head, units, cellsize}) => {
  const body = [head];
  let currentX = head.x;
  for (let i = 1; i < units; i++) {
    body.push({ x: currentX + cellsize, y: head.y });
    currentX = body[i].x;
  }
  return body;
}

const initialSnakeState = (startingPoint) => {
  const head = startingPoint || { x: 2, y: 2 };
  const cellsize = 25 // make this a constant;
  return {
    cellsize,
    full: false,
    body: initSnake({ head, cellsize, units: 2 })
  }
}

export { initialSnakeState, nextSnakeState };
