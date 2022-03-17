function computerPlay(){
   return ["rock", "paper", "scissor"][Math.floor(Math.random() * 3)]
}

function roundPlay(playerSelection, computerSelection){
   if (playerSelection === computerSelection){
      return 0
   }else{
      switch(playerSelection){
         case 'rock':
            if(computerSelection === 'paper'){
               return -1
            }
            else if(computerSelection === 'scissor'){
               return 1
            }
            break;
         case 'paper':
            if(computerSelection === 'rock'){
               return 1
            }
            else if(computerSelection === 'scissor'){
               return -1
            }
            break;
         case 'scissor': 
            if(computerSelection === 'paper'){
              return 1
            }
            else if(computerSelection === 'rock'){
               return -1
            }
            break;
      }
   }
}

function score(computerPoints, playerPoints){
  this.scoreDisplay = document.createElement("div");
  this.computerPoints = computerPoints;
  this.playerPoints = playerPoints;
  this.refreshScore = function () {
    this.scoreDisplay.textContent=`Computer = ${this.computerPoints}\nPlayer = ${this.playerPoints}`;
  };
}

function display(){
  this.resultDisplay = document.createElement("div");
  this.changeDisplay = function(winvalue, computerSelection, playerSelection, displayScore){
    switch (winvalue){
      case 1:
        //this.resultDisplay.textContent = `You win!! Computer choosed ${computerSelection} and ${playerSelection} beats ${computerSelection}!`;
        displayScore.playerPoints++;
        break;
      case 0:
        //this.resultDisplay.textContent = `It's a tie!! You two choosed ${playerSelection}`;
        break;
      case -1:
        //this.resultDisplay.textContent = `You loose!! Computer choosed ${computerSelection} and ${playerSelection} loose for ${computerSelection}!`;
        displayScore.computerPoints++;
        break;
    }
    this.resultDisplay.innerHTML = "";
    let computerChoosed = document.createElement("button");
    computerChoosed.id = computerSelection;
    let computerChoosedImg = document.createElement("img");
    computerChoosedImg.src = `./images/${computerChoosed.id}.png`;
    computerChoosed.appendChild(computerChoosedImg);
    this.resultDisplay.appendChild(computerChoosed);
    displayScore.refreshScore();
  }
}

function checkWin(displayScore, display, buttons){
  if (displayScore.playerPoints == 5) {
    display.resultDisplay.textContent = "You win!!";
    buttons.deactivateButtons(display, displayScore);
    offerRestart();
  } else if (displayScore.computerPoints == 5) {
    display.resultDisplay.textContent = "You loose!!";
    buttons.deactivateButtons(display, displayScore);
    offerRestart();
  }
}

function restartGame(){
  document.body.innerHTML = "";
  game();
}

function offerRestart(){
  let restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  document.body.appendChild(restartButton);
}

function doPlaying(e, displayScore, display, buttons){
  e = e.target;
  while(!(e.matches("button"))){
    //Previne esse "subborbulhamento" de escapar do contexto de .buttons
    if(e.matches(".buttons")) return 0;
    e = e.parentNode;
  }
  let computerSelection = computerPlay();
  let playerSelection = e.id;
  display.changeDisplay(roundPlay(playerSelection, computerSelection), computerSelection, playerSelection, displayScore);
  checkWin(displayScore, display, buttons);
}

function button(){
  this.playingButtons = document.createElement("div");
  this.createButtons = function(){
    this.playingButtons.classList.add("buttons");
    for(let i = 0;i<3;i++){
      let tempButton = document.createElement("button");
      let buttonimg = document.createElement("img");
      switch(i){
        case 0:
          tempButton.id = "rock";
          buttonimg.src = "./images/rock.png";
          break;
        case 1:
          tempButton.id = "paper";
          buttonimg.src = "./images/paper.png";
          break;
        case 2:
          tempButton.id = "scissor";
          buttonimg.src = "./images/scissor.png";
          break;
      }
      tempButton.appendChild(buttonimg);
      this.playingButtons.appendChild(tempButton);
  }};
  this.activateButtons = function(display, score){
    this.playingButtons.addEventListener('click', f = (e) => { doPlaying(e, score, display, this) });
  };
  this.deactivateButtons = function(){
    this.playingButtons.removeEventListener('click', f, false);
  };
}

function outdoor(player){
  this.element = document.createElement("p");
  this.attachToPage = function(){
    this.element.id = player;
    this.element.appendChild(document.createTextNode(player));
    document.body.appendChild(this.element);
  }
}

function game(){  

  /* Criar Placar, botões e display de resultados em memória */

  const displayScore = new score(0,0);    
  const buttons = new button();
  const endDisplay = new display();
  const playerOutdoor = new outdoor("YOU");
  const computerOutdoor = new outdoor("COMPUTER");

  /* Inicializar elementos criados anteriormente */

  displayScore.refreshScore();
  buttons.createButtons();
  buttons.activateButtons(endDisplay, displayScore);

  /* Atrelar elementos ao DOM */

  document.body.appendChild(displayScore.scoreDisplay);
  playerOutdoor.attachToPage();
  document.body.appendChild(buttons.playingButtons);  
  computerOutdoor.attachToPage();
  document.body.appendChild(endDisplay.resultDisplay);
}

/* Ponto de Entrada do Jogo */

addEventListener("DOMContentLoaded", game);
