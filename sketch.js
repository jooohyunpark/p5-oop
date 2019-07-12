var p = [];
var backgroundColor = 259;
var randomColor = 312;


function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    background(backgroundColor, 100, 100, 100);
    recordParticles();
    drawParticles();
    killParticles();
}

function recordParticles() {
    if (mouseIsPressed) {
        noCursor();
        for (var i = 0; i < 5; i++) {
            p.push(new Particle(mouseX, mouseY));
        }
    }
}

function mousePressed() {
    backgroundColor = random(360);
}

function mouseReleased() {
    cursor(ARROW);
    randomColor = random(360);
}


function drawParticles() {
    p.forEach(function (i) {
        let noise = createVector(random(-.5, .5), random(-.5, .5));
        i.applyForce(noise);
        let friction = i.vel.copy();
        friction.mult(-.015);
        i.applyForce(friction);
        i.update();
        i.show();
    });
}


function killParticles() {
    for (var i = p.length - 1; i >= 0; i--) {
        if (p[i].r === 0) {
            p.splice(i, 1);
        }
    }
}


function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.maxR = random(5, 10);
    this.color = randomColor;
    this.alpha = 1;
    this.switch = false;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(pmouseX + random(-5, 5), pmouseY + random(-5, 5)).sub(createVector(mouseX, mouseY));
    this.acc = createVector();

    this.show = function () {
        noStroke();
        fill(this.color, 100, 100, this.alpha);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.switch == false) {
            if (this.r < this.maxR) {
                this.r += 1;
            } else {
                this.switch = true;
            }
        } else {
            if (this.r > 0) {
                this.r -= .2;
            } else {
                this.r = 0;
            }
        }
    }

    this.applyForce = function (f) {
        this.acc.add(f);
    }
}
