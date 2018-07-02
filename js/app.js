

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


// Create playing field
// piece class -- an array for 4 "Squares"
    // if able - add uBlock, xBlock, and dotBlock
    
class Block {

  constructor(type) {
    this.x = 90; 
    this.y = 0;
    this.type = type;
    this.shape = [
      // lBlock
      [0, 1, 0, 0], //i
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
     //j 

      // // iBlock =
      // [[0, 0, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 0, 1, 0]],

      // // jBlock =
      // [[0, 0, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],

      // // oBlock =
      // [[0, 0, 0, 0],
      //  [0, 1, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // tBlock =
      // [[0, 0, 1, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // sBlock =
      // [[0, 0, 0, 0],
      //  [0, 0, 1, 1],
      //  [0, 1, 1, 0],
      //  [0, 0, 0, 0]],
    
      // // zBlock =
      // [[0, 0, 0, 0],
      //  [0, 1, 1, 0],
      //  [0, 0, 1, 1],
      //  [0, 0, 0, 0]]];
      ];
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
        }
      }
    }
  }
}
const block = new Block("L");
block.draw();

// startGame(){}
// gameOver(){}
// randomize block spawn


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

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}





// make it move -- 

// make it rotate, rotate and other such functionalities you need
// might be a method of the Block class?
document.addEventListener('keydown', (event) => {
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
  if(event.keyCode === 37 && block.x > 0){
    block.x -= 30;
  }
  // right 39
  if(event.keyCode === 39 && block.y > block.y + block.width < canvas.width){
    block.x += 30;
  }
  // Use space bar to auto-drop or pause?

    // clearCanvas();
    // square.draw();
});



function animateCanvas() {

  // in here, mostly just be calling methods of the objects/classes

  // any code here will be executed approx every 1/60th of a second
  // square.y += 1.5; //use for fall; how make it stop?
  clearCanvas();
  block.draw();
  makeGrid();

  // pass this function into w.rAF
  window.requestAnimationFrame(animateCanvas);
}
makeGrid();
// animateCanvas();

// // Timer --- must start AFTER clearCanvas
// let time = 0;

// const startTimer = () => {
//     const intervalId = setInterval(() => {
//     time++;

//   $('#timer').text('timer: ' + time + 's');

//   }, 2000);











