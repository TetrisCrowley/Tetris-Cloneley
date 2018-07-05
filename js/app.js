
const canvas = document.getElementById('canvas');
// this would be like const canvas = $('my-canvas')
console.log(canvas);
console.log(canvas.width);
console.log(canvas.height);

const ctx = canvas.getContext('2d');



// Block class -- an array of 4 "Squares"

// Add score, lines cleared,

// Extras:
  // Every 10000 points, increase fall speed slightly
  // Add bonuses for multiple line clears, see http://tetris.wikia.com/wiki/Scoring
  // Add sounds and music
  // Next piece preview

class Block {

  constructor(type) {
    this.x = 90; 
    this.y = 0;
    this.width = 120;
    this.height = 120;
    this.type = type;
    this.shape = [
    // use different numbers for colors - stretch goal
      // // iBlock
      // [[0, 0, 1, 0], //i
      //  [0, 0, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 0, 1, 0]],
      // //j 

      // // jBlock 
      // [[0, 0, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],

      //  // lBlock
      // [[0, 1, 0, 0], 
      //  [0, 1, 0, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],

      // // oBlock 
      // [[0, 0, 0, 0],
      //  [0, 1, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // tBlock 
       [0, 0, 1, 0],
       [0, 1, 1, 0],
       [0, 0, 1, 0],
       [0, 0, 0, 0],
    
      // // sBlock 
      // [[0, 0, 0, 0],
      //  [0, 0, 1, 1],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // zBlock 
       // [0, 0, 0, 0], // getting in way, how to unrecognize?
       // [0, 1, 1, 0],
       // [0, 0, 1, 1],
       // [0, 0, 0, 0]
      ];
  }

