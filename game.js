const base = require('./functional_base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

const blockPosByIndex = list => index => {
  let record = list.find((state) => state.counter == index)
  if (record) return {x: record.x, y: record.y}
  
return;  
}

const blockIndexByPos = list => pos => {
  let record = list.find((state) => pointEq(pos)(state))
  if (record) return record.counter
  return;  
}

const snake  =  state => snakeStates => {
  return snakeStates.filter((snakeState) => snakeState.isSnake === true)
   .find((snakeState) => pointEq(state)(snakeState.start))
}
const ladder = state => ladderStates => {
  return ladderStates.filter((ladderState) => ladderState.isSnake === false)
  .find((ladderState) => pointEq(state)(ladderState.start))
}


//// Mutable state
const initialState = () => ({
    x: 0,
    y: 0,
    counter: 100
})

const decrementCounter = (state) => {
 return state.counter - 1;
}

const decrementX = (state) => {
 return (mod(10)(state.counter - 1) === 0) ? 0 : state.x + 60 ;
}

const decrementY = (state) => {
 return (mod(10)(state.counter - 1) === 0) ? state.y + 60 : state.y;
}

const next = spec({
 x: decrementX,
 y: decrementY,
 counter: decrementCounter
})

const nextPos = state => {
  const pos =  blockPosByIndex(state.blocks)(state.currentIndex + 1)
  if (state.currentIndex + 1 < state.targetIndex) {
    return pos;
  }
  if (state.currentIndex + 1 == state.targetIndex) {
    const snaky = snake(pos)(state.snakeAndLadders)
    if (snaky) return snaky.end
    const laddy = ladder(pos)(state.snakeAndLadders)
    if (laddy) return laddy.end
    return pos;
  }
  return state.pos

}

const nextCurrentIndex = state => {
 if (state.currentIndex + 1 < state.targetIndex) return state.currentIndex + 1
 if (state.currentIndex + 1 == state.targetIndex) {
     const pos =  blockPosByIndex(state.blocks)(state.currentIndex + 1)
     const snaky = snake(pos)(state.snakeAndLadders)
     if (snaky) return blockIndexByPos(state.blocks)(snaky.end)
     const laddy = ladder(pos)(state.snakeAndLadders)
     if (laddy) return blockIndexByPos(state.blocks)(laddy.end)
     return state.currentIndex + 1
   }
   return state.currentIndex
}

const nextTargetIndex = state => {
  if (state.currentIndex + 1 === state.targetIndex) return 0
  return state.targetIndex
}

const nextUserState = spec({
  pos: nextPos,
  currentIndex: nextCurrentIndex,
  targetIndex: nextTargetIndex,
  blocks: prop("blocks"),
  snakeAndLadders: prop("snakeAndLadders")
})


// TODO: Dynamic snake and ladder generation
// const nextState = (state) => {
//   const newSnakeState = snakeState(!state.isSnake)
//    if (snakeStates.find((state) => {
//    pointEq(state.start)(newSnakeState.start) ||  pointEq(state.end)(newSnakeState.end) }) || pointEq(newSnakeState.start)(newSnakeState.end) ) {
//     return nextState(state);
//    }
//    return newSnakeState;
// }

const addTargetIndex = state => count => {
  return merge(state)({targetIndex: count})

}

module.exports = { decrementCounter, decrementX, decrementY, initialState, next, nextUserState, addTargetIndex }

