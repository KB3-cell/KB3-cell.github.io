class mazeGen {
  constructor(size) {
    this.mazeSize = size;
    this.mazeWalls = [];
    this.removedWalls = new Map();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (j !== 0) {
          this.mazeWalls.push([
            [i * (width / size), j * (width / size)],
            [(i + 1) * (width / size), j * (width / size)],
            [i + ((j - 1) * this.mazeSize), i + (j * this.mazeSize)]
          ]);
        }
        if (i !== 0) {
          this.mazeWalls.push([
            [i * (width / size), j * (width / size)],
            [(i) * (width / size), (j + 1) * width / size],
            [i - 1 + (j * this.mazeSize), i + (j * this.mazeSize)]
          ]);
        }
      }
    }
    this.unionMaker = new uf(this.mazeSize);
    while (this.unionMaker.count != 1) {
      let randomNum = int(random(0, this.mazeWalls.length));
      let randomWall = this.mazeWalls[randomNum];
      //Lines below check if the lines are conected if they are not they will break the wall and connect the index's together.
      if (!this.unionMaker.connected(randomWall[2][0], randomWall[2][1])) {
        this.mazeWalls.splice(randomNum, 1);
        this.unionMaker.union(randomWall[2][0], randomWall[2][1]);
        if (!this.removedWalls.has(randomWall[2][0])){
          this.removedWalls.set(randomWall[2][0],[randomWall[2][1]]);
        }
        else{
          this.removedWalls.get(randomWall[2][0]).push(randomWall[2][1]);
        }
        //inverse
        if (!this.removedWalls.has(randomWall[2][1])){
          this.removedWalls.set(randomWall[2][1],[randomWall[2][0]]);
        }
        else{
          this.removedWalls.get(randomWall[2][1]).push(randomWall[2][0]);
        }
      }
    }
    //console.log(this.removedWalls.get(2))
  }
}


class uf {
  constructor(size) {
    this.count = size*size;
    this.id = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
      this.id.push(i);
    }
  }
  find(x) {
    return this.id[x];
  }
  union(a, b) {
    let aID = this.find(a);
    let bID = this.find(b);
    if (aID === bID) {
      return;
    }
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === bID) {
        this.id[i] = aID;
      }
    }
    this.count--;
  }
  connected(a, b) {
    return this.find(a) === this.find(b)
  }
}
