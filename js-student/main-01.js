/******************************************************************
/******************************************************************
/******************************************************************


 _        _______  _______  _______  _______  _               __
( \      (  ____ \(  ____ \(  ____ \(  ___  )( (    /|      /  \
| (      | (    \/| (    \/| (    \/| (   ) ||  \  ( |      \/) )
| |      | (__    | (_____ | (_____ | |   | ||   \ | |        | |
| |      |  __)   (_____  )(_____  )| |   | || (\ \) |        | |
| |      | (            ) |      ) || |   | || | \   |        | |
| (____/\| (____/\/\____) |/\____) || (___) || )  \  |      __) (_
(_______/(_______/\_______)\_______)(_______)|/    )_)      \____/


********************************
**** CONCEPTS AND GAME INFO ****
********************************

 */


/**** GLOBAL VARIABLES ****/
var __gameState;

function initialiseGame(){
  // Draw screen after all assets load
  Crafty.init(GAME_WIDTH, GAME_HEIGHT, document.getElementById('game'));

  // Add black Background with no image
  var colours = ['red','green','blue']
  var counter=0;
  setInterval(function () {
    Crafty.background(colours[counter]);
    counter ++
    if (counter > 2) {
      counter = 0;
    }
  }, 250);
}

/*** SOLUTION CODE ***/
initialiseGame()

/*
 ___                  _   _
/ _ \ _   _  ___  ___| |_(_) ___  _ __  ___
| | | | | | |/ _ \/ __| __| |/ _ \| '_ \/ __|
| |_| | |_| |  __/\__ \ |_| | (_) | | | \__ \
\__\_\\__,_|\___||___/\__|_|\___/|_| |_|___/

  1. Name 1 variable in the above code

  2. Name 1 function in the code above

  3. Run the code:
    - Make sure your python webserver is started

    To start a python webserver, open up a command line and navigate to your project directory.
    Now type the following:

    python -m SimpleHTTPServer 8000

    - In Chrome open a new tab. Goto http://localhost:8000, your page should appear!

  4. You are currently missing the game!! In order to see it you must call a function.
     Which function should you call? Can you add the function call in the above code and
     test the game again to see if your change worked?

  5. Change the background color

  6. Finally, what is 'Crafty' in the code above?



 */
