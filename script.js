//__________Declaration des variables___________

const CANVAS_SIZE = 600;
const CANVAS_BACKGROUND_COLOUR = "#232b2b";

var TITLE = document.getElementById("title");

var score = document.getElementById("score");
var aff_score = document.getElementById("red_serpent");
var cpt = 0;
var final_score = document.getElementById("red-final-score");
var score_val = document.getElementById("score-val");
var final_score2 = document.getElementById("both-final-score");
var score_val1 = document.getElementById("score-green");
var score_val2 = document.getElementById("score-red");


var score2 = document.getElementById("score2");
var aff_score2 = document.querySelector("#green_serpent");
var cpt2 = 0;

const GAME_SPEED = 100;
const SNAKE_SIZE = 15;
const SNAKE_DEFAULT_POSITION = [{x: 150, y: 150}, {x: 150, y: 135}, {x: 150, y: 120}];
const FOOD_DEFAULT_POSITION = {x: 135, y: 135};
const DEFAULT_DIRECTION = {x: 15, y: 0}; // Va a droit

const SNAKE_2_SIZE = 15;
const SNAKE_2_DEFAULT_POSITION = [{x: 210, y: 210}, {x: 210, y: 195}, {x: 210, y: 180}];
const DEFAULT_2_DIRECTION = {x: 15, y: 0}; //Va a droite                     

const START_BTN = document.querySelector("#start-btn");
const MULTI_START_BTN = document.querySelector("#multi-start-btn");
const GUIDE_BTN = document.querySelector("#guide-btn");
const BACK_BTN = document.querySelector("#back-btn");
const RESTART_BTN = document.querySelector("#restart-btn");
const RESTART_2_BTN = document.querySelector("#restart-2-btn");
const CONTINUE_BTN = document.querySelector("#continue-btn");
const QUITTE_BTN = document.querySelector("#quitter-btn");
const X_BTN = document.querySelector("#x-btn");
const GAMEOVER = document.querySelector("#gameover");
const INSTRACTION = document.querySelector("#instraction");
const MODE_JEU = document.querySelector("#mode-jeu");

const CANVAS = document.querySelector("#game-canvas");
const CONTEXT = CANVAS.getContext("2d");


// Init canvas
drawCanvas();

// __________Les fonctions des boutons___________

START_BTN.addEventListener("click", function() {
  this.classList.add("disabled");
  MULTI_START_BTN.classList.add("disabled");
  aff_score.classList.remove("disabled");
  X_BTN.classList.remove("disabled");
  TITLE.classList.add("disabled");
  GUIDE_BTN.classList.add("disabled");
  startGame();
})

MULTI_START_BTN.addEventListener("click", function() {
    this.classList.add("disabled");
    START_BTN.classList.add("disabled");
    aff_score.classList.remove("disabled");
    X_BTN.classList.remove("disabled");
    aff_score2.classList.remove("disabled");
    TITLE.classList.add("disabled");
    GUIDE_BTN.classList.add("disabled");
    startGame2();
  })

GUIDE_BTN.addEventListener("click", function(){
    this.classList.add("disabled");
    START_BTN.classList.add("disabled");
    MULTI_START_BTN.classList.add("disabled");
    TITLE.classList.add("disabled");
    BACK_BTN.classList.remove("disabled");
    var maxWidth = 570;
    var lineHeight = 25;
    var x = (CANVAS.width - maxWidth) / 2;
    var y = 100;
    var text = 'Le principe du jeu est de diriger un serpent vers des boules dont il doit se nourrir pour grandir. Le défi est faire grandir la taille du serpent sans toucher les bordures de l’écran ou sa propre queue. Les boules s’afficher aléatoirement.                                                                                                                                      Un joueur peut reprendre une partie perdante en dépensant   5 points qu’il a cumulés durant les parties précédentes.                                                                                                                                 Le jeu peu se jouer seul ou à deux. Si un des joueurs touche l’autre il perd la partie.                                                                                                                                                                                          Comment jouer EN SOLO ?	                               	Diriger le serpent                                                                                                                                                                                                                                                                                                                                                     Et pour le 2émé joueur  ?	                                  	Diriger le serpent';

    CONTEXT.font = '22px Calibri';
    CONTEXT.fillStyle = 'white';
    wrapText(CONTEXT, text, x, y, maxWidth, lineHeight);
    CONTEXT.font = "50px fantasy";
    CONTEXT.fillStyle = "#f32013";
    CONTEXT.textAlign = "center";
    CONTEXT.fillText("CONCEPT DU JEU", (CANVAS.width/2)-7, 50);
    drawImg();
})

