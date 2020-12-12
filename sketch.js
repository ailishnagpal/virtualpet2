//Create variables here
var dog, happyDog, database, foods, foodStock,  happyDogImage;
var fedTime, lastFed, foodObj, feed, addFood, food, sadDog;
function preload() {
  sadDog=loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
	//load images here
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();

  dog = createSprite(250,300,150,150);
  dog.addImage("dogImage",sadDog);
  dog.scale = 0.15;

  foodStock = database.ref('Food')
  foodStock.on("value", readStock);
  textSize(20);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime = database.ref('feed time');
fedTime.on("value", function(data){
  lastFed = data.val();
})

   

  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12 + " PM", 350, 30);
  } else if(lastFed===0) {
    text("Last Fed: 12 AM", 350, 30);
  } else{
    text("Last Fed: " + lastFed + " AM", 350, 30)
  }
  //add styles here

  drawSprites();

}

function readStock(data) {
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

/*function writeStock(x) {

  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}*/

function feedDog() {
  //dog.addImage(happyDogImage);
  dog.addImage("dogImag",happyDogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS 
  })
}
