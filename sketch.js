var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
PLAY=1;
END=0;
var gameState=PLAY;
var restartImage,restart;
var gameover,gameoverImage;
var jumpSound,dieSound,cpSound;
var stoneImage


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImage=loadImage("restart.png");
  gameoverImage=loadImage("gameOver.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  cpSound=loadSound("checkPoint.mp3");
  stoneImage=loadImage("pokemon_076.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  cloudsGroup= new Group();
  obstaclesGroup=new Group();
  stonesGroup=new Group();
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score = 0;
  gameover=createSprite(300,100);
  gameover.addImage("gameover",gameoverImage);
  gameover.scale=0.5;
  restart=createSprite(300,140);
  restart.addImage("restart",restartImage);
  restart.scale=0.5 
  
}

function draw() {
  background(255);
  trex.debug=false
  console.log(ground.velocityX)
  trex.setCollider("circle",0,0,40)
  text("Score: "+ score, 500,50);
  if(gameState===PLAY){
    ground.velocityX = -(5+score/200);
    score = score + Math.round(frameCount/60);
   if (score > 0 && score%500===0){
     cpSound.play();
   }
    gameover.visible=false
    restart.visible=false
    if(keyDown("space")&& trex.y > 150) {
    trex.velocityY = -15;
    jumpSound.play();
  }
    spawnClouds();
    spawnObstacles();
  trex.velocityY = trex.velocityY + 0.8
    if(obstaclesGroup.isTouching(trex)){
     gameState=END   
      dieSound.play();
    }
  }
  else if(gameState===END){
    ground.velocityX=0;
    gameover.visible=true
    restart.visible=true
    trex.changeAnimation("collided",trex_collided)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0) 
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
    reset();
  }
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
       case 7: obstacle.addImage(stoneImage);
              break;      
        default: break;
    }        
    obstacle.scale = 0.5;
   obstaclesGroup.add(obstacle);
    obstacle.lifetime = 300;
 }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  stonesGroup.destroyEach();
  score=0

}