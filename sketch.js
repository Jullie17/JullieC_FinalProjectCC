// main sketch
let p, g;
let GRAVITY=.75;
let jump=20;
let o_speed=10;
let pause=false;
let p_height = 0;
let jumpCounter=0;
let end=false;
let score =0;
let o;
let speed;


//image
let bg_1;
let bunny;
//font
let g_font;

//obstacle variables array
let obstacle_1 = [550, 100, 100];
let obstacle_2 = [550, 50, 200];
let obstacle_3 = [300, 100, 50];

//obstacle
//let obstacle;

//bunny flying
let bunny_fly;
let bunny_running;
let bunny_sleep;
let bunny_dead;
let bunny_slide;

//background music
let bg_music;
let jump_sound;
let game_over;

let bonus=0;

function preload(){
  //bunny = loadAnimation('assets/bunny_001.png');
  bg_1 = loadImage('assets/sunny_bg.PNG');
  img_bunny = loadImage('assets/bunny001.png');
  g_font = loadFont('assets/Robotron-0Wvvo.ttf');

  bunny_sleep = loadAnimation('assets/bunny_sleeping_001.png', 'assets/bunny_sleeping_017.png');
  bunny_dead = loadAnimation('assets/bunny_dead_001.png', 'assets/bunny_dead_015.png')
  //bunny_slide = loadImage('assets/bunny_slide.PNG');
  //adding bunny image on the player
  //p = createSprite(width/3, 400); //p as a player
  //p.addImage(loadImage("bunny001.png"));

  bg_music = loadSound('assets/bg_music.mp3');
  jump_sound = loadSound('assets/Bunny_jump_sound_effect.m4a');
  game_over = loadSound('assets/game_over_sound_1.mp3');
}

function setup() {
  // put setup code here
  createCanvas(1280, 800);
  

   
  //p = createSprite(width/3, 400, 100, 100); //p as a player
  p = createSprite(width/3, 400, 200, 100); //p as a player
  p.addImage(img_bunny);
  //p.addImage(loadImage("bunny001.png"));

  g = createSprite(width/2, 700, width, 200); 
  g.addImage(loadImage('assets/grass.PNG'));


  carrot = createSprite(width/3, 50, 100, 100);
  carrot.addImage(loadImage('assets/carrot.png'));
  carrot.velocity.x = map(score, 0, 50, 5, 30);

  o = new Obstacles(1,2);



    // sprites to be visible
   //p.visible=false;

   

   bunny_fly = loadAnimation('assets/bunny_fly_001.png','assets/bunny_fly_004.png');
   p.addAnimation('jump', bunny_fly);
   //bunny_running = loadAnimation('assets/bunny_run_01.png');
   bunny_running = loadAnimation('assets/bunny_running_001.png','assets/bunny_running_006.png');
   p.addAnimation('run', bunny_running);
   //bunny_sleep = loadAnimation('assets/bunny_sleeping_001.png', 'assets/bunny_sleeping_017.png'); // moved to setup, and made this animation calling bunny_sleep and called them in the if statement where pause ==true

   //bg_music.play(); // only playing the music once 
   bunny_slide = loadAnimation('assets/bunny_slide.png');
   p.addAnimation('slide', bunny_slide);

}

