//MARS ROVER!!!

//THE MANUAL NO ONE READS
var instructions = `Welcome!!!
The Rover is primed and ready, to drive the rover please use the following commands
(F)orward
(L)eft turn
(R)ight turn
To access the Rover's travel log use
(T)ravel logs
If at any moment you get lost use
(D)irection
to find your heading, Happy Trails...`;

//LOG ROVER INSTRUCTIONS TO CONSOLE
console.log(instructions);

//AWARD WINNING ROVER OBJECT
var rover = {direction: "N", position:{ x: 0, y: 0}, travelLog:[]};

var alienRover = JSON.parse(JSON.stringify(rover));
alienRover.position = {x:4, y:7};
alienRover.message = "⍙⊑⏃⏁ ⏁⊑⟒ ⊑⟒⌰⌰ ⟟⌇ ⏁⊑⏃⏁!!! ⏁⎍⍀⋏ ⏃⍀⍜⎍⋏⎅ ⋔⟒⟒⌿⋔⍜⍜⌿ ⏁⊑⏃⏁'⌇ ⋏⍜ ⋔⏃⍀⌇ ☊⍜⍙!!!";
alienRover.radio = "⊑⟒⊬ ⋔⟒⟒⌿⋔⍜⍜⌿...⊬⟒⏃⊑ ⏚⌰⟒⟒⌿⏚⌰⍜⍜⌿... ⟟'⋔ ⏚⍜⍀⟒⎅!...⋔⟒ ⏁⍜⍜ ⏚⌰⟒⟒⌿⏚⌰⍜⍜⌿...⋔⟒ ⏁⍜⍜...";

//OBSTACLES COORDINATES
var obstacles = [
  {x:5 , y: 5},
  {x:3 , y: 9},
  {x:7, y: 3}
];

//UPDATE TRAVEL LOG BY PUSHING NEW OBJECTS INTO THE TRAVELOG ARRAY
function updateTravelLog(rover){
  rover.travelLog.push(JSON.parse(JSON.stringify(rover.position)));
  console.log(`Rover's position is x: ${rover.position.x}, y: ${rover.position.y}`);
}

//CHECK FOR OBSTACLES IN THE MAP
function checkForObstacle(rover, obstacles){
  for(let i = 0; i < obstacles.length; i++){
    if(rover.position.x && rover.position.y == obstacles[i].x && obstacles[i].y){
      console.log(`Whoa there cowboy! or cowgirl! or cowperson!... or cow..., The Rover loves everyone, 
there's an obstacle in your way, try turning to go around it.`);
  
      rover.position.x = rover.travelLog[rover.travelLog.length-1].x;
      rover.position.y = rover.travelLog[rover.travelLog.length-1].y;
    }
  }
}

//CHECK FOR ALIEN ROVER
function unidentifiedRovingObject(rover, alienRover){

  if(rover.position.x == alienRover.position.x && rover.position.y == alienRover.position.y){
    console.log(`Holy Crap!!! Partner that's an Alien Rover, QUICK!!! take a selfie!!!`);
    takeSelfie();
    console.log(`Oh dang it got away!...But it left  message behind!`);
    console.log(alienRover.message);
    console.log(`...Hmm, I wonder if we can traslate that using google`);
  }

}

//TAKE ROVER SELFIE
function takeSelfie(){
  let img = document.createElement('IMG');
  img.setAttribute('src', 'imgs/rover.jpg');
  img.setAttribute('id', 'selfie')

  let ml = (window.innerWidth / 2) - (img.width / 2); 
  img.style.marginLeft = ml+"px";

  document.body.appendChild(img);

  setTimeout(()=>{
    document.getElementById('selfie').remove();
  }, 2000);
}


//CHECK FOR BOUNDARY COLLISIONS
function checkBoundaries(rover){
  if(rover.position.x < 0 || rover.position.y < 0){

    if(rover.travelLog.length == 0){
      rover.position.x = 0;
      rover.position.y = 0;
    }else{
      rover.position.x = rover.travelLog[rover.travelLog.length-1].x;
      rover.position.y = rover.travelLog[rover.travelLog.length-1].y;
    }

    return console.log(`Hold on wait! you can't go there, you'll get lost, turn around.`);

  }else if(rover.position.x  > 9 || rover.position.y > 9){

    rover.position.x = rover.travelLog[rover.travelLog.length-1].x;
    rover.position.y = rover.travelLog[rover.travelLog.length-1].y;

    return console.log(`That's the edge of a cliff there partner, backup, we want to live to see that Mars cow again, try turning around`);

  }

}

//HANDLE TURNING THE ROVER TO THE LEFT
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch(rover.direction){
    case 'N':
    rover.direction = 'W';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'W':
    rover.direction = 'S';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'S':
    rover.direction = 'E';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'E':
    rover.direction = 'N';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
  }
}

//HANDLE TURNING THE ROVER TO THE RIGHT
function turnRight(rover){
  console.log("turnRight was called!");
  switch(rover.direction){
    case 'N':
    rover.direction = 'E';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'E':
    rover.direction = 'S';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'S':
    rover.direction = 'W';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
    case 'W':
    rover.direction = 'N';
    console.log(`The Rover is now facing : ${rover.direction}`);
    break;
  }
}

