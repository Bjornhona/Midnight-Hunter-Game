
'use strict';

function Game() {
    var self = this;

    self.gameIsOver = false;
    self.isPause = false;
    self.intervalId = 0;
    self.rateEnemies;
    self.rateLives;
    self.speedFriends;
    self.speedEnemies;
    self.speedLives;
    self.message = '';
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game">
      <header>
        <div class="lives">
          <span class="label">Lives :</span>
          <span class="value"></span>
        </div>
        <div class='lives-images'>
          <img class="one-full-life" src="/images/lives1.jpg"/>
          <img class="two-full-lives" src="/images/lives2.jpg"/>
          <img class="three-full-lives" src="/images/lives3.jpg"/>
          <img class="one-life-gone hidden" src="/images/lives3.jpg"/>
          <img class="two-lives-gone hidden" src="/images/lives3.jpg"/>
          <img class="one-lives-gone hidden" src="/images/lives3.jpg"/>
        </div>
        <a href="#"><img src="/images/pause.png"/></a>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
      <audio class="soundtrack"><source type="audio/mpeg" /></audio>     
    </main>
  `);

  document.body.appendChild(self.gameMain);

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.canvasParentElement.querySelector('canvas');
  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.audioElement = self.gameMain.querySelector('.soundtrack');
  self.audioElement.src = './music/diva.mp3';

  self.friendsSound = new Audio("./music/collision-friends.mp3");
  self.enemiesSound = new Audio("./music/collision-enemies.mp3");
  
  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 5, self.characterScreen.img);

  self.handleKeyDown = function(event) {
      if (event.key === 'ArrowLeft' || event.target.classList.contains('left')) {
        self.player.setDirection(-1);
      } else if (event.key === 'ArrowRight' || event.target.classList.contains('right')) {
        self.player.setDirection(1);
      }
  }

  self.upTouchButton = self.gameMain.querySelector('.up');
  self.leftTouchButton = self.gameMain.querySelector('.left');
  self.rightTouchButton = self.gameMain.querySelector('.right');
  self.downTouchButton = self.gameMain.querySelector('.down');  
  self.leftTouchButton.addEventListener('click', self.handleKeyDown);
  self.rightTouchButton.addEventListener('click', self.handleKeyDown);

  document.body.addEventListener('keydown', self.handleKeyDown)

  self.starLoop();

  self.enemies = [];
  self.points = [];
  self.lives = [];

  function roundTime () {
      self.level++;
      self.message = new Message (self.canvasElement, 'Level ' + self.level);
      

      setTimeout(function() {
          self.message = null;
      }, 2000)

      if (self.level >= 5) {
          clearInterval(self.intervalId);
      }
      
  }
  self.intervalId = setInterval(roundTime, 15000);
};