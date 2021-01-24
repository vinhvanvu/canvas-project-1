import _ from 'lodash';

export default class Circle {
  constructor(x, y, radius, color, scale = 1) {
    this.ctx = document.querySelector('canvas').getContext('2d');

    this.x = x;
    this.y = y;

    this.radius = radius;

    this.color = color;

    this.scale = scale;

    this.vx = _.random(10, true);
    this.vy = _.random(10, true);
  }

  getRadius() {
    return this.radius;
  }

  setRadius(r) {
    this.radius = r;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getVelocity() {
    return { vx: this.vx, vy: this.vy };
  }

  setScale(multiplier) {
    this.scale = multiplier;
  }

  setVelocityX(vx) {
    this.vx = vx;
  }

  setVelocityY(vy) {
    this.vy = vy;
  }

  render() {
    this.ctx.beginPath();

    this.ctx.arc(
      (this.x += this.vx),
      (this.y += this.vy),
      this.radius * this.scale,
      0,
      2 * Math.PI,
    );
    this.ctx.stroke();

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
