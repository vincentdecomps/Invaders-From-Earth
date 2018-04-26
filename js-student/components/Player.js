// Create Player Component
Crafty.c("Player", {
  required: "2D, Canvas, Twoway, SpriteAnimation, Collision, ship",
  /* This function will be called when the component is added to an entity */
  init: function() {
    this.score = 0;
    this.x = 254 - 32 / 2;
    this.y = GAME_HEIGHT - (34*2);
    this.twoway(275);
    this.bindEvents(this);
  },

  bindEvents: function(that) {
    that.bind("KeyDown", function(event) {
      if (event.key == Crafty.keys["SPACE"]) {
        Crafty.trigger('player_fired', that);
        Crafty.audio.play("Shoot")
      }
      if (event.key == Crafty.keys["E"]) {
        alert('Why are you pressing E? You trying to hack, ya creep? ');
      }
    }).bind("EnterFrame", function(e) {
      // do something !
      if (this.x <0){
        this.x = 0
        }
      if (this.x >470){
        this.x = 470
      }

    }).bind('EnemyHit', function(data){
      Crafty.log('EnemyHit:',data)
      //this.score += data.points;

      // Check if we need to update the hi-score
      // if(this.score > __hiScore){
      //     __hiScore = this.score;
      // }

      // Tell the Game that an enemy has been enemy_destroyed
      Crafty.trigger('enemy_destroyed');
    }).onHit('EnemySimple', function(o) {
      for (var i = 0; i < o.length; i++) {
        o[i].obj.trigger("explode_bullet");
      }
      //Explosion
      Crafty.e('Explosion').playPlayerExplosion({x: this.x-10, y: this.y-10});
      Crafty.trigger('player_killed');
      Crafty.audio.play("WillHelmScream")
      this.destroy();
    });
  },

  fire: function() {
    Crafty.e("Bullet").fire(0, {
      x: this.x + this.w / 2 - 3, // 3 is the bullet width divided by 2
      y: this.y - 20
    });
  },

  talk: function() {
    Crafty.log("Player 1 Ready!")
  }
})
