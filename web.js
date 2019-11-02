const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const blocks = []
const snakeAndLadderStates = [];
const userStates = [];


const drawCanvas = () => {
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}


let userState =  {
  pos: {x: 700, y: 700},
  currentIndex: 0,
  targetIndex:0,
  blocks: blocks,
  snakeAndLadders: snakeAndLadderStates
}

// drawBoard
const draw = (state) => {
  if (state.counter === 0) return
  
  ctx.fillStyle = 'rgb(0,200,50)'
  ctx.fillRect(state.x, state.y, 60, 60)
  ctx.strokeStyle = "black";
  ctx.lineWidth   = 4;
  ctx.strokeRect(state.x,state.y, 60,60);
  ctx.font = "10pt sans-serif";
  ctx.fillStyle = 'blue'

  ctx.fillText(state.counter, state.x + 25, state.y + 35)
  blocks.push(state)
  const newState = next(state)
  draw(newState);

}

const rollDice = (count) => {
  //draw label
  ctx.font = "13pt sans-serif";
  ctx.fillStyle = 'blue'
  ctx.fillText("Press R to roll a Dice", 610, 240)

  //draw rectangle
  ctx.fillStyle = 'white'
  ctx.fillRect(630, 280, 120, 120)
  ctx.fillStyle = 'blue'
  ctx.font = "30pt sans-serif";
  ctx.fillText(count ? count : 0, 675, 350)
  return count

}

//dynamic snake generation

//const snakeState = (isSnake) => {return {
//  start: {x: rnd(60)(540) + 35, y: rnd(60)(540) + 35},
//  end: {x: rnd(60)(540) + 35, y: rnd(60)(540) + 35},
//  isSnake: isSnake
//
//}
//}

const snakeAndLadderState = isSnake => start => end => { return {
   start: {x: start.x, y: start.y},
   end: {x: end.x, y: end.y},
   isSnake: isSnake
 }
}

const drawSnakesAndLadders = (state) => {
  ctx.strokeStyle = state.isSnake ? "red" : "yellow"
  ctx.beginPath();
  ctx.moveTo(state.start.x + 30, state.start.y + 30);
  ctx.lineTo(state.end.x + 30, state.end.y + 30);
  ctx.stroke();
  ctx.closePath();
  snakeAndLadderStates.push(state);

  // Dynamic snake and Ladder generation
//  const newSnakeState = nextState(state);
//  snakeStates.push(newSnakeState)
//  drawSnakesAndLadders(newSnakeState)
}

// Game loop update
const step = t1 => t2 => {
  if (t2 - t1 > 100) {
    let pos = merge({})(userState.pos)
    userState = nextUserState(userState)
    userStates.push(userState)
     //console.log("start** " + userState.pos.x + "end***** " + userState.pos.y+"ic " + userState.currentIndex + "ti" + userState.targetIndex)
    drawPlayer(pos)
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

const drawPlayer = (pos) => {
   ctx.fillStyle = 'rgb(0,200,50)'
   console.log(pos.x + " " + pos.y + " " + " " + userState.pos.x + " " + userState.pos.y)
    if (pos) ctx.fillRect(pos.x + 40, pos.y + 40, 13, 13)
   ctx.fillStyle = 'black'
   ctx.fillRect(userState.pos.x + 40, userState.pos.y + 40, 13, 13)
}

window.addEventListener('keydown', e => {
  if (e.key === 'r') {
    count = rollDice(rnd(1)(6))
    userState = addTargetIndex(userState)(userState.currentIndex + count)
  }
  }
)

//// Main
drawCanvas();
draw(initialState());
drawSnakesAndLadders(snakeAndLadderState(true)({x: 60, y: 180})({x: 120, y: 480}))
drawSnakesAndLadders(snakeAndLadderState(true)({x: 180, y: 0})({x: 120, y: 120}))
drawSnakesAndLadders(snakeAndLadderState(true)({x: 420, y: 60})({x: 180, y: 420}))
drawSnakesAndLadders(snakeAndLadderState(true)({x: 300, y: 0})({x: 240, y: 240}))
drawSnakesAndLadders(snakeAndLadderState(true)({x: 480, y: 420})({x: 540, y: 540}))
drawSnakesAndLadders(snakeAndLadderState(true)({x: 240, y: 360})({x: 300, y: 540}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 0, y: 120})({x: 60, y: 0}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 180, y: 540})({x: 360, y: 480}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 420, y: 420})({x: 240, y: 120}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 420, y: 540})({x: 540, y: 420}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 540, y: 300})({x: 360, y: 180}))
drawSnakesAndLadders(snakeAndLadderState(false)({x: 0, y: 420})({x: 60, y: 300}))
rollDice()
window.requestAnimationFrame(step(0))
