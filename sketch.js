var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var ground, invisibleGround, groundImage, BackgroundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, rocks, fire;

var score=0;

var gameover, restart;

function preload(){
boyImg = loadImage("./Images/Boy.png");
BackgroundImage = loadImage("./Images/Bg.gif");
GroundImage = loadImage("./Images/Project 19 Ground.png");
cloudImage = loadImage("./Images/The Cloud.png");
rocks = loadImage("./Images/Rock.png");
fire = loadImage("./Images/Obstacles.png");


gameOverImg = loadImage("./Images/Game_Over_19.png");
 restartImg = loadImage("./Images/Restart.png");

}

function setup() {
 
createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(width/2,height-10,width,20);
  ground.addImage("ground",GroundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.visible = false;

  boy = createSprite(100,height-200,20,50);
  boy.addImage(boyImg);
  boy.scale = 0.5;
  boy.setCollider("circle", 0, 0, 200);
  
  
  gameover = createSprite(width/2,height/2-50);
  gameover.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameover.scale = 0.5;
  restart.scale = 0.5;

  gameover.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  boy.debug = true;
  background(BackgroundImage);
  //image(BackgroundImage,0,0,1200,600);
  text("Score: "+ score,500,50);

  if (gameState ===PLAY){
    score = score + Math.round(getFrameRate()/80);
ground.velocityX = -(6 + 3*score/100);

if(touches.length>0 || keyDown("space") && boy.y >= height-600) {
  boy.velocityY = -10
  touches = []
}

boy.velocityY = boy.velocityY + 0.7

if(ground.x < 0){
  ground.x = ground.width/2;
}

boy.collide(invisibleGround);
spawnClouds();
spawnObstacles();

if(obstaclesGroup.isTouching(boy)){
    gameState = END;
  }
 }
  else if (gameState === END){

    gameover.visible = true;
    restart.visible = true;

    ground.velocityX = 0
    boy.velocityY = 0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

      if(mousePressedOver(restart)) {
        reset();
      }
  }

    drawSprites();
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,height/2,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = boy.depth;
    boy.depth = boy.depth + 1;
  
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-50,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.setCollider("circle", 0, 0, 90);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(rocks);
              break;
      case 2: obstacle.addImage(fire);
              break;

    }
               
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}