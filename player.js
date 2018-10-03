'use strict';

function Player (canvas, loves, lives) {
    var self = this;

    self.canvasElement = canvas;
    self.x = self.canvasElement.width / 2;
    self.y = self.canvasElement.height - 30;
    self.dx = 0;
    self.dy = 0;
    self.size = 70;
    self.speed = 5;
    self.loves = loves;
    self.lives = lives;
    self.ctx = self.canvasElement.getContext('2d');
    self.character = new Image();
    self.character.src = 'images/1513313790emoji-love-cute-png.png';
}

// Set the player's direction based on a string
Player.prototype.setDirection = function (dx, dy) {
  var self = this;

  self.dx = dx;
  self.dy = dy;

};

Player.prototype.collidesWithFriend = function (friend) {
  var self = this;
  
  const collidesRight = self.x + self.size / 2 > friend.x - friend.size / 2;
  const collidesLeft = self.x - self.size / 2 < friend.x + friend.size / 2;
  const collidesTop = self.y - self.size / 2 < friend.y + friend.size / 2;
  const collidesBottom = self.y + self.size / 2 > friend.y - friend.size / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
      return true;
  }
  
  return false;
};

Player.prototype.collidesWithEnemy = function (enemy) {
    var self = this;
    
    const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
    const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
    const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
    const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
};

Player.prototype.collidesWithWall = function (wall) {
    var self = this;

    const collidesRight = self.x + self.size / 2 > wall.x - wall.width / 2;
    const collidesLeft = self.x - self.size / 2 < wall.x + wall.width / 2;
    const collidesTop = self.y - self.size / 2 < wall.y + wall.height / 2;
    const collidesBottom = self.y + self.size / 2 > wall.y - wall.height / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
}

Player.prototype.invertDirection = function () {
    var self = this;

    self.dx = self.dx * -1;
    self.dy = self.dy * -1;
}

Player.prototype.collidedFriend = function () {
  var self = this;
  
  self.loves--;
};

Player.prototype.collidedEnemy = function () {
    var self = this;
    
    self.lives--;
};

Player.prototype.update = function() {
    var self = this;

    self.x = self.x + self.dx * self.speed;
    self.y = self.y + self.dy * self.speed;

    this.checkLimits();
};

Player.prototype.checkLimits = function() {
var self = this;

    // checks outer walls
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
}

Player.prototype.draw = function() {
    var self = this;
    
    // center the center
    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.drawImage(self.character, self.xPosition, self.yPosition, self.size, self.size);
};