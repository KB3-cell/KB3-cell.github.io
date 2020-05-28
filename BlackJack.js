let cardDeck = [];
let players = [];
let playerBust = false;
let stay = false;
let hitTurn = false;
let win = false;


function setup() {
  createCanvas(1000, 800);
  blackJack();
}

function draw() {
  background(220, 75, 75);
  fill(0);
  ellipse(width / 2, 100, 75)
  for (let i = 1; i < players.length; i++) {
    fill(0, 200, 75)
    ellipse(width / players.length * i, 700, 75);
    fill(0);
    if (i == 1) ellipse(width / players.length, 700, 20)
  }
  drawCards();
}

function drawCards() {
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players[i].hand.length; j++) {
      noFill();
      stroke(255);
      if (i === 0) {
        rect(width / players[i].hand.length + (j * 125) - 120, 200, 120, 175);
      } else {
        rect(width / players[i].hand.length + (j * 125) - 120, 450, 120, 175);
      }
      stroke(0);
      fill(0);
      textSize(20)
      if (i == 0 && j > 0) {
        text(players[i].hand[j].Suit, width / players[i].hand.length + (j * 125) - 92.5, 275);
        text(players[i].hand[j].Value.toUpperCase(), width / players[i].hand.length + (j * 125) - 65, 250);
      }
      if (i != 0) {
        text(players[i].hand[j].Suit, width / players[i].hand.length + (j * 125) - 92.5, 520);
        text(players[i].hand[j].Value.toUpperCase(), width / players[i].hand.length + (j * 125) - 65, 500);
      }
      if (i == 0 && stay && j == 0) {
        text(players[i].hand[j].Suit, width / players[i].hand.length + (j * 125) - 92.5, 275);
        text(players[i].hand[j].Value.toUpperCase(), width / players[i].hand.length + (j * 125) - 65, 250);
        if (!hitTurn) {
          dealerPlay();
        }
      }
    }
  }
  //buttons
  noFill();
  rect(700, 300, 150, 75);
  rect(700, 450, 150, 75);
  fill(0);
  text("Stay", 755, 345);
  text("Hit", 760, 495);
  //bust
  if (playerBust) bust();
}

function hit(pNum) {
  let card = cardDeck.pop();
  players[pNum].hand.push(card);
  players[pNum].score += card.Score;
  if (card.Score === 11) players[pNum].hasAce = true;
  if (players[pNum].score > 21 && players[pNum].hasAce) {
    players[pNum].score -= 10;
    players[pNum].hasAce = false;
  }
  if (players[pNum].score > 21 && pNum != 0) playerBust = true;
  hitTurn = false;
}

function bust() {
  fill(255);
  rect(width / 2 - 75, 662.5, 150, 75)
  fill(0);
  if(playerBust){
    text("Bust, Replay?", width / 2 - 65, 690);
  }
  else{
    text("Dealer Bust You \n   Win! Replay?", width / 2 -70, 690);
  }
}

function winner(num){
  if (num == 1){
    fill(255);
    rect(width / 2 - 75, 662.5, 150, 75);
    fill(0);
    text("You Win! \n   Replay?", width / 2 -55, 690);
    win =true;
  }
  if (num == 0){
    fill(255);
    rect(width / 2 - 75, 662.5, 150, 75);
    fill(0);
    text("You Lose, \n   Replay?", width / 2 -55, 690);
    win = true;
  }
}

function createDeck() {
  let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
  let suits = ['spades', 'hearts', 'clubs', 'diamonds'];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      let score = parseInt(values[i])
      if (!score && values[i] != 'a') {
        score = 10;
      }
      if (values[i] == 'a') score = 11;
      let newCard = {
        Value: values[i],
        Suit: suits[j],
        Score: score,
      }
      cardDeck.push(newCard)
    }
  }
}

function shuffleDeck(deck) {
  let newDeck = [];
  for (let i = deck.length; i > 0; i--) {
    let x = int(random(deck.length));
    newDeck.push(deck[x]);
    deck.splice(x, 1);
  }
  return newDeck;
}

function createPlayers(num) {
  for (let i = 0; i < num; i++) {
    let player = {
      name: 'player ' + i,
      hand: [],
      score: 0,
      hasAce: false,
    }
    players.push(player);
  }
}

function dealCards() {
  for (let j = 0; j < 2; j++) {
    for (let i = players.length - 1; i >= 0; i--) {
      let card = cardDeck.pop();
      players[i].hand.push(card);
      players[i].score += card.Score;
      if (card.Score === 11) players[i].hasAce = true;
    }
  }
}

function mousePressed() {
  if (!playerBust) {
    //hit
    if (700 <= mouseX && mouseX <= 850 && 450 <= mouseY && mouseY <= 525 && !stay) {
      hit(1);
    }
    //stay
    if (700 <= mouseX && mouseX <= 850 && 300 <= mouseY && mouseY <= 375 && !stay) {
      stay = true;
    }
  }
  //bust
  if (width / 2 - 75 <= mouseX && mouseX <= width / 2 + 75 && 662.5 <= mouseY && mouseY <= 737.5 && (playerBust || players[0].score > 21 || win)) {
    restart();
  }
}

function restart(){
    cardDeck = [];
    players = [];
    playerBust = false;
    stay = false;
    hitTurn = false;
    win = false;
    blackJack();
}

function dealerPlay() {
  if (players[0].score < 17) {
    hitTurn = true;
    setTimeout(hit, 750, 0);
  }
  else if (players[0].score > 21){
    bust();
  }
  else if (players[0].score < players[1].score){
    winner(1);
  }
  else if (players[0].score > players[1].score){
    winner(0);
  }
}

function blackJack() {
  createDeck();
  cardDeck = shuffleDeck(cardDeck)
  createPlayers(2);
  dealCards();
}
