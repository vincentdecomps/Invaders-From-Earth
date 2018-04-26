/******************************************************************
/******************************************************************
/******************************************************************

888                                                            888888888
888                                                            888
888                                                            888
888      .d88b.  .d8888b  .d8888b   .d88b.  88888b.            8888888b.
888     d8P  Y8b 88K      88K      d88""88b 888 "88b                "Y88b
888     88888888 "Y8888b. "Y8888b. 888  888 888  888                  888
888     Y8b.          X88      X88 Y88..88P 888  888           Y88b  d88P
88888888 "Y8888   88888P'  88888P'  "Y88P"  888  888            "Y8888P"

********************************************
******* ADDING GRAVITY TO OUR ENEMY ********
********************************************

 */

/**** GLOBAL VARIABLES ****/
var __gameState;
var __player;

/**** SPRITES ****/
Crafty.sprite("../img/ship.png", {
  ship: [0, 0, 32, 34]
});
Crafty.sprite("../img/enemy-1-sprite-T20x26.png", {
  bee: [0, 0, 26, 20]
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

  // Add an Enemy
  let enemy = Crafty.e("EnemySimple");
  enemy.afterInit({x: 100, y: 100, speed: 300});
}

/*
 ___                  _   _
/ _ \ _   _  ___  ___| |_(_) ___  _ __  ___
| | | | | | |/ _ \/ __| __| |/ _ \| '_ \/ __|
| |_| | |_| |  __/\__ \ |_| | (_) | | | \__ \
\__\_\\__,_|\___||___/\__|_|\___/|_| |_|___/

1. Our enemy should now have gravity. However, you will notice that it isn't falling.
  You need to alter the code in js/components/EnemySimple.js to uncomment the gravity
  function and the gravityConst function in the afterInit function.

2. Once you have done that, you can test your code and see if it now has gravity.
   Remember to look for errors in Chrome dev tools if it is still not working.

3. Change the gravity speed by calling the gravityConst function and passing it a number around 500
   which is the default/normal gravity strength in CraftyJS

 */