BACK_BTN.addEventListener("click", function(){
    location.reload();
})

RESTART_BTN.addEventListener("click", function() {
  this.classList.add("disabled");
  CONTINUE_BTN.classList.add("disabled");
  GAMEOVER.classList.add("disabled");
  QUITTE_BTN.classList.add("disabled");
  aff_score.classList.remove("disabled");
  X_BTN.classList.remove("disabled");
  INSTRACTION.classList.add("disabled");
  final_score.classList.add("disabled");
  cpt = 0 ;
  score.innerHTML = cpt;
  startGame();
})

RESTART_2_BTN.addEventListener("click", function() {
  this.classList.add("disabled");
  CONTINUE_BTN.classList.add("disabled");
  QUITTE_BTN.classList.add("disabled");
  GAMEOVER.classList.add("disabled");
  aff_score.classList.remove("disabled");
  aff_score2.classList.remove("disabled");
  X_BTN.classList.remove("disabled");
  final_score2.classList.add("disabled");
  cpt = 0 ;
  cpt2 = 0 ;
  score.innerHTML = cpt;
  score2.innerHTML = cpt2;
  startGame2();
})

CONTINUE_BTN.addEventListener("click", function() {
  this.classList.add("disabled");
  RESTART_BTN.classList.add("disabled");
  QUITTE_BTN.classList.add("disabled");
  GAMEOVER.classList.add("disabled");
  INSTRACTION.classList.add("disabled");
  aff_score.classList.remove("disabled");
  X_BTN.classList.remove("disabled");
  final_score.classList.add("disabled");
  continueGame();
})

QUITTE_BTN.addEventListener("click", function() {
  location.reload();
})
X_BTN.addEventListener("click", function() {
  location.reload();
})

//___________Les fonctions du jeu_____________

function startGame() {
  const snake = [...SNAKE_DEFAULT_POSITION];
  const food = {...FOOD_DEFAULT_POSITION};
  const direction = {...DEFAULT_DIRECTION};

  setKeyBoardControl(direction);

  const interval = setInterval(() => {
    drawCanvas();

    updateSnake(snake, food, direction);
    drawSnake(snake);
    drawFood(food);

    checkGameOver(snake, interval);
  }, GAME_SPEED)
}

function continueGame() {
  const snake = [...SNAKE_DEFAULT_POSITION];
  
  const newSnakeHead = {...getSnakeHead(snake)};

  for(var i=0; i<cpt;i++){
    snake.unshift(newSnakeHead);
  }
  
  const food = {...FOOD_DEFAULT_POSITION};
  const direction = {...DEFAULT_DIRECTION};
  
  cpt = cpt-5;
  score.innerHTML = cpt ;

  setKeyBoardControl(direction);

  const interval = setInterval(() => {
    drawCanvas();

    updateSnake(snake, food, direction);
    drawSnake(snake);
    drawFood(food);

    checkGameOver(snake, interval);
  }, GAME_SPEED)
}

//Fonction Mutlijoueur :

function startGame2() {
  const snake = [...SNAKE_DEFAULT_POSITION];
  const snake2 = [...SNAKE_2_DEFAULT_POSITION];
  const food = {...FOOD_DEFAULT_POSITION};
  const direction = {...DEFAULT_DIRECTION};
  const direction2 = {...DEFAULT_2_DIRECTION};

  setKeyBoardControl(direction);
  setKeyBoardControl2(direction2);

  const interval = setInterval(() => {
    drawCanvas();

    updateSnake(snake,food , direction);
    updateSnake2(snake2,food , direction2);
    drawSnake(snake);
    drawSnake2(snake2);
    drawFood(food);

    checkGameOver2(snake, snake2, interval);    
    ;    
  }, GAME_SPEED)
}

//_________Les fonctions pour controler les serpents__________

//Le premier serpent :

function setKeyBoardControl(direction) {
  window.addEventListener("keydown", (e) => {
    const oldDirection = direction;

    switch (e.key) {
      case 'ArrowUp':
        if (oldDirection.y !== 0) return;
        direction.x = 0;
        direction.y = -SNAKE_SIZE;
        break
      case 'ArrowDown':
        if (oldDirection.y !== 0) return;
        direction.x = 0;
        direction.y = SNAKE_SIZE;
        break
      case 'ArrowLeft':
        if (oldDirection.x !== 0) return;
        direction.x = -SNAKE_SIZE;
        direction.y = 0;
        break
      case 'ArrowRight':
        if (oldDirection.x !== 0) return;
        direction.x = SNAKE_SIZE;
        direction.y = 0;
        break
    }
  });
}

