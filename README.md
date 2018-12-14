// Engine
// Snake owns the following state:
// snake = [{x, y}, {x, y}]
// cellsize = number
// full = boolean

// Snake owns the following actions:
  // nextSnakeState = ({state}) => nextState
  // state = {
  //  snake: [{x,y}, {x,y}],
  //  food: {x, y},
  //  directions: [{x, y}, {x,y}]
  // }

  // willEat = ({ snake, food }) => {
  //  return snake[0].x === food.x && snake[0].y === food.y
  // }
  // newHead = ({ snake, directions }) => {
  // need to consider directions here
  //  const newHead = { x: snake[0].x + cellsize, y: snake[0].y }
  // }
  // moveSnake = ({ snake }) => {
  //  const newHead = newHead({ snake, directions })
  //  return [newHead].concat[snake].slice(0, snake.length - 1)
  // }
  // growSnake = ({ snake }) => {
  //  const newHead = newHead({ snake, directions })
  //  return [newHead].concat[snake]
  // }

// how to determine nextSnakesState:
// if (willEat) growSnake
// else moveSnake

//


// Board owns the following state:
// width = number
// height = number
// rows = number
// columns = number

// Board owns the following actions:
// initializeBoard
// findX = ({state}) => x
// findY = ({state}) => y
// mapPointTogrid = ({ state }) => x, y mapped to column and row.

// Food owns the following state:
// food = {x, y}

// Food owns the following actions:
// nextFoodState = ({state}) => nextState

// Interface
// WebSnek
// something needs to draw
// in this case, that is with ctx, canvas
// WebSnek will also add listener for keypress

// WebSnek will initialize the following state:
// let state = {
//  snake: initialSnakeState,
//  board: initialBoardState,
//  food: initialFoodState,
// }
// WebSnek will own the following actions:
// draw = () => draw state
// nextDraw = () => advance next State of snake, food.
