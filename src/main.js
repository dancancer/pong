import Ball from './ball'
import Board from './board'
import Particles from './particles'

let para = document.querySelector('p');
let count = 0;

// setup canvas

let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerWidth*3/2 ;

let canvas1 = document.getElementById('c2');
let ctx1 = canvas1.getContext('2d');

canvas1.width = window.innerWidth;
canvas1.height = window.innerWidth*3/2 ;

// define array to store balls

let balls = [];


let particles = new Particles(canvas1, ctx1);

// define loop that keeps drawing the scene constantly

let board = new Board((width - 50) / 2 , height - 10, true, { ctx, width, height });
board.setControls();

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 2) {
    let ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20),
      { ctx, width, height }
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
  }

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect(balls);
    }
  }

  board.draw();
  board.checkBounds();
  board.collisionDetect(balls, particles);
  requestAnimationFrame(loop);
}

loop();
