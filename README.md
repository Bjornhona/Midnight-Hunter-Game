# Project's name
"Midnight Hunter"

## Description
A simple game in Javascript based on Canvas. In a desperate attempt to find the love of his life, the hunter tries to find available girls in the dark while trying to avoid devastating ex boyfriend enemies. He starts with five lives, but then loses one life each time he is caught by an enemy. The You Win condition is when the hunter has confronted all girls available in the night. The hunter gains full lives for each level as he quickly recovers after a big kiss. The Game Over condition, no more lives. If all levels are acomplished, the hunter has finally found true love and therefore wins.


## MVP (DOM - CANVAS) // To do
CANVAS game. MVP definition: A player moves around in a room with a few blocking walls. There will be kissable friends appearing on the oppisite side of the canvas. The friend is first created in static state, then the motions will be defined. The "frienemy" will be created, first in static state, then with motions defined. The frienemies will then be separated into "friends" and "enemies" and will be given different conditions. Also outer and inner Walls will be blocking the way of both runner, friends and enemies. Their collision with the walls will change their direcctions.


## Backlog // Challenge
Add pause
Add Win Screen
Add darkness
Design
Images
Add music
Add sounds
Add levels
Mobile version
Add walls


## Data structure

### game.js

```javascript

Game() {
  self.gameIsOver
  self.lives
  self.levels
}

Game.prototype.start(
  buildDom()
  self.lives
  self.levels
  self.canvas
  self.width
  self.height
  nightHunter = new Player()
  addEventListener
  self.startLoop()
)

Game.prototype.startLoop(
  ctx
  loop() {
    //create friends & enemies now and then
    friends = new Friend()
    enemies = new Enemy()
    
    //update positions
    self.player.update()
    self.player.update()
    self.enemies.update()
    
    //check if player collided with friends or enemies and if true remove
    self.checkIfEnemiesCollidedPlayer()
    self.checkIfFriendsCollidedPlayer()

    //loose life
    
    //erase canvas
    ctx.clearRect()
    
    //draw
    self.player.draw()
    self.friends.draw()
    self.enemies.draw()
    Frame(loop)
   }
   Frame(loop)
)
```

### player.js

```javascript
Player(canvas, lives) {
  self.x
  self.y
  self.direction X
  self.direction Y
  self.size
  self.speed
  self.canvas
  self.ctx
}

Player.prototype.setDirection()
Player.prototype.collidesWithEnemies()
Player.prototype.collided()
Player.prototype.update()
Player.prototype.draw()
```

### friendemy.js

```javascript
friendemy(canvas, x, y, speed) {
  self.x
  self.y
  self.direction 0
  self.size
  self.speed
  self.canvas
  self.ctx
  self.isFriend
}

friendemy.prototype.update()
friendemy.prototype.draw()
friendemy.prototype.isInScreen()
```


## States y States Transitions
Definition of the different states and their transition (transition functions)

```javascript
- splashScreen()
  - destroyGameOver()
  - destroyYouWin()
  - destroyRules()
  - buildSplash()
  - addEventListener(startGame)

- rules()
  - destroySplash()
  - buildRules()
  - addEventListener(splashScreen)
  
- startGame()
  - destroySplash()
  - create new Game()
  - game.start()
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener(click, splashScreen) 

- youWin()
  - destroyGame()
  - buildYouWin()
  - addEventListener(click, splashScreen)
  ```


## Task
Task definition in order of priority
```
* create files javascript
* Main - buildDom
* Main - buildSplash
* Main - addEventListener
* Main - destroySplash
* Game - buildDom
* Main - GameOver
* Main - buildGame
* Main - destroy Game
* Game - TimeOut test
* Main - buildGameOver 
* Main - destroyGameOver RESTART
* Main - buildYouWin
* Main - destroyYouWin RESTART
* Game - addEventListener
* Game - loop
* Game - create player
* Player - draw
* Player - update
* Player - check if still in screen
* Player - collision
* Player - directions
* Game - player, friends and enemies position
* Game - clear
* Game - create friends
* Game - create enemies
* Friends - draw
* Friends - update
* Friends - check if still in screen
* Fiends - collision
* Enemy - draw
* Enemy - update
* Enemy - check if still in screen
* Enemy - collision
* Game - collision + remove
* Game - lives
* Game - loves
* Game - gameOver
```


## Links

### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
