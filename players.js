class player {
  constructor(size){
    this.Xcor = (width/size)/2;
    this.Ycor = (height/size)/2;
    this.gridSize = size;
    this.playerIndex = 0;
    //this.movement = [];
    this.playerDirection = null;
  }
  move(dir, map){
    this.playerDirection = dir;
    if (this.playerDirection === "left"){
      if (this.Xcor-width/this.gridSize > 0){
        if(map.get(this.playerIndex).includes(this.playerIndex-1)){
          this.Xcor -= width/this.gridSize;
          this.playerIndex-=1;
        }
      }
    }
    else if (this.playerDirection === "up"){
      if (this.Ycor-width/this.gridSize > 0){
        if(map.get(this.playerIndex).includes(this.playerIndex-this.gridSize)){
          this.Ycor -= width/this.gridSize;
          this.playerIndex-=this.gridSize;
        }
      }
    }
    else if (this.playerDirection === "down"){
      if (this.Ycor+width/this.gridSize < width){
        if(map.get(this.playerIndex).includes(this.playerIndex+this.gridSize)){
          this.Ycor += width/this.gridSize;
          this.playerIndex+=this.gridSize;
        }
      }
    }
    else if (this.playerDirection === "right"){
      if (this.Xcor+width/this.gridSize < width){
        if(map.get(this.playerIndex).includes(this.playerIndex+1)){
          this.Xcor += width/this.gridSize;
          this.playerIndex+=1;
        }
      }
    }
    this.playerDirection = null;
  }
}
