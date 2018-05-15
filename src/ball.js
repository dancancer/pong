import Shape from './shape'

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

class Ball extends Shape{
  constructor (x, y, velX, velY, exists, color, size, context){
    super(x, y, velX, velY, exists)
    this.color = color
    this.size = size
    this.context = context
  }

  draw(){
    let { ctx } = this.context
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(){
    let { width, height, ctx } = this.context
    if((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls){
    for(var j = 0; j < balls.length; j++) {
      if(!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
        }
      }
    }
  };
}

export default Ball
