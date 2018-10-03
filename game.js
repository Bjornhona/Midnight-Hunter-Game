
'use strict';

function Game() {
    var self = this;

    self.gameIsOver = false;
    self.youWonGame = false;
    self.isPause = false;
    self.intervalId = 0;
    self.rateEnemies;
    self.rateLives;
    self.speedFriends;
    self.speedEnemies;
    self.speedLives;
    self.numOfFriends = 1;
    self.numOfEnemies = 4;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game">
      <header class="game-header">
        <div class="lives-and-loves">
          <div class="lives">
            <h3>Lives</h3>
            <div class='lives-images'>
              <span class="one-life">★</span>
              <span class="two-lives">★</span>
              <span class="three-lives">★</span>
              <span class="four-lives">★</span>
              <span class="five-lives">★</span>
            </div>
          </div>
          <div class="loves">
            <h3>Loves</h3>
            <div class='loves-images'>
              <span class="one-love hidden">♥</span>
              <span class="two-loves hidden">♥</span>
              <span class="three-loves hidden">♥</span>
              <span class="four-loves hidden">♥</span>
              <span class="five-loves hidden">♥</span>
            </div>
          </div>
        </div>
        <div class="pause-button">
          <button class="pause esc">||</button>
          <button class="pause-play esc hidden">▶︎</button>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
      <div class="mobile">
        <div class="up-and-down">
          <img class="button-up hidden arrows" src="images/up-arrow.png"/>
          <img class="button-down hidden arrows" src="images/down-arrow.png"/>
        </div>
        <div class="left-and-right">
          <img class="button-left hidden arrows" src="images/left-arrow.png"/>
          <img class="button-right hidden arrows" src="images/right-arrow.png"/>
        </div>
      </div>
      <audio class="soundtrack"><source type="audio/mpeg" /></audio>     
    </main>
  `);

  document.body.appendChild(self.gameMain);

  function timeOutTest() {
    let timerId = window.setTimeout(function() {
      self.onGameOverCallback();
    }, 2000);
  }

  // timeOutTest();

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.canvasParentElement.querySelector('canvas');
  self.audioElement = self.gameMain.querySelector('.soundtrack');
  self.audioElement.src = 'sounds/John_Paul_Young_-_Love_Is_In_The_Air_1978[ListenVid.com].mp3';

  self.friendsSound = new Audio("./sounds/Kiss-sound.mp3");
  self.enemiesSound = new Audio("./sounds/Wilhelm-Scream.mp3");
  
  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 5, 5);

  self.mobileArrowUp = document.querySelector('.button-up');
  self.mobileArrowDown = document.querySelector('.button-down');
  self.mobileArrowLeft = document.querySelector('.button-left');
  self.mobileArrowRight = document.querySelector('.button-right');

  self.handleKeyDown = function(event) {
      if (event.key === 'ArrowLeft' || event.target.classList.contains('left')) {
        self.player.setDirection(-1, 0);
      } else if (event.key === 'ArrowRight' || event.target.classList.contains('right')) {
        self.player.setDirection(1, 0);
      } else if (event.key === 'ArrowUp' || event.target.classList.contains('up')) {
        self.player.setDirection(0, -1);
      } else if (event.key === 'ArrowDown' || event.target.classList.contains('down')) {
        self.player.setDirection(0, 1);
      }
  }

  document.body.addEventListener('keydown', self.handleKeyDown);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    self.numOfFriends = 1;
    self.numOfEnemies = 1;

    self.mobileArrowUp.classList.remove('hidden');
    self.mobileArrowDown.classList.remove('hidden');
    self.mobileArrowLeft.classList.remove('hidden');
    self.mobileArrowRight.classList.remove('hidden');
  
    self.mobileArrowUp.addEventListener('touchstart', function() {
      self.player.setDirection(0, -1);
    });
    self.mobileArrowDown.addEventListener('touchstart', function() {
      self.player.setDirection(0, 1);
    });
    self.mobileArrowLeft.addEventListener('touchstart', function() {
      self.player.setDirection(-1, 0);
    });
    self.mobileArrowRight.addEventListener('touchstart', function() {
      self.player.setDirection(1, 0);
    });
  }
  

  self.startLoop();

  self.enemies = [];
  self.friends = [];
  self.walls = [];
  self._spawnWall();

};

Game.prototype._spawnEnemy = function ()  {
  var self = this;

  while (self.enemies.length < self.numOfEnemies) {
    if (Math.random() > 0.999) {
      var randomX = Math.random() * self.width * 0.99;
      self.enemies.push(new Frienemy(self.canvasElement, randomX, 0, 'Enemy'));
    }
  }
};

Game.prototype._spawnFriend = function ()  {
  var self = this;

  while (self.friends.length < self.numOfFriends) {
    if (Math.random() > 0.999) {
      var randomX = Math.random() * self.width * 0.99;
      self.friends.push(new Frienemy(self.canvasElement, randomX, 0, 'Friend'));
    }
  }
};

Game.prototype._spawnWall = function ()  {
  var self = this;

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    self.walls.push(new Wall(self.canvasElement, self.width/3, self.height/3, 'vertical'));
    self.walls.push(new Wall(self.canvasElement, self.width/5*2, self.height/3*2, 'horizontal'));


  } else {
    self.walls.push(new Wall(self.canvasElement, self.width/2, self.height/2, 'vertical'));
    self.walls.push(new Wall(self.canvasElement, self.width/12*3, self.height/12*3, 'horizontal'));
    self.walls.push(new Wall(self.canvasElement, self.width/12*3, self.height/3*2, 'square'));
    self.walls.push(new Wall(self.canvasElement, self.width/12*9, self.height/12*4, 'square'));
    self.walls.push(new Wall(self.canvasElement, self.width/12*9, self.height/12*9, 'horizontal'));
  }
};

Game.prototype.startLoop = function () {
  var self = this;
  self.ctx = self.canvasElement.getContext('2d');

  var pauseButton = document.querySelector('button.pause');
  var playButton = document.querySelector('button.pause-play');
  
  pauseButton.addEventListener('click', function() {
    self.isPause = !self.isPause;
    pauseButton.classList.toggle('hidden');
    playButton.classList.toggle('hidden');
    if(!self.isPause) {
      loop();
      self.audioElement.play();
    }
  });

  playButton.addEventListener('click', function() {
    self.isPause = !self.isPause;
    pauseButton.classList.toggle('hidden');
    playButton.classList.toggle('hidden');
    if(!self.isPause) {
      loop();
      self.audioElement.play();
    }
  });

  self.audioElement.play();

  function loop () {

    self._clearAll();
    self._updateAll();
    self._drawAll();

    // if game is not over
    if(!self.gameIsOver && !self.youWonGame && !self.isPause) {
        window.requestAnimationFrame(loop);
      } else {
        self.audioElement.pause();
      }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype._drawAll = function () {
  var self = this;

  //draw
  self.player.draw();

  self.friends.forEach(function(item) {
      item.draw();
  });

  self.enemies.forEach(function(item) {
    item.draw();
  });

  self.walls.forEach(function (item) {
    item.draw();
  });
}

Game.prototype._clearAll = function () {
  var self = this;
   //erase canvas
   self.ctx.clearRect(0, 0, self.width, self.height);
}

Game.prototype._updateAll = function () {
  var self = this; 
  //update positions
  self.player.update();

  self._spawnEnemy();
  self._spawnFriend();
  

  self.friends.forEach(function(item) {
    item.update();
  });

  self.enemies.forEach(function(item) {
    item.update();
  });

  //check positions
  self.friends.forEach(function(item) {
    item.isInScreen();
  });

  self.enemies.forEach(function(item) {
    item.isInScreen();
  });

  // check if player collide with friends, enemies or walls
  self.checkIfFriendsCollidedPlayer();
  self.checkIfEnemiesCollidedPlayer();
  self.checkIfWallsCollidedPlayer();
  self.checkIfWallsCollidedFriends();
  self.checkIfWallsCollidedEnemies();

  // check if game over
  self.checkIfGameOver();
}

Game.prototype.checkIfEnemiesCollidedPlayer = function() {
  var self = this;

  self.enemies.forEach(function (item, index) {
    var oneLife = self.gameMain.querySelector('span.one-life');
    var twoLives = self.gameMain.querySelector('span.two-lives');
    var threeLives = self.gameMain.querySelector('span.three-lives');
    var fourLives = self.gameMain.querySelector('span.four-lives');
    var fiveLives = self.gameMain.querySelector('span.five-lives');

    if (self.player.collidesWithEnemy(item)) {
      self.player.collidedEnemy();
      self.enemies.splice(index,1);
      self.enemiesSound.play();
      self.enemiesSound.volume = 0.7;

      if (self.player.lives === 4) {
        fiveLives.classList.add('hidden');
      } else if (self.player.lives === 3) {
        fourLives.classList.add('hidden');
      } else if (self.player.lives === 2) {
        threeLives.classList.add('hidden');
      } else if (self.player.lives === 1) {
        twoLives.classList.add('hidden');
      } else if (self.player.lives === 0) {
        oneLife.classList.add('hidden');
      }
    }
  });
};

Game.prototype.checkIfFriendsCollidedPlayer = function () {
  var self = this;

  self.friends.forEach(function (item, index) {
    var oneLove = self.gameMain.querySelector('span.one-love');
    var twoLoves = self.gameMain.querySelector('span.two-loves');
    var threeLoves = self.gameMain.querySelector('span.three-loves');
    var fourLoves = self.gameMain.querySelector('span.four-loves');
    var fiveLoves = self.gameMain.querySelector('span.five-loves');

    if (self.player.collidesWithFriend(item)) {
      self.player.collidedFriend();
      self.friends.splice(index, 1);
      self.friendsSound.play();
      self.friendsSound.volume = 0.7;

      if (self.player.loves === 4) {
        oneLove.classList.remove('hidden');
      } else if (self.player.loves === 3) {
        twoLoves.classList.remove('hidden');
      } else if (self.player.loves === 2) {
        threeLoves.classList.remove('hidden');
      } else if (self.player.loves === 1) {
        fourLoves.classList.remove('hidden');
      } else if (self.player.loves === 0) {
        fiveLoves.classList.remove('hidden');
      }
    }
  });
};

Game.prototype.checkIfWallsCollidedPlayer = function () {
  var self = this;

  self.walls.forEach(function (item) {
    if(self.player.collidesWithWall(item)) {
      self.player.invertDirection();
    }
  });
}

Game.prototype.checkIfWallsCollidedFriends = function () {
  var self = this;

  self.walls.forEach(function (wallItem) {
    self.friends.forEach(function (friendItem) {
      if(friendItem.collidesWithWall(wallItem)) {
        friendItem.invertDirection();
      }
    });
  });
}

Game.prototype.checkIfWallsCollidedEnemies = function () {
  var self = this;

  self.walls.forEach(function (wallItem) {
    self.enemies.forEach(function (enemyItem) {
      if(enemyItem.collidesWithWall(wallItem)) {
        enemyItem.invertDirection();
      }
    });
  });
}

// Game.checkIfWallCollidedFrienemies

Game.prototype.checkIfGameOver = function () {
  var self = this;

  if (!self.player.lives) {
    self.gameOver();
  } else if (!self.player.loves) {
    self.youWon();
  }
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
    var self = this;

    self.gameIsOver = true;
    self.onGameOverCallback('lose');
};

Game.prototype.youWon = function () {
  var self = this;

  self.youWonGame = true;
  self.onGameOverCallback('win');
};

Game.prototype.destroy = function () {
  var self = this;

  self.gameMain.remove();
};