function draw() {

  if(bg_music.isPlaying()==false && pause==false && end==false){
    bg_music.play();
  }

  //speed -------------------------------increasing the speed to its max from 0 to 50---------
  o_speed = map(score, 0, 50, 10, 25);

  // debug -----------------------shows the sprite size the rectangular boxes in order to recognize the collsion b/w the obstacles
  //p.debug=true;

  // game ---------------------------when it wasn't paused ---------------------------------------
  if(pause==false){
    p.velocity.y+=GRAVITY; // adding gravity to the player(bunny)
    

    image(bg_1, 0,0,width, height);
    //background(135, 206, 235);
    //p.collide(g);
    drawSprites();

    //this is player's collision
    if(p.collide(g)){
      p.velocity.y=0;
      jumpCounter=0;
      //running
      p.changeAnimation('run');
    }
    if(p.overlap(o.sprite)){
      end=true;
      pause=true;
    }

    //this is control player's movements
    if(keyWentDown('SPACE')&&jumpCounter<2){
      jumpCounter+=1;
      p.velocity.y= -jump; // - as it is jumping backwards
      p.changeAnimation('jump');
      if(jump_sound.isPlaying()==false){
        jump_sound.play();
      }
    }
    if((o.sprite.position.x<0)){
      score+=1;
      //obstacle starting back from the width
      o.reset();
      //o.sprite.position.x = width;

      /*o_one.position.x = width;
      o_two.position.x = width;
      o_three.position.x=width; */
    }
    (o.sprite).position.x-=o_speed;
    /* o_one.position.x-=o_speed;
    o_two.position.x-=o_speed;
    o_three.position.x-=o_speed; */
    /* o_one.position.x-=o_speed;
    o_two.position.x-=o_speed;
    o_three.position.x-=o_speed; */

    if(score%1==0){
      carrot.visible=true;
    }else{
      carrot.visible=false;
    }
    if(carrot.position.x > width){
      carrot.position.x =0;
    }

    if(p.overlap(carrot)){
      bonus+=0.5;
    }
    

    if(keyDown('DOWN')){
      p.setCollider("rectangle",0,25,100, 50);
      p_height = 50;

      
      p.changeAnimation('slide');
      /*rectMode(CENTER);
      fill(0,100,255);
      rect(p.position.x, p.position.y+25, 100,p_height);*/

    }else{
      p.setCollider("rectangle",0,0,100, 100);
      p_height = 100;

      rectMode(CENTER);
      fill(0,100,255);
      //rect(p.position.x, p.position.y, 100,p_height);
    }

    textFont(g_font);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, CENTER);
    text("Bonus : "+bonus, 20, 80);

    // ---------------------------------------text - score when game is still going 
    textFont(g_font);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(LEFT, CENTER);
    text("YOUR SCORE : "+score, 20, 50);

    //-------------------------------------text - how to jump and lside when game is still going on
    textAlign(LEFT, CENTER);
    if(score<5){
    //space and down
  
    text("How to Jump? -> PRESS 'SPACE' ", 20, height-75);
    text("How to SLIDE? -> PRESS 'DOWN(V)'", 20, height-25);

    }
   
  }
  if(pause==true){
    //console.log(end);
    p.setSpeed(0.00001);

    if(end==true){
      if(game_over.isPlaying()==false){
        bg_music.pause();
        game_over.play();
      }
      //fade out background for pause screen
      strokeWeight(10);
      stroke(150, 80);
      noFill();
      fill(203, 195, 227, 40);
      rect(0, 0, width, height);
      noFill();

      //bunny sleeping animation on the back
      animation(bunny_dead, width/2, height/2);

      textFont(g_font);
      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("GAME OVER, BUNNY DEAD", width/2, height/2-50);
      text("YOUR SCORE : "+(score+bonus), width/2, height/2 +50);
    }else{

      //fade out background for pause screen
      strokeWeight(10);
      stroke(150, 80);
      noFill();
      fill(203, 195, 227, 10);
      rect(0, 0, width, height);
      noFill();

      //bunny sleeping animation on the back
      animation(bunny_sleep, width/2, height/2); // calling the sleeping animation and the x,y position for the animation

      textFont(g_font);
      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("PAUSED, BUNNY SLEEPING", width/2, height/2-50);
    }

    // text of indicating how to restart the game----------------------------------------------------
    textFont(g_font);
    textSize(30);
    text("Press R to RESTART", width/2, height/2);

    // ------------------------------------------------pausing ----------------------------------------------
    if(keyWentDown('R')){
      //obstacle coming out again from the width
      o.reset();
      //o.sprite.position.x = width;
      p.position.y=600;
      pause=false;
      end=false;
      score=0;
      bonus=0;
    }
  }

  // text used in the game
  textFont(g_font);
  noStroke();
  fill(0);

  textAlign(CENTER, CENTER);
  textSize(30);
  text("How to PAUSE? -> PRESS 'A' ", width-250, 25);

  /*
  textAlign(LEFT, CENTER);
  if(score<5){
    //space and down
  
  text("How to Jump? -> PRESS 'SPACE' ", 20, height-75);
  text("How to SLIDE? -> PRESS 'DOWN(V)'", 20, height-25);

  }*/
  

  //text("YOUR SCORE : "+score, 20, 50);

  if(keyWentDown('A')&&end==false){
    if(pause==true){
      pause=false;
    }else{
      pause=true;
    }
      console.log('A');
  }
}