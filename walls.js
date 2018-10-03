'use strict';

function Wall (canvas, x, y, type, size) {
    var self = this;

    self.canvasElement = canvas;
    self.x = x;
    self.y = y;
    self.type = type;
    self.size = size;
    self.horizontalWallImage = new Image();
    self.verticalWallImage = new Image();
    self.squareWallImage = new Image();
    self.horizontalWallImage.src = 'images/horizontal.png';
    self.verticalWallImage.src = 'images/vertical.png';
    self.squareWallImage.src = 'images/square.png';
    self.ctx = self.canvasElement.getContext('2d');
}

Wall.prototype.draw = function () {
  var self = this;

  self.xPosition = self.x - (self.size/2);
  self.yPosition = self.y - (self.size/2);
  if (self.type === 'horizontal') {
      self.ctx.drawImage(self.horizontalWallImage, self.xPosition, self.yPosition, self.size/2, self.size);
  } else if (self.type === 'vertical') {
      self.ctx.drawImage(self.verticalWallImage, self.xPosition, self.yPosition, self.size, self.size/2);
  } else if (self.type === 'square') {
      self.ctx.drawImage(self.squareWallImage, self.xPosition, self.yPosition, self.size, self.size);
  }

};
// strokeRect