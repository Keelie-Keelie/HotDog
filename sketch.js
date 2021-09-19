var hotdog, hotdogImage;
var starFireRight, starFire, starFireSitting, starFireMoving, starFireEating;
var bg;
var table, tableImage;
var robin, robinLeft, robinSitting, robinMoving, robinEating;
var banner, bannerImage;

const START = 0;
const WALK = 1;
const SIT = 2;
const PLAY = 3;
const END = 4;

var gameState = START;

function preload(){
  bg = loadImage("images/naturebackground.jpg");

hotdogImage = loadImage("images/hotdog.png");

tableImage = loadImage("images/table.png");

bannerImage = loadImage("images/banner.png");

bannerImage = loadImage("images/banner.png");



robinLeft = loadAnimation("images/robinleft.png");
robinSitting = loadAnimation("images/RobinSitting.png");
robinMoving = loadAnimation("images/robinwalking1.png","images/robinwalking2.png");
robinEating = loadAnimation("images/robineating.png","images/robineating2.png");


starFireRight = loadAnimation("images/starfireright.png");
starFireSitting = loadAnimation("images/starfiresitting.png");
starFireMoving = loadAnimation("images/starfirewalking.png");
starFireEating = loadAnimation("images/starfireeating.png","images/starfireeating2.png");

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  starFire = createSprite(windowWidth-100, windowHeight-300);
  starFire.addAnimation("starFire standing",starFireRight);
  starFire.addAnimation("starFire sitting",starFireSitting);
  starFire.addAnimation("starFire eating", starFireEating);
  starFire.setCollider("rectangle",0,0,50,100);
  starFire.scale= 0.5;
  //starFire.debug=true;

  robin = createSprite(100, windowHeight-300);
  robin.addAnimation("robin standing",robinLeft);
  robin.addAnimation("robin sitting",robinSitting);
  robin.addAnimation("robin eating",robinEating);
  robin.setCollider("rectangle",0,0,50,100);
  //robin.debug=true;


  table = createSprite(windowWidth/2,windowHeight-250);
  table.addImage(tableImage);
  table.setCollider("rectangle",0,0,150,100);
  table.scale=1.2
  //table.debug=true;


  banner = createSprite(windowWidth/2,100)
  banner.addImage("hotdog banner", bannerImage);
  banner.scale=0.6

}

function draw() {
  background(bg);

  if(gameState === START){
    if(keyDown(LEFT_ARROW)|| keyDown("d")){
      gameState = WALK;
    }
  }
  if(gameState === WALK){

    if(keyDown("d")){

      robin.addAnimation("moving",robinMoving);
      robin.changeAnimation("moving",robinMoving);
      robin.scale = 2;
      robin.velocityX = 2;
      }

      if(keyDown("LEFT_ARROW")){

        starFire.addAnimation("starFire moving",starFireMoving);
        starFire.changeAnimation("starFire moving",starFireMoving);
        starFire.scale = 0.65;
        starFire.velocityX = -3;
        
      }

      if(robin.isTouching(table) && starFire.isTouching(table)){
          gameState = SIT;
          console.log("SIT")
      }
      if(starFire.isTouching(table)){

        starFire.setCollider("rectangle",0,0,100,200);
            starFire.velocityX = 0;
            starFire.changeAnimation("starFire standing",starFireRight);
            starFire.scale= 0.5;
       console.log("starFiretouching");
      }
      if(robin.isTouching(table)){
            robin.setCollider("rectangle",0,0,100,200);
            robin.velocityX = 0;
            robin.changeAnimation("robin standing",robinLeft);
            robin.scale= 1;
            console.log("robintouching");
      } 
 

  }
  if(gameState === SIT){

    if(robin.isTouching(table)){

      
      robin.changeAnimation("robin sitting",robinSitting);
      robin.y= windowHeight-350;
      robin.scale = 0.6;
    }

    if(starFire.isTouching(table)){
      
      starFire.changeAnimation("starFire sitting",starFireSitting);
      
      starFire.y= windowHeight-350;
      starFire.scale = 0.6;
    }
spawnHotdogRobin();
spawnHotdogStarfire();
  }

 


   

    
    
  drawSprites();
}

function spawnHotdogRobin(){

  if (frameCount % 50 === 0) {
    var hotdog = createSprite(random(windowWidth/2-150,windowWidth/2),150);
    hotdog.addImage(hotdogImage);
    hotdog.scale = 0.2;
    hotdog.velocityY = 15;
    hotdog.lifetime = 100
    
}
}


function spawnHotdogStarfire(){

  if (frameCount % 40 === 0) {
    var hotdog = createSprite(random(windowWidth/2,windowWidth/2+150),150);
    hotdog.addImage(hotdogImage);
    hotdog.scale = 0.2;
    hotdog.velocityY = 15;
    hotdog.lifetime = 100
}
}