//MOVE THE ROVER FORWARD IN THE FACING DIRECTION
function moveForward(rover){
  console.log("moveForward was called")

  function move(){
    checkForObstacle(rover, obstacles);
    checkBoundaries(rover);
    unidentifiedRovingObject(rover, alienRover);
    updateTravelLog(rover)
  }

  switch(rover.direction){
    case 'N':
    rover.position.y--;
    move();
    break;
    case 'S':
    rover.position.y++;
    move();
    break;
    case 'E':
    rover.position.x++;
    move();
    break;
    case 'W':
    rover.position.x--;
    move();
    break;
  }

}

//PRINT THE TRAVEL LOGS SEQUENTIALLY TO THE CONSOLE
function travelLogs(rover){
  if(rover.travelLog.length == 0){
    return console.log('The travel logs are empty, get moving! Nasa is counting on you!');
  }else{
    console.log('Current Travel Logs:');
    rover.travelLog.forEach(log => {
      console.log(`x:${log.x}, y:${log.y}`);
    });
  }
}

//BIND EVENT LISTENERS TO ACTION KEYS
document.addEventListener("keypress", (e)=>{
  if(e.code == "KeyF"){
    return moveForward(rover);
  }else if(e.code == "KeyR"){
    return turnRight(rover);
  }else if(e.code == "KeyL"){
    return turnLeft(rover);
  }else if(e.code == "KeyD"){
    return console.log(`The Rover is facing: ${rover.direction}`);
  }else if(e.code == "KeyT"){
    return travelLogs(rover);
  }else{
    console.log(alienRover);
    return console.log('Key is not a rover command, please use (F)orward, (R)right turn, (L)eft turn...');
  }
});



//ALIEN ROVER FSM CODE BEGINS HERE
function alienRoverFSM(alienRover, obstacles, rover){

  function randomNumberGenerator(limit){
    return Math.floor(Math.random() * Math.floor(limit));
  }

  //SET THE DIRECTION OF ALIEN ROVER
  var direction = setDirection();

  function setDirection(){
    var numericalHeading = randomNumberGenerator(4);
    var heading; 

    switch(numericalHeading){
      case 0:
      heading = 'N'
      break;
      case 1:
      heading = 'S'
      break;
      case 2:
      heading = 'E'
      break;
      case 3:
      heading = 'W'
      break;
    }
    return heading;
  }
  //DETECT BOUDARIES
  function boundaries(){
    if(alienRover.position.x < 0 || alienRover.position.y < 0){

      if(alienRover.travelLog.length == 0){
        alienRover.position.x = 4;
        alienRover.position.y = 7;
      }else{
        alienRover.position.x = alienRover.travelLog[alienRover.travelLog.length-1].x;
        alienRover.position.y = alienRover.travelLog[alienRover.travelLog.length-1].y;
      }

      return;
  
    }else if(alienRover.position.x  > 9 ||alienRover.position.y > 9){
  
      alienRover.position.x = alienRover.travelLog[alienRover.travelLog.length-1].x;
      alienRover.position.y = alienRover.travelLog[alienRover.travelLog.length-1].y;
  
      return;
  
    }
  }

  //DETEC OBSTACLES
  function obstacles(){
    for(let i = 0; i < obstacles.length; i++){
      if(alienRover.position.x && alienRover.position.y == obstacles[i].x && obstacles[i].y){
        alienRover.position.x = alienRover.travelLog[alienRover.travelLog.length-1].x;
        alienRover.position.y = alienRover.travelLog[alienRover.travelLog.length-1].y;
      }
    }
  }

  //DETEC OTHER ROVERS
  function rovers(){
    if(alienRover.position.x && alienRover.position.y == rover.position.x && rover.position.y){
      unidentifiedRovingObject(rover, alienRover);
      alienRover.position = {x: 4, y: 7};
    }
  }

  //UPDATE ALIEN ROVER TRAVEL LOG
  function travelLog(){
    alienRover.travelLog.push(JSON.parse(JSON.stringify(alienRover.position)));
  }

  //MOVE THE ALIEN ROVER IN FACING DIRECTION
  function moveAlienRover(){

    function move(){
      boundaries();
      obstacles();
      rovers();
      travelLog();
    }

    switch(direction){
      case 'N':
      alienRover.position.y--;
      move();
      break;
      case 'S':
      alienRover.position.y++;
      move();
      break;
      case 'E':
      alienRover.position.x++;
      move();
      break;
      case 'w':
      alienRover.position.x--;
      move();
      break;
    }
  }

  moveAlienRover();

}

//SET A TIME INTERVAL FOR THE ALIEN ROVER TO MAKE A MOVE
setInterval(function(){
  alienRoverFSM(alienRover, obstacles, rover);
}, 1000);

//RANDOMLY SEND OUT RADIO MESSAGE OF ALIEN ROVER
setInterval(function(){
  console.log(alienRover.radio);
},  Math.floor(Math.random() * Math.floor(30000)));

