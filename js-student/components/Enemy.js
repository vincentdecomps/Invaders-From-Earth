// Create Enemy Component
Crafty.c("Enemy", {
  required: "2D, Canvas, SpriteAnimation, Motion, AngularMotion, Collision",
  /* This function will be called when the component is added to an entity */
  init: function() {
    let that=this;
    this.counter = 0;
    this.points = 100;
    this.attacking = false;
    this.hdirection = 1; // 1 = RIGHT, -1= LEFT
    this.vdirection = 1; // 1 = DOWN, -1 = UP
    this.bindEvents(this);
  },

  afterInit: function(props){
    this.x = 100 + props.x_offset;
    this.y = 100;
    this.attackWaitTime = Crafty.math.randomNumber(props.attackFrom, props.attackTo);
    this.addComponent(props.type);
    this.type = props.type;
    this.reel('EnemyMove', 1000, [[0, 0],[1, 0]]);
    this.animate('EnemyMove', -1);
  },

  bindEvents: function(that) {
    that.bind('Rotated', function(n) {
      that.counter++;
      if (that.y > 160) {
        // Speed up enemy in 'y' direction with some 'x'
        that.vrotation = 0;
        that.vy += 60;
        that.vx += 30;

        // Fire weapon at some random interval during the main descent
        Crafty.e("Delay").delay(function() {
          that.fire();
        }, Crafty.math.randomNumber(1000,3000), 0);
      }
    }).bind('Move', function(pos) {
      if (that.y > 600 && that.y < 700 && that.vdirection === 1) {
        if (that.rotation < -180) {
          that.rotation += 1
          that.vy += 0;
        } else {
          // Reset motion again by killing the x-component
          that.vx = 0;
        }
      }
      else if(that.y > 700){
        if (that.rotation < -45) {
          that.rotation += 2;
          that.vy -= 1;
          that.vx -= 1;
          that.vdirection = -1;
        }
        else {
          that.vy = -120
          that.vx = -100;
        }
      }
      else if(that.y > 400 && that.y < 600 && that.vdirection === -1){
        that.rotation += 0.2;
        that.vx += 0.2;
      }
      else if(that.y > 100 && that.y < 400 && that.vdirection === -1){
        if(that.rotation < 0){
          that.rotation += 2;
          that.vy = that.vy > 0 ? 0 : that.vy + 4;
          that.vx += 8
        }
      }
      else if(that.y < 100 && that.vdirection === -1){
        that.vy = 0
        that.vx = 0
        that.attacking = false;
      }
    }).bind("EnterFrame", function(e) {
      // Only allow the enemy to do stuff when in the 'play' state
      if(__gameState != STATE.PLAY)
        return;

      // Move enemy ONLY if attack sequence has NOT started
      if (Crafty.frame() % 25 === 0 && !that.attacking) {
        // Change direction code!
        that.hdirection = that.x < 0 || that.x > 400 ? that.hdirection * -1 : that.hdirection;
        that.x += (20 * that.hdirection);
      }
      // If enemy below bottom of screen, return to the top & increase speed
      if (that.y > 768) {
        that.y = -40;
      }
    }).onHit('Bullet', function(o) {
      let bullet = o[0].obj;
      bullet.trigger("explode_bullet");
      // Explosion
      Crafty.log('Reel:',bullet.getReel())
      if(bullet.getReel().id === 'PlayerBullet'){
        Crafty.e('Explosion').play({x: this.x-45, y: this.y-40});
        this.destroy();
      }

      // Lastly - update the player's score
      Crafty.trigger("EnemyHit", {points: this.points});
    }).bind('play_started', function(){
      // Initiate attack
      Crafty.e("Delay").delay(function() {
        that.attack(that);
      }, this.attackWaitTime, 0);
    })
  },

  talk: function() {
    console.log("Enemy 1 Ready!")
  },

  attack: function(that) {
    console.log('Calling attack...')
    that.vrotation = -75;
    that.vy += 20;
    that.vx += 5;
    that.attacking = true;
  },

  fire: function() {
    Crafty.e("Bullet").fire(1, {
      x: this.x - this.w / 2 - 3, // 3 is the bullet width divided by 2
      y: this.y + this.h+1
    });
  },
})
