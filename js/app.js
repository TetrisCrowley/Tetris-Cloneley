

const canvas = document.getElementById('canvas');
// this would be like const canvas = $('my-canvas')
console.log(canvas);
console.log(canvas.width);
console.log(canvas.height);

const ctx = canvas.getContext('2d');


// Create playing field



// function: draw a square --  commit
// maybe make Square a class

// function: draw a piece -- first make it work on its own

// start thinking about 
// piece class -- an array for 4 "Squares"
// this might mean "square" should be class

// make it move -- 

//make it rotate rotate, and other such functionalities you need
// might be a method of the Piece class?

// make it fall






// Timer
// let time = 0;

// const startTimer = () => {
//     const intervalId = setInterval(() => {
//     time++;

//   $('#timer').text('timer: ' + time + 's');

//   }, 250);







// document.addEventListener('keydown', (event) => {
//   console.log("pushing key", event.keyCode);

//   // up 38 - set rotate
//   if(event.keyCode === 38 && captSquare.y > 0){
//     captSquare.y -= 10; // may want to use a val much higher than 1
//   }

//   // down 40 - increase speed
                                // keeps you from going off edge
//   if(event.keyCode === 40 && captSquare.y + captSquare.height < canvas.height){
//     captSquare.y += 10;
//   }

//   // left 37
//   if(event.keyCode === 37 && captSquare.x > 0){
//     captSquare.x -= 10;
//   }
//   // right 39
//   if(event.keyCode === 39 && captSquare.y > captSquare.y + captSquare.width < canvas.width){
//     captSquare.x += 10;
//   }
//     // clearCanvas();
//     // captSquare.draw();
//     // cmdrCircle.draw();
// });

// How to increase piece intervals











