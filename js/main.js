const canvas = document.getElementById("canvas");
const canvasMulti = document.getElementById("canvas2");
let ctx = canvas.getContext("2d");
let ctxMulti = canvasMulti.getContext("2d");

const lblx = document.getElementById("lblx");
const lbly = document.getElementById("lbly");
const tableBody = document.querySelector("#circleTable tbody");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#d2e3fc";

canvasMulti.height = window_height;
canvasMulti.width = window_width;
canvasMulti.style.backgroundColor = "#d2d3fc";

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

function createRandomCircle(index) {
  let randomRadius = Math.floor(Math.random() * 60 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 0.4)";
  let randomStrokecolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
  let randomSpeed = Math.random() * 3 + 1;  // Velocidad aleatoria entre 1 y 4

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  return new Circle(randomX, randomY, randomRadius, randomStrokecolor, (index + 1).toString(), randomBackcolor, randomSpeed);
}

// Un solo círculo en el primer canvas
let singleCircle = createRandomCircle(0);
singleCircle.draw(ctx);

function updateSingleCircle() {
  requestAnimationFrame(updateSingleCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  singleCircle.update(ctx);
  lblx.innerHTML = singleCircle.posX.toFixed(1);
  lbly.innerHTML = singleCircle.posY.toFixed(1);
}

updateSingleCircle();

// Múltiples círculos en el segundo canvas
const nCircles = 10;
let circles = [];

for (let i = 0; i < nCircles; i++) {
  circles.push(createRandomCircle(i));
}

function updateTable() {
  tableBody.innerHTML = '';
  circles.forEach((circle, index) => {
    let row = document.createElement('tr');
    let cellIndex = document.createElement('td');
    cellIndex.textContent = index + 1;
    let cellX = document.createElement('td');
    cellX.textContent = circle.posX.toFixed(1);
    let cellY = document.createElement('td');
    cellY.textContent = circle.posY.toFixed(1);
    row.appendChild(cellIndex);
    row.appendChild(cellX);
    row.appendChild(cellY);
    tableBody.appendChild(row);
  });
}

function updateMultipleCircles() {
  requestAnimationFrame(updateMultipleCircles);
  ctxMulti.clearRect(0, 0, window_width, window_height);
  circles.forEach(circle => {
    circle.update(ctxMulti);
  });
  updateTable();
}

updateMultipleCircles();