//Directionner 2eme serpent :

function setKeyBoardControl2(direction2) {
  window.addEventListener("keydown", (e) => {
    const oldDirection = direction2;

    switch (e.key) {
      case 'z':
        if (oldDirection.y !== 0) return;
        direction2.x = 0;
        direction2.y = -SNAKE_SIZE;
        break
      case 's':
        if (oldDirection.y !== 0) return;
        direction2.x = 0;
        direction2.y = SNAKE_SIZE;
        break
      case 'q':
        if (oldDirection.x !== 0) return;
        direction2.x = -SNAKE_SIZE;
        direction2.y = 0;
        break
      case 'd':
        if (oldDirection.x !== 0) return;
        direction2.x = SNAKE_SIZE;
        direction2.y = 0;
        break
    }
  });
}

//__________Les fonctions pour verifier la fin du jeu_______________

function checkGameOver(snake, interval) {
  if (snakeEatItself(snake) || snakeHitWall(snake)) {
    clearInterval(interval);
    GAMEOVER.classList.remove("disabled");
    RESTART_BTN.classList.remove("disabled");
    QUITTE_BTN.classList.remove("disabled");
    aff_score.classList.add("disabled");
    X_BTN.classList.add("disabled");
    final_score.classList.remove("disabled") + (score_val.innerHTML = cpt) ;
    drawCanvas()
    if(cpt>=5){
      CONTINUE_BTN.classList.remove("disabled");
      INSTRACTION.classList.remove("disabled");
    }
  }
}

function checkGameOver2(snake, snake2, interval) {
  if (snakeEatItself(snake) || snakeHitWall(snake) ||snakeEatItself2(snake2) || snakeHitWall2(snake2) || snakeHitSnake(snake, snake2)) {
    clearInterval(interval);
    GAMEOVER.classList.remove("disabled");
    RESTART_2_BTN.classList.remove("disabled");
    QUITTE_BTN.classList.remove("disabled");
    aff_score.classList.add("disabled");
    aff_score2.classList.add("disabled");
    X_BTN.classList.add("disabled");
    final_score2.classList.remove("disabled") + (score_val1.innerHTML = cpt)+(score_val2.innerHTML = cpt2);
    drawCanvas();
  }
}

