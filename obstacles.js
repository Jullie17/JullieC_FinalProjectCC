//obstacles
class Obstacles{
	constructor(type, sprite){
		this.type=random(0,3);
		this.sprite = createSprite(width, 550, 100, 100);
		this.sprite.addImage(loadImage('assets/box_obstacle.png'));
		//this.sprite2 = createSprite(width, 550, 50, 200);
   		//this.sprite3 = createSprite(width, 300, 100, 50);
	}
	update(){
		this.sprite.position+=o_speed;
		drawSprites();
	}
	reset(){
		this.sprite.position.x=width;
		this.type = int (random(0,3));
		//switch this.type:
		switch (this.type) {
		  case 0:
		    this.sprite.position.y = 500;
		    this.sprite.height = 300;
		    this.sprite.width = 50;

		    this.sprite.addImage(loadImage('assets/fence_obstacle.png')); // trying to put fence image for obstacles, but if I put the image here the fence obstacle repeats
		    break;
		  case 1:
		    this.sprite.position.y = 500;
		    this.sprite.height = 50;
		    this.sprite.width = 100;

		    this.sprite.addImage(loadImage('assets/bird_obstacle_2(1).png'));

		    break;
		  case 2:
		    this.sprite.position.y = 550;
		    this.sprite.height = 100;
		    this.sprite.width = 100;

		    this.sprite.addImage(loadImage('assets/box_obstacle.png'));
		  	break;
		  
		}
	}

}
