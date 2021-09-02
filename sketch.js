var hotdog, hotdogImage;
var starFireRight, starFire, starFireSitting, starFireMoving;
var bg;
var table, tableImage;
var robin, robinLeft, robinSitting, robinMoving;
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




robinLeft = loadAnimation("images/robinleft.png");
robinSitting = loadAnimation("images/RobinSitting.png");
robinMoving = loadAnimation("images/robinwalking1.png","images/robinwalking2.png");



starFireRight = loadAnimation("images/starfireright.png");
starFireSitting = loadAnimation("images/starfiresitting.png");
starFireMoving = loadAnimation("images/starfirewalking.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  starFire = createSprite(1300, windowHeight-400);
  starFire.addAnimation("starFire standing",starFireRight);
  starFire.addAnimation("starFire sitting",starFireSitting);
  starFire.setCollider("rectangle",0,0,50,100);

starFire.scale= 0.5;

  robin = createSprite(300, windowHeight-400);
  robin.addAnimation("robin standing",robinLeft);
  robin.addAnimation("robin sitting",robinSitting);
  robin.setCollider("rectangle",0,0,50,100);

  table = createSprite(800,windowHeight-350);
  table.addImage(tableImage);
  table.setCollider("rectangle",0,0,150,100);

}

function draw() {
  background(bg);

  if(gameState === START){
    if(keyDown(LEFT_ARROW)|| keyDown("d")){
gameState = WALK;

    }
  }else if(gameState === WALK){

    
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
         }else if(starFire.isTouching(table)){

          
            starFire.velocityX = 0;
            starFire.changeAnimation("starFire standing",starFireRight);
            starFire.scale= 0.5;
       console.log("starFiretouching");
        }else if(robin.isTouching(table)){
    
          
            robin.velocityX = 0;
            robin.changeAnimation("robin standing",robinLeft);
            robin.scale= 1;
            console.log("robintouching");
        } 

        

         
         

  }else if(gameState === SIT){

    if(robin.isTouching(table)){

      
      robin.changeAnimation("robin sitting",robinSitting);
      robin.y= windowHeight-450;
      robin.scale = 0.7;
      robin.debug = true;
      table.debug = true;
    }

    if(starFire.isTouching(table)){
      
      starFire.changeAnimation("starFire sitting",starFireSitting);
      
      starFire.y= windowHeight-450;
      starFire.scale = 0.7;
      starFire.debug = true;
      table.debug = true;
    }

  }

 


   

    
    
  drawSprites();
}