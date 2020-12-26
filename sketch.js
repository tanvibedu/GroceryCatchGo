var background, backgroundImage;
var person, person_walking;
var ground;
var obstacleGroup, obstacleImage;
var gameState = "play";
var grocery, groceryImage, groceryGroup;
var score;


function preload () {
 backgroundImage = loadImage ("background.jpg");
 person_walking =            loadAnimation("p1.PNG","p2.PNG","p3.PNG","p4.PNG","p5.PNG","p6.PNG")
  
  obstacleImage =      loadAnimation("g1.PNG","g2.PNG","g3.PNG","g4.PNG","g5.PNG","g6.PNG");
  
  groceryImage = loadImage ("tempsnip.png");
  
  
  
  
  
  
}

function setup () {
  createCanvas(600,600);
  
  background = createSprite (300,200,800,800);
  background.addImage(backgroundImage);
  background.scale = 1;
  
  person = createSprite (100,520, 20, 20)
  person.addAnimation("person_walking", person_walking);
  person.scale = 0.5;
  
   ground = createSprite(100,520,700,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  obstacleGroup= createGroup();
  groceryGroup = createGroup();
  
  
  score = 0;
 
}

function draw () {
  
  if (gameState === "play") {
    
      spawnObstacles();
     spawnGrocery();
    
   background.velocityX = -3; 

    if (background.x < 200){
      background.x = background.width/2;
    }
  
    person.velocityY = person.velocityY + 2
  
    person.collide(ground); 
  
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (groceryGroup.isTouching(person)){
      groceryGroup.destroyEach();
      score=score+2;
    }
  

  
  
   if(keyDown("space") && person.y >= 200) {
        person.velocityY = -30;
    }
    
   if(person.isTouching(obstacleGroup)) {
      gameState = "end";
    } 
  
  }
  
  
 
 drawSprites();
  
    fill("black")
   textSize(30);
 text("Score: "+ score, 470,500);
     
 if (gameState === "end"){
    background = "coral";
   stroke("lightblue");
    fill("lightblue");
    textSize(30);
    text("Game Over", 230,250)
  obstacleGroup.setLifetimeEach(0);
   person.setLifetimeEach(0);
  }
  

 
  
}


function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(500,400,40,40);
   obstacle.addAnimation("obstacle_walking",obstacleImage);
   obstacle.velocityX = -10;
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addAnimation("obstacle_walking",obstacleImage);
              break;
      default: break;
    }
   
     obstacle.depth = person.depth;
    person.depth = person.depth + 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnGrocery() {
  //write code here to spawn the grocery
  if (frameCount % 160 === 0) {
    grocery = createSprite(600,100,40,10);
   grocery.y = Math.round(random(100,200));
    grocery.addImage(groceryImage);
    grocery.scale = 0.2;
    grocery.velocityX = -3;
    
     //assign lifetime to the variable
   grocery.lifetime = 500;
    
    //adjust the depth
    grocery.depth = person.depth;
    person.depth = person.depth + 1;
  
    groceryGroup.add(grocery);
    }
}


