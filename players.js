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
        if(this.playerIndex-1 in map.get(this.playerIndex)){
          this.Xcor -= width/this.gridSize;
          this.playerIndex-=1;
        }
      }
    }
    else if (this.playerDirection === "up"){
      if (this.Ycor-width/this.gridSize > 0){
        if(this.playerIndex-this.gridSize in map.get(this.playerIndex)){
          this.Ycor -= width/this.gridSize;
          this.playerIndex-=this.gridSize;
        }
      }
    }
    else if (this.playerDirection === "down"){
      if (this.Ycor+width/this.gridSize < width){
        if(this.playerIndex+this.gridSize in map.get(this.playerIndex)){
          this.Ycor += width/this.gridSize;
          this.playerIndex+=this.gridSize;
        }
      }
    }
    else if (this.playerDirection === "right"){
      if (this.Xcor+width/this.gridSize < width){
        if(this.playerIndex+1 in map.get(this.playerIndex)){
          this.Xcor += width/this.gridSize;
          this.playerIndex+=1;
        }
      }
    }
    console.log(this.playerIndex)
    this.playerDirection = null;
  }
}
