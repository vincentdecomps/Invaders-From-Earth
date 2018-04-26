// Create Enemy Component
Crafty.c("EnemySimple", {
  required: "2D, Canvas, SpriteAnimation, Collision, Gravity, bee",
  /* This function will be called when the component is added to an entity */
  init: function() {
    let that=this;
    this.counter = 0;
    this.points = 100;
    this.inPlay = true;
    this.bindEvents(this);
  },

  afterInit: function(props){
    this.x = props.x;
    this.y = props.y;
    this.reel('EnemySimpleMove', 1000, [[0, 0],[1, 0]]);
    this.animate('EnemySimpleMove', -1);

    /*** SOLUTION CODE ***/
    this.gravity();
    this.gravityConst(props.speed);
  },

  bindEvents: function(self) {
    self.bind("EnterFrame", function(e) {
      if(self.y > 650){
        self.destroy();
        console.log("Enemy Destroyed!");
        Crafty.audio.play("Bullet-Passing");
      }
    }).onHit('Bullet', function(o) {
      let bullet = o[0].obj;
      Crafty.trigger('Enemy Killed');
      bullet.trigger("explode_bullet");
      Crafty.e('Explosion').play({x: self.x-20, y: self.y - 20});
      Crafty.audio.play("Gun-Shot");
      self.destroy();

      // Update score
      //__score += 100;
    });
  },

  talk: function() {
    console.log("Enemy 1 Ready!")
  },

  fire: function() {
    Crafty.e("Bullet").fire(1, {
      x: this.x - this.w / 2 - 3, // 3 is the bullet width divided by 2
      y: this.y + this.h+1
    });
  },
})
