/******************************************************************
/******************************************************************
/******************************************************************

_|                                                                    _|_|
_|          _|_|      _|_|_|    _|_|_|    _|_|    _|_|_|            _|    _|
_|        _|_|_|_|  _|_|      _|_|      _|    _|  _|    _|            _|_|
_|        _|            _|_|      _|_|  _|    _|  _|    _|          _|    _|
_|_|_|_|    _|_|_|  _|_|_|    _|_|_|      _|_|    _|    _|            _|_|

**************************************************
******* ADDING SOUNDS ********
**************************************************

 */

/**** GLOBAL VARIABLES ****/
var __gameState;
var __player;
var __score = 0;

/**** SPRITES ****/
Crafty.sprite("../img/ship.png", {
  ship: [0, 0, 32, 34]
});
Crafty.sprite(26, 20, "../img/enemy-1-sprite-T20x26.png", {
  bee: [0, 0]
});
Crafty.sprite(6, 16, "../img/ship-bullet-T6x16.png", {
  bullet: [0, 0]
});
Crafty.sprite(60, 60, "../img/enemy-explosion-T60x60.png", {
  enemy_explosion: [0, 0]
});
Crafty.sprite(60, 64, "../img/player-explosion-T60x64.png", {
  player_explosion: [0, 0]
});

/**** LOAD SOUNDS ****/
/*** SOLUTION CODE ***/
Crafty.audio.add("ship-shoot", "../snd/laser_default.wav");
Crafty.audio.add("enemy-explode", "./snd/explosion.wav");

/**** EVENTS ****/
Crafty.bind('player_fired', function(player) {
  player.fire();
  /*** SOLUTION CODE - PLAY SOUNDS ***/
  Crafty.audio.play("ship-shoot");
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
    var enemy = Crafty.e("EnemySimple");
    enemy.afterInit({x: Crafty.math.randomNumber(40, 460) , y: -34, speed: 50 + __score/10});
  }, interval, -1)
}


/*
 ___                  _   _
/ _ \ _   _  ___  ___| |_(_) ___  _ __  ___
| | | | | | |/ _ \/ __| __| |/ _ \| '_ \/ __|
| |_| | |_| |  __/\__ \ |_| | (_) | | | \__ \
\__\_\\__,_|\___||___/\__|_|\___/|_| |_|___/

1. Add a sound effect when the player shoots

 */
