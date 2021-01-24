import _ from 'lodash';
import Circle from './Objects/Circle';

const circles = [];

const COLOR_PALETTE = ['#C4421A', '#F98F45', '#97CECC', '#12908E', '#16594E'];
const NUMBER_OF_CIRCLES = 1000;
const MOUSE_OVER_ANIM_RADIUS = 100;
const mouse = { x: 0, y: 0 };

function createCircles() {
  for (let x = 0; x < NUMBER_OF_CIRCLES; x++) {
    const radius = _.random(5, 20);

    const circle = new Circle(
      _.random(radius, document.body.clientWidth - radius),
      _.random(radius, document.body.clientHeight - radius),
      radius,
      COLOR_PALETTE[_.random(COLOR_PALETTE.length - 1)],
    );

    circle.setVelocityX(_.random(-1, 1, true));
    circle.setVelocityY(_.random(-1, 1, true));

    circles.push(circle);
  }
}

function animate() {
  const c = document.querySelector('canvas');
  const ctx = c.getContext('2d');

  ctx.clearRect(0, 0, c.width, c.height);

  circles.forEach((circle) => {
    const { x, y } = circle.getPosition();
    const { vx, vy } = circle.getVelocity();

    if (
      x > mouse.x - MOUSE_OVER_ANIM_RADIUS &&
      x < mouse.x + MOUSE_OVER_ANIM_RADIUS &&
      y > mouse.y - MOUSE_OVER_ANIM_RADIUS &&
      y < mouse.y + MOUSE_OVER_ANIM_RADIUS
    ) {
      circle.setScale(3);
    } else {
      circle.setScale(1);
    }

    if (
      x + circle.getRadius() > document.body.clientWidth ||
      x - circle.getRadius() < 0
    ) {
      circle.setVelocityX(-vx);
    }

    if (
      y + circle.getRadius() > document.body.clientHeight ||
      y - circle.getRadius() < 0
    ) {
      circle.setVelocityY(-vy);
    }

    circle.render();
  });

  window.requestAnimationFrame(animate);
}

function setCanvasDimesions() {
  const c = document.querySelector('canvas');

  c.setAttribute('height', document.body.clientHeight + 'px');
  c.setAttribute('width', document.body.clientWidth + 'px');
}

function main() {
  setCanvasDimesions();

  window.addEventListener('resize', () => {
    setCanvasDimesions();
  });

  document.body.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });

  createCircles();

  window.requestAnimationFrame(animate);
}

document.body.onload = main;
