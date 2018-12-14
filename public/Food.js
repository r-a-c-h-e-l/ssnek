
const newFood = ({ width, height }) => {
  return {
    x: Math.floor(Math.random() * width) + 0,
    y: Math.floor(Math.random() * height) + 0,
  }
}

export { newFood }
