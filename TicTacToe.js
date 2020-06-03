let list = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]
let scores = {
  X: 1,
  O: -1,
  tie: 0,
}
let openSpots = [];
let player = 'O';
let ai = 'X';
let currentPlayer;

function setup() {
  createCanvas(800, 800);
  currentPlayer = ai;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      openSpots.push([i, j]);
    }
  }
  aiTurn();
}

function draw() {
  background(220);
  strokeWeight(3);
  line(width / 3, 0, width / 3, height);
  line(width * 2 / 3, 0, width * 2 / 3, height);
  line(0, height / 3, width, height / 3);
  line(0, height * 2 / 3, width, height * 2 / 3);
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      let spot = list[i][j];
      textAlign(CENTER);
      let x = i * (width / 3) + width / 6;
      let y = j * (width / 3) + width / 6 + 40;
      textFont("Arial", 120);
      text(spot, x, y);
    }
  }

  let winner = checkWinner(list);
  if (winner != null && winner != "Tie") {
    console.log(winner + " is the winner!");
    noLoop();
  }
  if (winner == "Tie") {
    console.log("Tie!");
    noLoop();
  }

  if (mouseIsPressed && currentPlayer === player) {
    let i = floor(mouseX / (width / 3))
    let j = floor(mouseY / (height / 3))
    if (list[i][j] === '') {
      list[i][j] = player;
      openSpots.pop(0)
      aiTurn();
    }
  }
}

function checkWinner(calledList) {
  let newList = calledList;
  //Sidewaze
  for (let i = 0; i < 3; i++) {
    if (checkEquals(newList[i][0], newList[i][1], newList[i][2])) {
      return (list[i][0]);
    }
  }
  //Up and down
  for (let i = 0; i < 3; i++) {
    if (checkEquals(newList[0][i], newList[1][i], newList[2][i])) {
      return (list[0][i]);
    }
  }
  //Corner to Corner
  for (let i = 0; i < 2; i++) {
    if (checkEquals(newList[0][0], newList[1][1], newList[2][2])) {
      return (list[0][0]);
    }
  }
  for (let i = 0; i < 2; i++) {
    if (checkEquals(newList[0][2], newList[1][1], newList[2][0])) {
      return (list[0][2]);
    }
  }
  if (openSpots.length == 0) {
    return ("Tie");
  }
}

function checkEquals(a, b, c) {
  return a == b && b == c && a != '';
}

function aiTurn() {
  let bestScore = -Infinity;
  let bestMove;
  let stopLoop;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (list[i][j] === '') {
        let bestMove = minimax(list, 0, true);
        if (bestMove != null) list[bestMove.i][bestMove.j] = ai;
        stopLoop = true;
        break;
      }
    }
    if (stopLoop) break;
  }
  openSpots.pop();
  currentPlayer = player;
}

function minimax(list, depth, aiTurn) {
  let blockSpot = {};
  let lastSpot = {}
  if (depth == 0) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (list[i][j] === '') {
          list[i][j] = 'X';
          let winner = checkWinner(list);
          list[i][j] = '';
          if (winner === "X") return {
            i,
            j
          };
          list[i][j] = 'O';
          let winnerPlayer = checkWinner(list);
          console.log(winnerPlayer)
          list[i][j] = '';
          if (winnerPlayer === "O") {
            blockSpot = {
              i,
              j
            };
          }
          lastSpot = {
            i,
            j
          };
        }
      }
    }
  }
  if (!isEmpty(blockSpot)) return blockSpot;
  return lastSpot;
}

function isEmpty(object) {
  return Object.keys(object).length === 0;
}
