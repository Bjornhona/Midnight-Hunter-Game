function Mobile (canvas, x, y, arrow) {
  var self = this;

  self.canvasElement = canvas;
  self.arrow = arrow;
  self.x = x;
  self.x = y;
  self.size = 50;
  self.ctx = self.canvasElement.getContext('2d');
  self.arrowUp = new Image();
  self.arrowUp.src = 'images/1513313790emoji-love-cute-png.png';
  self.arrowDown = new Image();
  self.arrowDown.src = 'images/1513313790emoji-love-cute-png.png';
  self.arrowLeft = new Image();
  self.arrowLeft.src = 'images/1513313790emoji-love-cute-png.png';
  self.arrowRight = new Image();
  self.arrowRight.src = 'images/1513313790emoji-love-cute-png.png';
}

Mobile.prototype.draw = function () {
  var self = this;

  self.xPosition = self.x - self.size;
  self.yPosition = self.y - self.size;
  if (self.arrow === 'arrowUp') {
      self.ctx.drawImage(self.arrowUp, self.x, (self.yPosition-self.size), self.size, self.size);
  } else if (self.arrow === 'arrowDown') {
      self.ctx.drawImage(self.arrowDown, self.x, self.yPosition, self.size, self.size);
  } else if (self.arrow === 'arrowLeft') {
      self.ctx.drawImage(self.arrowLeft, self.xPosition, (self.yPosition-self.size), self.size, self.size);
  } else if (self.arrow === 'arrowRight') {
      self.ctx.drawImage(self.arrowRight, self.xPosition, self.yPosition, self.size, self.size);
  }

};