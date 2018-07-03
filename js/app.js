
const canvas = document.getElementById('canvas');
// this would be like const canvas = $('my-canvas')
console.log(canvas);
console.log(canvas.width);
console.log(canvas.height);

const ctx = canvas.getContext('2d');

// Create square
// class Square {
//   constructor(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//   }
//   draw(){
//     ctx.beginPath();
//     ctx.rect(this.x, this.y, this.width, this.height);
//     ctx.fillStyle = 'black';
//     ctx.fill();
//     ctx.closePath();
//   }
// }
// const square = new Square(120, 0, 30, 30);



let gameOver = false

// Create playing field
// piece class -- an array for 4 "Squares"
    // if able - add uBlock, xBlock, and dotBlock

// Add score, lines cleared, and next piece preview
// Move timer
    
class Block {

  constructor(type) {
    this.x = 90; 
    this.y = 0;
    this.width = 120;
    this.height = 120;
    this.type = type;
    this.shape = [

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
      // [[0, 0, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // sBlock 
      // [[0, 0, 0, 0],
      //  [0, 0, 1, 1],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // zBlock 
       [0, 0, 0, 0], // getting in way, how to unrecognize?
       [0, 1, 1, 0],
       [0, 0, 1, 1],
       [0, 0, 0, 0]
      ];
  }

  rotateLeft(block) {
    return [
      [block[3][0], block[2][0], block[1][0], block[0][0]],
      [block[3][1], block[2][1], block[1][1], block[0][1]],
      [block[3][2], block[2][2], block[1][2], block[0][2]],
      [block[3][3], block[2][3], block[1][3], block[0][3]]
    ];
  }
    rotateRight(block) {
    return [
      [block[3][0], block[2][0], block[1][0], block[0][0]],
      [block[3][1], block[2][1], block[1][1], block[0][1]],
      [block[3][2], block[2][2], block[1][2], block[0][2]],
      [block[3][3], block[2][3], block[1][3], block[0][3]]
    ];
  }

  // find boundaries of shapes
  getRightEdgeXValue(){ 
  }

  getLeftEdgeXOffset(){ // Use with above to replace block.x + block.width

      // find lowest j that has a 1/is a square
      // declare -- start with far right (3)

      let lowestJ = 3;

      for(let i = 0; i < this.shape.length; i++) {
        for(let j = 0; j < this.shape[i].length; j++) {
          if(this.shape[i][j] === 1 && j < lowestJ){
          // if there is a 1 in this j 
          // AND if this j is less than the one we know about, 
            // update lowestj to be this j
            lowestJ = j;
            console.log("lowestJ", lowestJ)
          }


        }       
      }
      // use that value of lowest j to calculate and return 
      // the left edge MIULTIPLAICALYION (lowestJ * ?)
      return lowestJ * 30;
  }
  // getTopEdgeYValue(){
  // }
  getBottomeEdgeYValue(){ // Use with above to replace block.height
    // this.height - this.y;
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
// 2 functions that checks when falling/hits 600
// and check if hitting a black block (collision)
// collision for every direction - is pink hitting black?
// find radius around piece, if pinks intersect with black

// if check collision != true, increase by 1.5
// otherwise nothing

// if (block.y + block.height >= canvas.height){}
// console.log(block.y + block.height, "block");
// console.log(canvas.height, "canvas");
// separate to class^^^
}



const block = new Block("Z");
block.draw();
// randomize block spawn
// function randomBlock() {
//   return block[Math.floor(Math.random() * block.length)];
// }
// when block stops, spawn new

// Every 10000 points, increase fall speed slightly
// Add bonuses for multiple line clears, see http://tetris.wikia.com/wiki/Scoring

// fix spawn point
// incorporate other arrays
// clear row


// startGame(){}
// press space to start

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


// make it move -- 

// make it rotate, rotate and other such functionalities you need
// might be a method of the Block class?
document.addEventListener('keydown', (event) => {
  console.log(block.width);
  console.log(canvas.width);
  console.log("pushing key", event.keyCode);

  // up 38 - set rotate
  if(event.keyCode === 38 && block.y > 0){
    block.y -= 30; 
  }

  // down 40 - increase speed
                                      // keeps you from going off edge
  if(event.keyCode === 40 && block.y + block.height < canvas.height){
    block.y += 30;
  }
  // left 37
  if(event.keyCode === 37 && block.x + block.getLeftEdgeXOffset() > 0){
    block.x -= 30;
  }
  // right 39
  if(event.keyCode === 39 && block.x + block.width < canvas.width){
    block.x += 30;  
  }

  // Use space bar to auto-drop or pause? (key 32)
});


const animate = animateCanvas();

function animateCanvas() {

  // block.y += 1.5; //use for fall
  clearCanvas();
  block.draw();
  makeGrid();

  // window.cancelAnimationFrame(animate);
    
  // console.log("derp");

  window.requestAnimationFrame(animateCanvas);
}

// // Timer --- must start AFTER clearCanvas
// add 10 points every second
// let time = 0;

// const startTimer = () => {
//     const intervalId = setInterval(() => {
//     time++;
//     score += 100;

//   $('.timer').text('Timer: ' + time + 's');s
    // document.getElementsByClassName -- that means you ahve an ARRAY
    // to get 1 element youw ill have to index into the array
    // USE IDS INSTEAD
//   }, 2000);









