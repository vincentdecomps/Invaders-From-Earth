/******************************************************************
/******************************************************************
/******************************************************************

db      d88888b .d8888. .d8888.  .d88b.  d8b   db           .d888b.
88      88'     88'  YP 88'  YP .8P  Y8. 888o  88           88' `8D
88      88ooooo `8bo.   `8bo.   88    88 88V8o 88           `V8o88'
88      88~~~~~   `Y8b.   `Y8b. 88    88 88 V8o88              d8'
88booo. 88.     db   8D db   8D `8b  d8' 88  V888             d8'
Y88888P Y88888P `8888Y' `8888Y'  `Y88P'  VP   V8P            d8'

**************************************************
******* ADDING SCORE ********
**************************************************

 */

/**** GLOBAL VARIABLES ****/
var __gameState;
var __player;
var __score = 0;

/**** SPRITES ****/
Crafty.sprite("img/ship.png", {
  ship: [0, 0, 32, 34]
});
Crafty.sprite(26, 20, "img/enemy-1-sprite-T20x26.png", {
  bee: [0, 0]
});
Crafty.sprite(6, 16, "img/ship-bullet-T6x16.png", {
  bullet: [0, 0]
});
Crafty.sprite(60, 60, "img/enemy-explosion-T60x60.png", {
  enemy_explosion: [0, 0]
});
Crafty.sprite(60, 64, "img/player-explosion-T60x64.png", {
  player_explosion: [0, 0]
});

/**** SOUNDS ****/
Crafty.audio.add("enemy-explode", "snd/explosion.wav");
Crafty.audio.add("WillHelmScream", "snd/WillHelmScream.wav");
Crafty.audio.add("Chewbacca", "snd/chewy_roar.wav");
Crafty.audio.add("ship-shoot", "snd/blaster-firing.wav");
Crafty.audio.add("Gun-Shot", "snd/Rifle Gun Shot.wav");
Crafty.audio.add("Bullet-Passing", "snd/Bullet Passing.wav");

/**** EVENTS ****/
Crafty.bind('player_killed', function() {
  displayGameOver();
  __gameState = 'dead';
});
Crafty.bind('EnterFrame', function() {
  displayPlayerScore()
  if (__score === 10) {
    var ent = Crafty.e("2D, DOM, Image").image("img/KeepCalm.jpg").attr({ x: 150, y: 5, })
  }
});
Crafty.bind('player_fired', function(player) {
  player.fire();
  Crafty.audio.play("ship-shoot");
});
Crafty.bind('Enemy Killed', function(){
  __score += 10;
});

initialiseGame();

function initialiseGame(){
  // Draw screen after all assets load
  Crafty.init(GAME_WIDTH, GAME_HEIGHT, document.getElementById('game'));

  // Add black Background with no image
  Crafty.background('#000000');

  // Create the Starfield
  __starField = new Starfield(game);
  __starField.start();

  // Add a Player
  __player = Crafty.e("Player");

  // Spawn your ENEMIES
  spawnEnemies(1000);

}

// Write a spawnEnemies() function
function spawnEnemies(interval) {
  Crafty.e("Delay").delay(function(){
    if (__gameState!= "dead"){
      var enemy = Crafty.e("EnemySimple");
      enemy.afterInit({x: Crafty.math.randomNumber(40, 460) , y: -34, speed: 50 + __score/50});
    }
  }, interval, -1)
}

/*
 ___                  _   _
/ _ \ _   _  ___  ___| |_(_) ___  _ __  ___
| | | | | | |/ _ \/ __| __| |/ _ \| '_ \/ __|
| |_| | |_| |  __/\__ \ |_| | (_) | | | \__ \
\__\_\\__,_|\___||___/\__|_|\___/|_| |_|___/

1. In order to update the score you must add some code to EnemySimple.js in the onHit event.
  You must update the __score variable by adding some number to it.

 */
