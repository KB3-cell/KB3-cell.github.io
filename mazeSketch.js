let rez = 20;
let maze;
let dir = "";

function setup() {
  createCanvas(1000, 1000);
  maze = new mazeGen(rez);
  player1 = new player(rez);
}

function draw() {
  background(220);
  fill(0, 200, 0);
  strokeWeight(0);
  square(0, 0, width / rez);
  fill(250, 25, 0);
  square(width - (width / rez), height - (height / rez), width / rez);
  fill(200);
  strokeWeight(4);
  for (let i = 0; i < maze.mazeWalls.length; i++) {
    line(maze.mazeWalls[i][0][0], maze.mazeWalls[i][0][1], maze.mazeWalls[i][1]            [0], maze.mazeWalls[i][1][1]);
  }
  strokeWeight(2)
  fill(0,225,255)
  circle(player1.Xcor, player1.Ycor, width/(rez*1.2));
}

function keyPressed(){
  if (keyCode === 37) dir = "left";
  else if (keyCode === 38) dir = "up";
  else if (keyCode === 40) dir = "down";
  else if (keyCode === 39) dir = "right";
  player1.move(dir, maze.removedWalls);
  console.log(maze.removedWalls.get(player1.playerIndex))
}
