import Shape from './shape'
class Board extends Shape{
  constructor(x, y, exists, context){
    super(x, y, 10, 10, exists)
    this.context = context
    this.color = 'white'
    this.width = 50
    this.height = 10
  }
  draw = () => {
    let { ctx } = this.context
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  checkBounds = () => {
    if((this.x + this.width) >= width) {
      this.x = (width - this.width);
    }

    if(this.x <= 0) {
      this.x = 0;
    }

    if((this.y + this.height) >= height) {
      this.y = height - this.height;
    }

    if(this.y <= 0) {
      this.y = 0;
    }
  };
  setControls = () => {
    var _this = this;
    window.onkeydown = (e) => {
      console.log(e.keyCode)

      if(e.keyCode === 37) { // a
        this.x -= this.velX;
      } else if(e.keyCode === 39) { // d
        this.x += this.velX;
      } else if(e.keyCode === 38) { // w
        this.y -= this.velY;
      } else if(e.keyCode === 40) { // s
        this.y += this.velY;
      }
    };
  };
  collisionDetect = (balls, particles) => {
    for(var j = 0; j < balls.length; j++) {
      if( balls[j].exists ) {
        var dx = (this.x < (balls[j].x + balls[j].size)) &&
          ((this.x + this.width) > (balls[j].x - balls[j].size))
        var dy = this.y > balls[j].y && (this.y < (balls[j].y + balls[j].size));

        var rate = (balls[j].x - (this.x + (this.width / 2))) / this.width * 2
        if (dx && dy) {
          console.log(rate)
          particles.throttledSpawnParticles('text', balls[j].x, this.y);
          balls[j].velY = balls[j].velY * -1.1;
          balls[j].velX = balls[j].velX * (1.1);

        }
      }
    }
  };
}

export default Board
