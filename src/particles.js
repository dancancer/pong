import _ from 'lodash';

class Particles {

  constructor(canvas, canvasContext) {
    this.canvas = canvas
    this.canvasContext = canvasContext
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(this.onFrame.bind(this));
    }
  }

  throttledSpawnParticles() {
    return _.throttle(this.spawnParticles.bind(this), 25, {
      trailing: false
    });
  }

  spawnParticles (type, x, y) {
    var color, numParticles;
    // _ref = this.getCursorPosition(), x = _ref.x, y = _ref.y;
    // x = 50, y = 50;
    numParticles = _(this.PARTICLE_NUM_RANGE).sample();
    color = this.getParticleColor(type);
    var _this = this
    return _(numParticles).times((function () {
      return function () {
        _this.elements[_this.particlePointer] = _this.createParticle(x, y, color);
        return _this.particlePointer = (_this.particlePointer + 1) % _this.MAX_PARTICLES;
      };
    })(this));
  };

  getParticleColor(type) {
    return this.PARTICLE_COLORS[type] || [255, 255, 255];
  };

  drawParticles() {
    var particle, _i, _len, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      particle = _ref[_i];
      if (particle.alpha <= 0.1) {
        continue;
      }
      particle.velocity.y += this.PARTICLE_GRAVITY;
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.alpha *= this.PARTICLE_ALPHA_FADEOUT;
      this.canvasContext.fillStyle = "rgba(" + (particle.color.join(", ")) + ", " + particle.alpha + ")";
      _results.push(this.canvasContext.fillRect(Math.round(particle.x - this.PARTICLE_SIZE / 2), Math.round(particle.y - this.PARTICLE_SIZE / 2), this.PARTICLE_SIZE, this.PARTICLE_SIZE));
    }
    return _results;
  };

  createParticle (x, y, color) {
    return {
      x: x,
      y: y + 10,
      alpha: 1,
      color: color,
      velocity: {
        x: this.PARTICLE_VELOCITY_RANGE.x[0] + Math.random() * (this.PARTICLE_VELOCITY_RANGE.x[1] - this.PARTICLE_VELOCITY_RANGE.x[0]),
        y: this.PARTICLE_VELOCITY_RANGE.y[0] + Math.random() * (this.PARTICLE_VELOCITY_RANGE.y[1] - this.PARTICLE_VELOCITY_RANGE.y[0])
      }
    };
  };

  onFrame(time) {
    this.drawParticles(time - this.lastDraw);
    this.lastDraw = time;
    return typeof window.requestAnimationFrame === "function" ? window.requestAnimationFrame(this.onFrame.bind(this)) : void 0;
  };

}

Particles.prototype.POWER_MODE_ACTIVATION_THRESHOLD = 200;

Particles.prototype.STREAK_TIMEOUT = 10 * 1000;

Particles.prototype.MAX_PARTICLES = 500;

Particles.prototype.PARTICLE_NUM_RANGE = [5, 6, 7, 8, 9, 10, 11, 12];

Particles.prototype.PARTICLE_GRAVITY = 0.075;

Particles.prototype.PARTICLE_SIZE = 8;

Particles.prototype.PARTICLE_ALPHA_FADEOUT = 0.96;

Particles.prototype.PARTICLE_VELOCITY_RANGE = {
  x: [-2.5, 2.5],
  y: [-7, -3.5]
};

Particles.prototype.elements = [];

Particles.prototype.particlePointer = 0;

Particles.prototype.lastDraw = 0;

Particles.prototype.PARTICLE_COLORS = {
  "text": [0, 221, 255],
  "text.xml": [255, 255, 255],
  "keyword": [0, 221, 255],
  "variable": [0, 221, 255],
  "meta.tag.tag-name.xml": [0, 221, 255],
  "keyword.operator.attribute-equals.xml": [0, 221, 255],
  "constant": [249, 255, 0],
  "constant.numeric": [249, 255, 0],
  "support.constant": [249, 255, 0],
  "string.attribute-value.xml": [249, 255, 0],
  "string.unquoted.attribute-value.html": [249, 255, 0],
  "entity.other.attribute-name.xml": [129, 148, 244],
  "comment": [0, 255, 121],
  "comment.xml": [0, 255, 121]
};

export default Particles;
