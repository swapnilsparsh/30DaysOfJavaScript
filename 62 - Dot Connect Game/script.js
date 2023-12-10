const initialState = {
  player: 'yellow',
  winner: false,
  board: [[0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0]]
}

const reducer = (state = initialState, action) => {
  console.log(initialState)
  switch (action.type) {
    case 'CHIP_DROPPED':
      return state = {
        ...state,
        board: action.updateBoard
      }
    case 'PLAYER_SWITCHED':
      return state = {
        ...state,
        player: action.player
      }
    case 'WINNER':
      return state = {
        ...state,
        winner: true
      }
    case 'RESET':
      return state = {
        player: 'yellow',
        winner: 'false',
        board: [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]]
      }
    default:
      return state
  }
}

let store = Redux.createStore(reducer, initialState)

const gameOver = (status) => {
  const $endText = document.querySelector('#end-text')
  status == 'draw'
    ? $endText.textContent = 'The game is a draw! Replay?'
    : $endText.textContent = `${status} won the game! Replay?`
  store.dispatch({type: 'WINNER'})
}

const winner = (row, col, color) => {
  const {board} = store.getState()
  let count = 0
  let num = color == 'Yellow' ? 1 : -1

  for (let i = 0; i < board[row].length; i++) {
    board[row][i] == num ? count += 1 : count = 0
    if (count == 4) {
      gameOver(color)
      break
    }
  }
  count = 0

  for (let i = 0; i < board.length; i++) {
    board[i][col] == num ? count += 1 : count = 0
    if (count == 4) {
      gameOver(color)
      break
    }
  }
  count = 0

  for (let i = 3; i >= -3; i--) {
    if (row - i > 5 || row - i < 0 || col - i > 6 || col - i < 0) {
      continue
    }
    board[row - i][col - i] == num ? count +=1 : count = 0
    if (count == 4) {
      gameOver(color)
      break
    }
  }
  count = 0

  for (let i = 3; i >= -3; i--) {
    if (row + i > 5 || row + i < 0 || col - i > 6 || col - i < 0) {
      continue
    }
    board[row + i][col - i] == num ? count +=1 : count = 0
    if (count == 4) {
      gameOver(color)
      break
    }
  }
  count = 0

  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(0)) {
      count += 1
    }
    if (count == 0) {
      gameOver('draw')
      break
    }
  }
}

const dropChip = (col) => {
  const {board, player} = store.getState()
  const updateBoard = [...board]

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][col] == 0) {
      if (player == 'yellow') {
        updateBoard[i][col] = 1
        winner(i, col, 'Yellow')
        store.dispatch({type: 'PLAYER_SWITCHED', player: 'red'})
        break
      } else if (player == 'red') {
        updateBoard[i][col] = -1
        winner(i, col, 'Red')
        store.dispatch({type: 'PLAYER_SWITCHED', player: 'yellow'})
        break
      }
      store.dispatch({type: 'CHIP_DROPPED', updateBoard})
    }
  }
}

const renderGame = () => {
  const {board, player, winner} = store.getState()
  const $board = document.querySelector('#board')
  $board.innerHTML = ''
  const $status = document.querySelector('#status')
  $status.textContent = `${player}'s turn`
  $status.style.boxShadow = player == 'yellow'
                              ? '0 .25em .3125em rgba(245, 255, 58, .7)'
                              : '0 .25em .3125em rgba(255, 63, 63, 0.5)'

  const $end = document.querySelector('#end')
  winner == true ? $end.classList.remove('hidden') : $end.classList.add('hidden')

  for (let i = 0; i < board.length; i++) {
    const $row = document.createElement('div')
    $row.classList.add('row')
    $board.appendChild($row)

    for (let j = 0; j < board[i].length; j++) {
      const $cell = document.createElement('div')
      $cell.classList.add('cell')
      $cell.dataset.row = i
      $cell.dataset.column = j

      if (board[i][j] == 1) {
        $cell.classList.add('yellow')
      } else if (board[i][j] == -1) {
        $cell.classList.add('red')
      }
      $row.appendChild($cell)
    }
  }
}

store.subscribe(renderGame)

renderGame()

document.addEventListener('click', (event) => {
  if(event.target.className.includes('cell')) {
    const $row = event.target.dataset.row
    const $column = event.target.dataset.column
    dropChip($column)
  }
})
const $restart = document.querySelector('#end-text')
$restart.addEventListener('click', () => {
  store.dispatch({type: 'RESET'})
})