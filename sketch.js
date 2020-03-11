let size;
let currentPosX=[];
let currentPosY=[];
let currentSize=[];
let currentColor=[];
let lastPostition = [];
let color;
let increase = 1;
let decreasing = false;

function setup() {
  frameRate(10)
  createCanvas(800, 800);
  background(0);
  noStroke();
  for (let i=0; i<=200; i++){
    size = random(2,8);
    color=[int(random(0,255)),int(random(0,255)),int(random(0,255))];
    append(currentColor, color);
    append(currentSize, size);
    append(currentPosX, random(5,width-5));
    append(currentPosY, random(5,height-5));
    fill(currentColor[i]);
    ellipse(currentPosX[i],currentPosY[i],currentSize[i],currentSize[i]);
  }
  console.log(currentColor[200])
}

function draw() {
  background(0)
  for (i=0; i<=200; i++){
    currentSize[i] *= (1.00002**i)*increase;
    fill(currentColor[i]);
    ellipse(currentPosX[i],currentPosY[i],currentSize[i],currentSize[i]);
  }
  if (currentSize[i] > 1000){
    increase+=-1;
  }
}
