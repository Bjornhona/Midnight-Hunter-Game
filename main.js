'use strict';

console.log('Midnight Hunter - game starts');

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  
  var splashMain;
  var rulesMain;
  var gameOverMain;
  var youWinMain;

  var game;
  
  /* ---- Splash ---- */

  function buildSplash() {
    destroyGameOver();
    destroyYouWin();
    destroyRulesScreen();

    splashMain = buildDom(`
      <main class="start-main">
        <section class="start-section">
          <h1>Midnight Hunter</h1>
          <button class="start-button button">Start game</button>
          <button class="rules button">Rules</button>
          <img class="start-heart" src="images/heart.png"/>
        </section>
      </main>
    `);

    document.body.appendChild(splashMain);

    var button = splashMain.querySelector('.start-button');
    button.addEventListener('click', buildGame);

    var buttonRules = splashMain.querySelector('.rules');
    buttonRules.addEventListener('click', buildRulesScreen);
  }

  function destroySplash() {
    splashMain.remove();
  }

  function buildRulesScreen() {
    destroySplash();

    rulesMain = buildDom(`
      <main class="rules-screen">
        <div class="description container">
          <div class="button-esc">
            <button class="esc">x</button>
          </div>
          <h1>Rules</h1>
          <div class="text">
            <p class="game-intro">What a great opportunity to find the love of your life!</p>
            <p>Catch lovely ladies or really handsome men to see if you find true love.</p>
            <p>Keep out of extremely jealous ex boyfriends, ex wives etc. unless you wish to end up at the morgue.</p>
            <p>Move around with the <strong>UP</strong>, <strong>DOWN</strong>, <strong>RIGHT</strong> and <strong>LEFT</strong> keys.</p>
            <p>And remember, love don't come easy!!!</p> 
          </div>
          <div class="images">
            <div class="enemies">
              <h2>Meet your worst enemies</h2>
              <div class"ex-images">
                <img class="image-border" src="./images/angry-ex.jpg">
                <img class="image-border" src="./images/scary-ex.jpg">
                <img class="image-border" src="./images/desperate-ex.jpg">
              </div>
            </div>
          </div>
          <div class="rules">
            <ul>
              <li>You lose a life if you get caught by any of the jealous people out there.</li>
              <li>You win the game when you've hit on all the lovely ladies or gentlemen in the night.</li>
              <li>Endless love is in the air!</li>
            </ul>
          </div>
        </div>
      </main>
    `);

    document.body.appendChild(rulesMain);

    var returnSplash = rulesMain.querySelector('.esc');
    returnSplash.addEventListener('click', buildSplash);
  }

  function destroyRulesScreen() {
    if (rulesMain){
      rulesMain.remove();
    }
  }

  /* ---- Game ---- */

  function buildGame() {
    destroySplash();
    
    game = new Game();
    // if (game.gameIsOver) {
    //   game.onOver(buildGameOver);
    // } else if (game.youWonGame) {
    //   game.onOver(buildYouWin);
    // }
    game.onOver(buildGameOver);
    game.start();
    
  }

  function destroyGame() {
    game.destroy();
  }

  /* ---- Game Over ---- */

  function buildGameOver() {
    destroyGame();

    gameOverMain = buildDom(`
      <main class="game-over-screen">
        <div class="game-over">
          <div class="inner-container">
            <h1>Game over</h1>
            <p>Oh noooo, toxic people can ruin your life.</p>
            <p>Better luck next time!</p>
            <button class="restart-button button">Play Again</button>
            <img class="image-game-over" src="./images/toxic-gas-mask-clipart-at-picture-26.png"/>
          </div>
        </div>
      </main>
    `);
    document.body.appendChild(gameOverMain);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', buildSplash);
  }

  function destroyGameOver() {
    if(gameOverMain) {
      gameOverMain.remove();
    }
  }

  /* --- You Win ---- */

  function buildYouWin() {
    destroyGame();

    youWinMain = buildDom(`
      <main class="you-win-screen">
        <div class="you-win">
          <h1>You win</h1>
          <p>Congratulations! You found true love at midnight.</p>
          <p>Make it last!</p>
          <button class="restart-button button">Play Again</button>
          <img class="love-doves" src="./images/png-love.png"/>
        </div>
      </main>
    `);
    document.body.appendChild(youWinMain);

    var button = youWinMain.querySelector('button');
    button.addEventListener('click', buildSplash);

  }

  function destroyYouWin() {
    if(youWinMain) {
      youWinMain.remove();
    }
  }

  buildSplash();

}

window.addEventListener('load', main);