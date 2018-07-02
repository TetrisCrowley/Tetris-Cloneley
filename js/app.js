

const canvas = document.getElementById('canvas');
// this would be like const canvas = $('my-canvas')
console.log(canvas);
console.log(canvas.width);
console.log(canvas.height);

const ctx = canvas.getContext('2d');


// Create playing field

// function: draw a square --  commit
// maybe make Square a class (= you should make a square class)

class Square {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

  // gameOver(){}
  }
}

class Piece {

  constructor() {
    // array of Squares
  }


  draw(){
  }
}
// piece.draw();

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

const square = new Square(270, 0, 30, 30);
square.draw();




// function: draw a piece -- first make it work on its own

// start thinking about 
// piece class -- an array for 4 "Squares"
// this might mean "square" should be class




function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



// Timer
// let time = 0;

// const startTimer = () => {
//     const intervalId = setInterval(() => {
//     time++;

//   $('#timer').text('timer: ' + time + 's');

//   }, 250);





// make it move -- 

// make it rotate, rotate and other such functionalities you need
// might be a method of the Piece class?
document.addEventListener('keydown', (event) => {
  console.log("pushing key", event.keyCode);

  // up 38 - set rotate
  if(event.keyCode === 38 && square.y > 0){
    square.y -= 10; // may want to use a val much higher than 1
  }

  // down 40 - increase speed
                                    // keeps you from going off edge
  if(event.keyCode === 40 && square.y + square.height < canvas.height){
    square.y += 20;
  }

  // left 37
  if(event.keyCode === 37 && square.x > 0){
    square.x -= 10;
  }
  // right 39
  if(event.keyCode === 39 && square.y > square.y + square.width < canvas.width){
    square.x += 10;
  }
  // Use space bar to auto-drop?

    // clearCanvas();
    // square.draw();
   
});

function animateCanvas() {

  // in here, mostly just be calling methods of the objects/classes

  // any code here will be executed approx every 1/60th of a second
  // square.y += 1.5; //use for fall; how make it stop?
  clearCanvas();
  square.draw();
  makeGrid();

  // pass this function into w.rAF
  window.requestAnimationFrame(animateCanvas);
}

animateCanvas();