// Canvas fonction =========================================
function drawCanvas() {
  CONTEXT.canvas.width = CANVAS_SIZE;
  CONTEXT.canvas.height = CANVAS_SIZE;
  CONTEXT.fillStyle = CANVAS_BACKGROUND_COLOUR;
  CONTEXT.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

//_______________Les fonctions des serpents__________________

function updateSnake(snake, food, direction) {
  const newSnakeHead = {...getSnakeHead(snake)};

  newSnakeHead.x += direction.x;
  newSnakeHead.y += direction.y;

  snake.unshift(newSnakeHead);
  
  if (eatFoodSuccessfully(snake, food)) {
    createFood(snake, food);
    majScore(cpt+=1);
  } else {
    snake.pop();
  }
}

//mis a jour du 2éme serpent :

function updateSnake2(snake2, food, direction) {
  const newSnakeHead2 = {...getSnakeHead2(snake2)};

  newSnakeHead2.x += direction.x;
  newSnakeHead2.y += direction.y;

  snake2.unshift(newSnakeHead2);
  
  if (eatFoodSuccessfully2(snake2, food)) {
    createFood2(snake2, food);
    majScore2(cpt2+=1);
  } else {
    snake2.pop();
  }
}

function drawSnake(snake) {
  snake.forEach(part => {
    CONTEXT.fillStyle = '#4BB543';
    CONTEXT.strokestyle = 'darkgreen';
    CONTEXT.fillRect(part.x, part.y, SNAKE_SIZE, SNAKE_SIZE);
    CONTEXT.strokeRect(part.x, part.y, SNAKE_SIZE, SNAKE_SIZE);
  });
}

//Dessiner 2eme snake :

function drawSnake2(snake2) {
  snake2.forEach(part => {
    CONTEXT.fillStyle = '#F32013';
    CONTEXT.strokestyle = 'darkred';
    CONTEXT.fillRect(part.x, part.y, SNAKE_2_SIZE, SNAKE_2_SIZE);
    CONTEXT.strokeRect(part.x, part.y, SNAKE_2_SIZE, SNAKE_2_SIZE);
  });
}

//Les fonctions pour prendre les tetes des serpents :

function getSnakeHead(snake) {
  return snake[0];
}

function getSnakeHead2(snake2) {
  return snake2[0];
}

//Les fonctions pour verifier que les serpents a manger la nourriture:

function eatFoodSuccessfully(snake, food) {
  const snakeHead = getSnakeHead(snake);
  return snakeHead.x === food.x && snakeHead.y === food.y;
}

function eatFoodSuccessfully2(snake2, food) {
  const snakeHead2 = getSnakeHead2(snake2);
  return snakeHead2.x === food.x && snakeHead2.y === food.y;
}

//Les fonctions pour calculer les scores:

function majScore(s){
  score.innerHTML= s;
}

function majScore2(s2){
  score2.innerHTML= s2;
}

//Les fonctions pour verifier si le serpent se mange lui-même :

function snakeEatItself(snake) {
  const snakeHead = getSnakeHead(snake);
  const snakeBody = snake.slice(4)
  return snakeBody.some(part => snakeHead.x === part.x && snakeHead.y === part.y);
}

function snakeEatItself2(snake2) {
  const snakeHead2 = getSnakeHead2(snake2);
  const snakeBody2 = snake2.slice(4)
  return snakeBody2.some(part => snakeHead2.x === part.x && snakeHead2.y === part.y);
}

//Les fonctions pour verifier si le serpent a écraser le mur :

function snakeHitWall(snake) {
  const snakeHead = getSnakeHead(snake);

  return snakeHead.x >= CANVAS_SIZE
  || snakeHead.y >= CANVAS_SIZE
  || snakeHead.x < 0  
  || snakeHead.y < 0
}

function snakeHitWall2(snake2) {
  const snakeHead2 = getSnakeHead2(snake2);

  return snakeHead2.x >= CANVAS_SIZE
  || snakeHead2.y >= CANVAS_SIZE
  || snakeHead2.x < 0  
  || snakeHead2.y < 0
}

function snakeHitSnake(snake, snake2) {
  const snakeHead = getSnakeHead(snake);
  const snakeHead2 = getSnakeHead2(snake2);
  const snakeBody = snake.slice(0);
  const snakeBody2 = snake2.slice(0);
  return snakeBody2.some(part => snakeHead.x === part.x && snakeHead.y === part.y)
  || snakeBody.some(part => snakeHead2.x === part.x && snakeHead2.y === part.y);
}
//___________Les fonctions de la nourriture____________

//Les fonctions pou creer la nourriture :

function createFood(snake, food) {
  const newPosition = randomPosition();

  while (snake.some(part => part.x === newPosition.x && part.y === newPosition.y)) {
    newPosition = randomPosition();
  }

  food.x = newPosition.x;
  food.y = newPosition.y;
}

function createFood2(snake2, food) {
  const newPosition = randomPosition();

  while (snake2.some(part => part.x === newPosition.x && part.y === newPosition.y)) {
    newPosition = randomPosition();
  }

  food.x = newPosition.x;
  food.y = newPosition.y;
}

//Dessiner la nourriture :

function drawFood(food) {
  CONTEXT.fillStyle = 'Orange';
  CONTEXT.strokestyle = 'OrangeRed';
  CONTEXT.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
  CONTEXT.strokeRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
}

//Pour les positions aleatoire :

function randomPosition() {
  return {
    x: Math.round((Math.random() * (CANVAS_SIZE-SNAKE_SIZE) + SNAKE_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
    y: Math.round((Math.random() * (CANVAS_SIZE-SNAKE_SIZE) + SNAKE_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
  }
}

//ecrire le guide :
  
function wrapText(CONTEXT, text, x, y, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';

      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = CONTEXT.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          CONTEXT.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      CONTEXT.fillText(line, x, y);
}

//Ajouter les images du guide:

function drawImg(){
  let img = new Image();   // Crée un nouvel élément img
  let img2 = new Image();   // Crée un nouvel élément img
  img.onload = function(){
  CONTEXT.drawImage(img, 280, 335, 120, 70);
}
  img2.onload = function(){
  CONTEXT.drawImage(img2, 280, 425, 120, 70);
}
  img.src = 'fleche.png'; // définit le chemin de la source
  img2.src = 'zqsd.png'; // définit le chemin de la source
}

//pour faire signaler le mode du jeu :

setInterval(function(){
  MODE_JEU.classList.remove("disabled");
  setTimeout(function(){
    MODE_JEU.classList.add("disabled");
  },700)
},1000)
