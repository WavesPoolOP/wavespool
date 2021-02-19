var nav = document.getElementById("nav-scroll");

window.onscroll = function () {
  if (window.pageYOffset > 300) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
};

function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}
// make some waves.
var ocean = document.getElementById("ocean"),
  waveWidth = 10,
  waveCount = Math.floor(window.innerWidth / waveWidth),
  docFrag = document.createDocumentFragment();

for (var i = 0; i < waveCount; i++) {
  var wave = document.createElement("div");
  wave.className += " wave";
  docFrag.appendChild(wave);
  wave.style.left = i * waveWidth + "px";
  wave.style.webkitAnimationDelay = i / 100 + "s";
}

ocean.appendChild(docFrag);

var canvas = document.getElementById("stars");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  makingStar();
});

function rand(a, b) {
  return Math.random() * (b - a + 1) + a;
}

var stars = [];

Stars = function (x, y, radius, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed / 25;
  this.radius = radius;
  this.saturation = 0 + this.radius * 20;
  this.lightness = 100 + this.radius * 20;
};

Stars.prototype = {
  update: function () {
    this.x += this.speed;
    if (this.x - this.radius >= window.innerWidth) {
      this.x = 0;
    }
  },
  render: function () {
    c.beginPath();
    c.arc(
      this.x,
      this.y,
      this.radius < 0 ? 0 : this.radius,
      0,
      Math.PI * 2,
      false
    );
    var flickerAdd = rand(0, 140) !== 0 ? rand(5, 20) : 0;
    c.fillStyle =
      "hsl(" +
      Math.floor(rand(195, 200)) +
      ", " +
      this.saturation +
      "%, " +
      (this.lightness + flickerAdd) +
      "%)";
    c.fill();
  },
};

updateStars = function (a) {
  var i = a.length;
  while (i--) {
    a[i].update();
  }
};
renderStars = function (a) {
  var i = a.length;
  while (i--) {
    a[i].render(i);
  }
};

makingStar = function () {
  stars = [];
  var base = 0.75;
  var inc = 0.1;
  var count = 20;
  var per = 5;
  while (count--) {
    var radius = base + inc;
    var perTime = per;
    while (perTime--) {
      radius += inc;
      stars.push(
        new Stars(
          rand(0, window.innerWidth - radius),
          rand(0, window.innerHeight - radius),
          radius,
          radius * 10
        )
      );
    }
  }
};

function update() {
  window.requestAnimationFrame(update);
  updateStars(stars);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  renderStars(stars);
}

makingStar();
update();

class Bubble {
  constructor(pageWidth, pageHeight) {
    this.xPos = Math.floor(Math.random() * pageWidth);
    this.x = "left: " + this.xPos + "px;";
    this.yPos = pageHeight + Math.floor(Math.random() * 3000);
    this.y = "top: " + this.yPos + "px;";
    this.size = Math.floor(Math.random() * 15) + 4;
    this.sizePlus = this.size - 1;
    this.width = "width: " + this.size + "px;";
    this.height = "height: " + this.sizePlus + "px;";
    this.background = "background: #58BFE8;";
    this.border = "border-top: 1px solid #fff;";
    this.radius = "border-radius: 50%;";
    this.speed = this.size * 0.2;
    this.dir = Math.floor(Math.random() * 20);
    this.ocillation = Math.floor(Math.random() * 7) + 2;
    this.count = 0;
  } // constructor

  Move() {
    this.yPos -= this.speed;
    this.y = "top: " + this.yPos + "px;";
    // back to back motion - off for now
    if (this.count > this.ocillation) {
      if (this.dir == 0) {
        // left
        if (this.size > 6) {
          this.xPos -= this.speed * 0.4;
          this.x = "left: " + this.xPos + "px;";
        }
        this.count++;
      } else {
        // right
        if (this.size > 6) {
          this.xPos += this.speed * 0.4;
          this.x = "left: " + this.xPos + "px;";
        }
        this.count++;
      }
    } else {
      if (this.dir == 0) this.dir = 1;
      else this.dir = 0;
      this.count = 0;
    }
  } // Move()

  // called when bubble goes above screen
  Reset() {
    this.xPos = Math.floor(Math.random() * pageWidth);
    this.x = "left: " + this.xPos + "px;";
    this.yPos = pageHeight + Math.floor(Math.random() * 3000);
    this.y = "top: " + this.yPos + "px;";
    this.size = Math.floor(Math.random() * 15) + 4;
    this.sizePlus = this.size - 1;
    this.width = "width: " + this.size + "px;";
    this.height = "height: " + this.sizePlus + "px;";
    this.speed = this.size * 0.2;
    this.ocillation = Math.floor(Math.random() * 7) + 2;
  } // Reset()
} // class

// site.js code begins here //
(function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let pageHeight = window.innerHeight;
let pageWidth = window.innerWidth;

let main = document.querySelector("main");

let bubble;
let bubbles = [];
const MAX_BUBBLES = 90;

// creates max bubbles
for (let i = 0; i < MAX_BUBBLES; i++) {
  bubble = new Bubble(pageWidth, pageHeight);
  bubbles.push(bubble);
  let bubb = document.createElement("div");
  bubb.setAttribute("class", "bubble");
  bubb.setAttribute(
    "style",
    bubble.x +
      bubble.y +
      bubble.radius +
      bubble.background +
      bubble.width +
      bubble.height +
      bubble.border
  );
  main.appendChild(bubb);
}

let theBubbles = document.querySelectorAll(".bubble");

// called from Update()
function MoveBubbles() {
  for (let i = 0; i < MAX_BUBBLES; i++) {
    bubbles[i].Move();
    if (bubbles[i].yPos < -10) bubbles[i].Reset();
    theBubbles[i].setAttribute(
      "style",
      bubbles[i].x +
        bubbles[i].y +
        bubbles[i].radius +
        bubbles[i].background +
        bubbles[i].width +
        bubbles[i].height +
        bubbles[i].border
    );
  }
} // MoveBubbles()

function Update() {
  MoveBubbles();
  requestAnimationFrame(Update); // recalls Update
} // Update()

//--------------------> ONLOAD EVENT LISTENER <---------------------//
window.addEventListener("load", function () {
  Update();
});
