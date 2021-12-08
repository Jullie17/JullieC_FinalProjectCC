let p, g;
let GRAVITY=.75;
let jump=20;
let o_speed=10;
let pause=false;
let p_height = 0;
let jumpCounter=0;
let end=false;
let score =0;
//image
let bg_1;
let bunny;
//font
let g_font;

function preload(){
  //bunny = loadAnimation('assets/bunny_001.png');
  bg_1 = loadImage('assets/sunny_bg.PNG');
  bunny = loadImage('assets/bunny_001.PNG');
  g_font = loadFont('assets/Robotron-0Wvvo.ttf');
}
function setup() {
  // put setup code here
  createCanvas(1280, 800);
  //background(0);
   p = createSprite(width/3, 400, 100, 100); //p as a player
   p = image(bunny, width/3, 400, 100, 100);
   
   g = createSprite(width/2, 700, width, 200); 
   o_one = createSprite(width, 550, 100, 100);
   p.visible=false;
   //g_font = loadFont('libraries/Robotron-0Wvvo.ttf')
}

function draw() {
  p.debug=true;
  if(pause==false){
    p.velocity.y+=GRAVITY;
    
    image(bg_1, 0,0,width, height);
    //background(135, 206, 235);
    //p.collide(g);
    drawSprites();

    //this is player's collision
    if(p.collide(g)){
      p.velocity.y=0;
      jumpCounter=0;
    }
    if(p.overlap(o_one)){
      end=true;
      pause=true;
    }

    //this is control player's movements
    if(keyWentDown('SPACE')&&jumpCounter<2){
      jumpCounter+=1;
      p.velocity.y= -jump; // - as it is jumping backwards
    }
    if(o_one.position.x < 0){
      score+=1;
      o_one.position.x = width;
    }
    o_one.position.x-=o_speed;

    if(keyDown('DOWN')){
      p.setCollider("rectangle",0,25,100, 50);
      p_height = 50;

      rectMode(CENTER);
      fill(0,100,255);
      rect(p.position.x, p.position.y+25, 100,p_height);
    }else{
      p.setCollider("rectangle",0,0,100, 100);
      p_height = 100;

      rectMode(CENTER);
      fill(0,100,255);
      rect(p.position.x, p.position.y, 100,p_height);
    }
   
   
  }
  if(pause==true){
    console.log(end);
    if(end==true){
      textFont(g_font);
      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("GAME OVER, BUNNY DEAD", width/2, height/2-50);
    }else{
      textFont(g_font);
      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("PAUSED, BUNNY SLEEPING", width/2, height/2-50);
    }
    textFont(g_font);
    textSize(30);
    text("Press R to RESTART", width/2, height/2);

    if(keyWentDown('R')){
      o_one.position.x = width;
      p.position.y=400;
      pause=false;
      end=false;
      score=0;
    }
  }
  textFont(g_font);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("How to PAUSE? -> PRESS 'A' ", width-250, 25);

  //space and down
  textAlign(LEFT, CENTER);
  text("How to Jump? -> PRESS 'SPACE' ", 20, height-75);
  text("How to SLIDE? -> PRESS 'DOWN(V)'", 20, height-25);

  text("YOUR SCORE : "+score, 20, 50);

  if(keyWentDown('A')&&end==false){
    if(pause==true){
      pause=false;
    }else{
      pause=true;
    }
      console.log('A');
  }
}