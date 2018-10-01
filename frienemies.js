'use strict';

function Frienemy (canvas, x, y, role) {
    var self = this;

    self.canvasElement = canvas;
    self.size = 40;
    self.y = y;
    self.x = x;
    self.dx = 1;
    self.dy = 0;
    self.speed = 5;
    self.role = role;
    self.enemyImage = new Image();
    self.friendImage = new Image();
    self.enemyImage.src = 'images/angry-512.png';
    self.friendImage.src = 'images/Growing_Pink_Heart_Emoji.png';
    self.ctx = self.canvasElement.getContext('2d');

    self.possibleDirection = [
        [1,0],
        [-1,0],
        [0,1],
        [0, -1]
    ]
}

Frienemy.prototype.update = function () {
    var self = this;

    if (Math.random() > 0.99) {
        self._getRandomDirection();
    }

    self.x = self.x + self.dx * self.speed;
    self.y = self.y + self.dy * self.speed;
    this.isInScreen();
};

Frienemy.prototype._getRandomDirection = function () {
    var self = this;

    var randomIndex = Math.floor(Math.random() * self.possibleDirection.length);

    self.dx = self.possibleDirection[randomIndex][0];
    self.dy = self.possibleDirection[randomIndex][1];
}

Frienemy.prototype.draw = function () {
    var self = this;

    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    if (self.role === 'Enemy') {
        self.ctx.drawImage(self.enemyImage, self.xPosition, self.yPosition, self.size, self.size);
    } else {
        self.ctx.drawImage(self.friendImage, self.xPosition, self.yPosition, self.size, self.size);
    }

};

Frienemy.prototype.isInScreen = function () {
    var self = this;

    if (self.x < 0) {
        self.dx = 1;
    }
  
    if (self.x > self.canvasElement.width) {
        self.dx = -1;
    }
  
    if (self.y < 0) {
        self.dy = 1;
    }
  
    if (self.y > self.canvasElement.height) {
        self.dy = -1;
    }
};