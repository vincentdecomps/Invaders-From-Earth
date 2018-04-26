/******************************************************************
/******************************************************************
/******************************************************************

.-.   .----. .----. .----. .---. .-. .-.        .---.
} |   } |__}{ {__-`{ {__-`/ {-. \|  \{ |        `-`} }
} '--.} '__}.-._} }.-._} }\ '-} /| }\  {          / /
`----'`----'`----' `----'  `---' `-' `-'         `-'

********************************************
******* ADDING BULLETS & COLLISIONS ********
********************************************

 */

/**** GLOBAL VARIABLES ****/
var __gameState;
var __player;

/**** EVENTS ****/
Crafty.bind('player_fired', function(player) {
  /*** SOLUTION CODE ***/
  player.fire();
});
/**** SPRITES ****/
Crafty.sprite("../img/ship.png", {
  ship: [0, 0, 32, 34]
});
Crafty.sprite("../img/enemy-1-sprite-T20x26.png", {
  bee: [0, 0, 24, 20]
});
Crafty.sprite(6, 16, "../img/ship-bullet-T6x16.png", {
  bullet: [0, 0]
});
Crafty.sprite(60, 60, "../img/enemy-explosion-T60x60.png", {
  enemy_explosion: [0, 0]
});

initialiseGame();

function initialiseGame(){
  // Draw screen after all assets load
  Crafty.init(GAME_WIDTH, GAME_HEIGHT, document.getElementById('game'));

  // Add RGB Background that changes colour
  var colours = ['red','green','blue']
  var counter=0;
  setInterval(function () {
    Crafty.background(colours[counter]);
    counter ++
    if (counter > 2) {
      counter = 0;
    }
  }, 250);

  // Create the Starfield
  __starField = new Starfield(game);

  // Start the __starField
  /*** SOLUTION CODE ***/
  __starField.stars = 1000;
  __starField.maxVelocity = 200;
  __starField.minVelocity = 50;
  __starField.fps = 60;
__starField.start();


  // Add a Player
  __player = Crafty.e("Player");

  // Add an Enemy
  // Add a for...loop
  /*** SOLUTION CODE - FOR...LOOP ***/
 // Write and call a spawnEnemies() function
  /*** SOLUTION CODE FOR SPAWN ENEMY EVERY SECOND ***/
setInterval (function () {
    var xPos = Crafty.math.randomInt(1, 400)
    var yPos = Crafty.math.randomInt(1, 200)
    let enemy = Crafty.e("EnemySimple")
     enemy.afterInit({x: xPos, y: yPos, speed: 10});
}, 1000);



}

/*
 ___                  _   _
/ _ \ _   _  ___  ___| |_(_) ___  _ __  ___
| | | | | | |/ _ \/ __| __| |/ _ \| '_ \/ __|
| |_| | |_| |  __/\__ \ |_| | (_) | | | \__ \
\__\_\\__,_|\___||___/\__|_|\___/|_| |_|___/

1. The event 'player_fired' is written for you above. Your task is to add 1 line of code inside the event.
   The line of code calls the 'fire' function on the Player ie. your ship.
   Write the line of code in!

2. How can we make our player and bullets faster ?


 */
