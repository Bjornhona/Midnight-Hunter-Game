'use strict';

function Wall (canvas, x, y, type) {
    var self = this;

    self.canvasElement = canvas;
    self.x = x;
    self.y = y;
    self.type = type;
     new Image();
    self.verticalWallImage = new Image();
    self.horizontalWallImage = new Image();
    self.squareWallImage = new Image();
    self.horizontalWallImage.src = 'images/horizontal.png';
    self.verticalWallImage.src = 'images/vertical.png';
    self.squareWallImage.src = 'images/square.png';
    self.ctx = self.canvasElement.getContext('2d');
    if (self.type === 'square') {
        self.width = 150;
        self.height = 150;
    } else if (self.type === 'horizontal') {
        self.width = 150;
        self.height = 75;
    } else if (self.type === 'vertical') {
        self.width = 75;
        self.height = 150;
    }
}

Wall.prototype.draw = function () {
  var self = this;

  self.xPosition = self.x - (self.width/2);
  self.yPosition = self.y - (self.height/2);
  if (self.type === 'horizontal') {
      self.ctx.drawImage(self.horizontalWallImage, self.xPosition, self.yPosition, self.width, self.height);
  } else if (self.type === 'vertical') {
      self.ctx.drawImage(self.verticalWallImage, self.xPosition, self.yPosition, self.width, self.height);
  } else if (self.type === 'square') {
      self.ctx.drawImage(self.squareWallImage, self.xPosition, self.yPosition, self.width, self.height);
  }
};