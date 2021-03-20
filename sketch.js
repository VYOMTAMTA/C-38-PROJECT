var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var opponentpink, opponentyellow, opponentblack;
var opponentpinkfall, opponentyellowfall, opponentblackfall;
var obstaclea , obstacleb, obstaclec;
var over;
var bell;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opponentpink = loadAnimation("opponent1.png", "opponent2.png");
  opponentyellow = loadAnimation("opponent4.png", "opponent5.png");
  opponentblack = loadAnimation("opponent7.png", "opponent8.png");
  
  opponentpinkfall = loadAnimation("opponent3.png");
  opponentyellowfall = loadAnimation("opponent6.png");
  opponentblackfall = loadAnimation("opponent9.png");
  
  obstaclea = loadImage("obstacle/obstacle1.png");
  obstacleb = loadImage("obstacle/obstacle2.png");
  obstaclec = loadImage("obstacle/obstacle3.png");
  
  over = loadImage("gameOver.png");
  
  bell = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(600,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.scale = 0.3  

gameOver = createSprite(300, 150);
gameOver.addImage(over);  
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.06;
mainCyclist.addAnimation("fall",mainRacerImg2);
mainCyclist.setCollider("circle", 0, 0, 600) ;
  
  pinkGroup = createGroup();
  yellowGroup = createGroup();
  blackGroup = createGroup();
  
  cycle = [mainCyclist];
  
  o1 = createGroup();
  o2 = createGroup();
  o3 = createGroup();
}

function draw() {
  background(0);
  
 // camera.position.x = width/2;
  camera.position.y = mainCyclist.y;

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
    if(keyDown("space")){
      bell.play();
    }
    
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
    
    gameOver.visible=false;
    
    distance = distance+1;
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
    path.velocityX = -(5 +distance/100);    
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    opponents();
    obstacles();
       
    if(mainCyclist.isTouching(pinkGroup)) {
      gameState = END;
      pink.changeAnimation("fall",opponentpinkfall)
    }
    
    if(mainCyclist.isTouching(yellowGroup)){
      gameState = END;
      yellow.changeAnimation("fall",opponentyellowfall)
    }
    
    if(mainCyclist.isTouching(blackGroup)){
      gameState = END;
      black.changeAnimation("fall",opponentblackfall)
    }
    
    if(mainCyclist.isTouching(o1)){
      gameState = END;
    }
    
    if(mainCyclist.isTouching(o2)){
      gameState = END;
    }
    
    if(mainCyclist.isTouching(o3)){
      gameState = END;
    }
    
 }
  
  if(gameState === END){
    mainCyclist.changeAnimation("fall",mainRacerImg2)
    path.velocityX=0;
    gameOver.visible=true;
    
    pinkGroup.setVelocityXEach(0);
    pinkGroup.setLifetimeEach(-1);
    
    yellowGroup.setVelocityXEach(0);
    yellowGroup.setLifetimeEach(-1);
    
    blackGroup.setVelocityXEach(0);
    blackGroup.setLifetimeEach(-1);
    
    o1.setVelocityXEach(0);
    o1.setLifetimeEach(-1);
    
    o2.setVelocityXEach(0);
    o2.setLifetimeEach(-1);
    
    o3.setVelocityXEach(0);
    o3.setLifetimeEach(-1);
    
    text("PRESS UP ARROW TO RESTART", 150, 260)
  }
  
  if(keyDown(UP_ARROW)  && gameState === END){
    reset();
    
  }
  
}

function opponents(){
    if(frameCount % 170 === 0){
  var r= Math.round(random(1, 3));
   
   if(r == 1){
     pinkcyclists();
   } 
    
    if(r == 2){
     yellowcyclists();
   }
    
     if(r == 3){
     redcyclists();
   }
    
  }
} 

function obstacles(){
   
  if(frameCount % 100 === 0){
    var ran = Math.round(random(1,3));
    
    if(ran == 1){
    ob1();
  }
   if(ran == 2){
    ob2();
  }
   if(ran == 3){
    ob3();
  }
    
  }
   
}

function pinkcyclists(){
  
  pink = createSprite(580, random(20, 280));
  pink.addAnimation("pink",opponentpink);
  pink.addAnimation("fall",opponentpinkfall);
  pink.scale=0.06
  pink.velocityX=-(2 +distance/80);
  pink.lifetime=200;
  pink.setCollider("circle", 0, 0, 600);
  pinkGroup.add(pink);
   
}

function redcyclists(){
  
  yellow = createSprite(580, random(20, 280));
  yellow.addAnimation("pink",opponentyellow);
  yellow.addAnimation("fall",opponentyellowfall);
  yellow.scale=0.06
  yellow.velocityX=-(2 +distance/80);
  yellow.lifetime=200;
  yellow.setCollider("circle", 0, 0, 600);
  yellowGroup.add(yellow);
  
}

function yellowcyclists(){
  
  black = createSprite(580, random(20, 280));
  black.addAnimation("pink",opponentblack);
  black.addAnimation("fall",opponentblackfall);
  black.scale=0.06
  black.velocityX=-(2 +distance/80);
  black.lifetime=200;
  black.setCollider("circle", 0, 0, 600);
  blackGroup.add(black);
  
}

function ob1(){
  
  obstacle1 = createSprite(580, random(20, 280));
  obstacle1.addImage(obstaclea);
  obstacle1.scale=0.1;
  obstacle1.velocityX=-(2 +distance/80);
  obstacle1.lifetime=200;
  obstacle1.setCollider("circle", 0, 0, 200);
  o1.add(obstacle1);
  
}

function ob2(){
  
  obstacle2 = createSprite(580, random(20, 280));
  obstacle2.addImage(obstacleb);
  obstacle2.scale=0.1;
  obstacle2.velocityX=-(2 +distance/80);
  obstacle2.lifetime=200;
  obstacle2.setCollider("circle", 0, 0, 200);
   o2.add(obstacle2);
  
}

function ob3(){
  
  obstacle3 = createSprite(580, random(20, 280));
  obstacle3.addImage(obstaclec);
  obstacle3.scale=0.1;
  obstacle3.velocityX=-(2 +distance/80);
  obstacle3.lifetime=200;
  obstacle3.setCollider("circle", 0, 0, 200);
   o3.add(obstacle3);
  
}

function reset(){
  gameState = PLAY;
  distance = 0;
  
  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  blackGroup.destroyEach();
  
  o1.destroyEach();
  o2.destroyEach();
  o3.destroyEach();
}