    rotate() {
    
    this.shape = [
      [this.shape[3][0], this.shape[2][0], this.shape[1][0], this.shape[0][0]],
      [this.shape[3][1], this.shape[2][1], this.shape[1][1], this.shape[0][1]],
      [this.shape[3][2], this.shape[2][2], this.shape[1][2], this.shape[0][2]],
      [this.shape[3][3], this.shape[2][3], this.shape[1][3], this.shape[0][3]]
    ];
  }
  // find boundaries of shapes
  getBottomEdgeYOffset(){ 
    // like below, but this.height - this.y;
      let lowestI = 3;

      for(let i = 0; i < this.shape.height; i++) {
        for(let j = 0; j < this.shape[i].height; j++) {
          if(this.shape[i][j] === 1 && i < lowestI){
            lowestI = i;
          }
        }       
      }
      return lowestI * 30;
  }
  getLeftEdgeXOffset(){ // Use with above to replace block.x + block.width
      // find lowest j that has a 1/is a square
      // declare -- start with far right (3)

      let lowestJ = 3;

      for(let i = 0; i < this.shape.length; i++) {
        for(let j = 0; j < this.shape[i].length; j++) {
          if(this.shape[i][j] === 1 && j < lowestJ){
          // find offset from edge to block
          // lowestJ replaces j
            lowestJ = j;
          }
        }       
      }
      // return and multiply by 30 to find offset
      return lowestJ * 30;
  }
  getRightEdgeXOffset(){ // Use with above to replace block.height in movement
    // same as above, but this.shape.height
      let highestJ = 3;

      for(let i = 0; i < this.shape.height; i++) {
        for(let j = 0; j < this.shape[i].height; j++) {
          if(this.shape[i][j] === 1 && i < highestJ){
            highestJ = j;
          } //else if(this.shape[i][j] === 1 && i < ){}
        }       
      }
      return highestJ * 30;
  }
  draw(){
    for(let i = 0; i < this.shape.length; i++) {
      for(let j = 0; j < this.shape[i].length; j++) {
        // multiply each index by 30
        if(this.shape[i][j] === 1) {
          ctx.beginPath();
          ctx.rect((this.x + j * 30), (this.y + i * 30), 30, 30);
          ctx.fillStyle = 'black';
          ctx.fill();
          ctx.closePath();

          // remove once edges are found
        } else {
          ctx.beginPath();
          ctx.rect((this.x + j * 30), (this.y + i * 30), 30, 30);
          ctx.fillStyle = 'pink';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

// Collision detection:
// 2 functions that checks when falling/hits 600 - then render inert?
// and check if hitting a black block (collision)
// collision for every direction - is pink hitting black?
// find radius around piece, if pinks intersect with black

// if check collision != true, increase by 1.5
// otherwise nothing

// if (block.y + block.height >= canvas.height){}
// console.log(block.y + block.height, "block");
// console.log(canvas.height, "canvas");
// separate to class^^^



// This detects if either this or the declared function intersects on any one side
  contains(x, y) {
    if (x >= this.x &&
        x <= this.x + this.width &&
        y >= this.y &&
        y <= this.y + this.height) {
      return true;
    } else {
      return false;
    }
  };
  
  intersects(shape) {
    if (this.contains(shape.x, shape.y) ||
        this.contains(shape.x + shape.width, shape.y) ||
        this.contains(shape.x, shape.y + shape.height) ||
        this.contains(shape.x + shape.width, shape.y + shape.height)) {
      return true;
    } else if (
        shape.contains(this.x, this.y) ||
        shape.contains(this.x + this.width, this.y) ||
        shape.contains(this.x, this.y + this.height) ||
        shape.contains(this.x + this.width, this.y + this.height)) {
      return true;
    } else {
      return false;
    }
  };
}




const game = {
  allBlocks: [],
  createNewBlock() {
    const block = new Block("T");
    this.allBlocks.push(block);
  }
// startGame(){}
// press space to start or make button
}


  // nextBlockId: (next block we want to create)
  // newBlock: block instance that's currently moving down the board
  // currentX: for newBlock
  // currentY: for newBlock


  // createNewBlock(){} 
  // choices: ["I", "J", "L", "T", "S", "Z"] - how to translate from block class?
  // some sort of crazy (prob 2d array) data structure to track 
  // which squares are filled by previous blocks


    // choose random letter from above
    // create new block
  // }
// }
// currentBlock

// randomize block spawn
// function randomBlock() {
//   return block[Math.floor(Math.random() * block.length)];
// }
// when block stops, spawn new


// const gameGrid = ??????????
 // [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 //  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


// // Timer --- must start AFTER clearCanvas
// add 10 points every second
// let time = 0;

// startTimer(){
//     const intervalId = setInterval(() => {
//     time++;
//     block.y--;
//     if block reaches bottom, stop falling. How?
//     score += 100;

//   $('#timer').text('Timer: ' + time + 's');s
    // document.getElementById -- that means you ahve an ARRAY
    // to get 1 element youw ill have to index into the array
    // USE IDS INSTEAD
//   }, 2000);

let gameOver = false
// gameOver(){}
// if block reaches canvas.height, clearInterval(IntervalId)
// prompt(SUCKS TO SUCK)


function makeGrid() {
// horizontal
  for(let i = 0; i < canvas.height; i += 30){ 
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = "#000000"; // Add color
    ctx.stroke();
  }
// vertical 
  for(let i = 0; i < canvas.width; i += 30){ 
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.strokeStyle = "#000000"; 
    ctx.stroke();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



const animate = animateCanvas();

function animateCanvas() {

  // block.y += 1.5; //use for fall
  clearCanvas();
  // block.draw();
  game.allBlocks.forEach((b) => b.draw());
  makeGrid();

  // window.cancelAnimationFrame(animate);
    
  window.requestAnimationFrame(animateCanvas);
}

document.addEventListener('keydown', (event) => {
  console.log("pushing key", event.keyCode);

// call method of the Block class?

const lastBlock = game.allBlocks[game.allBlocks.length-1];
  // up 38 - set rotate
  if(event.keyCode === 38){
    lastBlock.rotate();
  }
  // down 40 - increase speed
                                      // keeps you from going off edge
  if(event.keyCode === 40 && lastBlock.y + lastBlock.getBottomEdgeYOffset() < canvas.height){
    lastBlock.y += 30;
  }
  // left 37                  // stops at proper edge
  if(event.keyCode === 37 && lastBlock.x + lastBlock.getLeftEdgeXOffset() > 0){
    lastBlock.x -= 30;
  }
  // right 39
  if(event.keyCode === 39 && lastBlock.x + lastBlock.getRightEdgeXOffset() < canvas.width){
    lastBlock.x += 30;  
  }

  // manually creates a new block
  if(event.keyCode === 32){
    game.createNewBlock();
  }

  // Use space bar to auto-drop or pause? (key 32)
});










