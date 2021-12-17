  var playerAturn = null;
  var displayText = document.getElementsByTagName("h2")[1];
  var allFields = document.getElementsByTagName("td");
  var turns = allFields.length;
  var xSrc = "../assets/x.png";
  var oSrc = "../assets/o.png";
  
  function start () {
    document.getElementsByTagName("button")[0].setAttribute("disabled", true);
    clearBoard();
    addListeners();
    displaySwitch();
  }
  
  function addListeners() {
  	for (var i=0; i<turns; i++){
    	allFields[i].addEventListener("click", setSymbol);
    }
  }
  
  function displaySwitch() {
    playerAturn = !playerAturn;
  	if (playerAturn) {
    	displayText.innerText = "Player A's turn. Place X.";
    } else {displayText.innerText = "Player B's turn. Place O.";}
  }
  
  function setSymbol(){
  	if (playerAturn) {this.innerHTML = '<img src=xSrc width="64px" height="64px" alt="X">';
    } else {this.innerHTML = '<img src=oSrc width="64px" height="64px" alt="O">';}
    this.removeEventListener("click", setSymbol);
   turns -= 1;
   checkWin();
  }
  
 function checkWin(){
  	for (var i=0; i<3; i++){
    	if (allFields[3*i].innerHTML != "" && //rows
            allFields[3*i+0].innerHTML == allFields[3*i+1].innerHTML &&
           allFields[3*i+1].innerHTML == allFields[3*i+2].innerHTML){
        	displayWin();
         	return;
        }
        if (allFields[0+i].innerHTML != "" && //cols
           allFields[0+i].innerHTML == allFields[3+i].innerHTML &&
           allFields[3+i].innerHTML == allFields[6+i].innerHTML){
        	displayWin();
            return;
        }
        if (allFields[0].innerHTML != "" &&
           allFields[0].innerHTML == allFields[4].innerHTML &&
           allFields[4].innerHTML == allFields[8].innerHTML){
        	displayWin();
          	return;
      }
      if (allFields[2].innerHTML != "" &&
           allFields[2].innerHTML == allFields[4].innerHTML &&
           allFields[4].innerHTML == allFields[6].innerHTML){
        	displayWin();
        	return;
      }
    }
    checkEndGame();
  }
  
  function checkEndGame() {
  	if (turns == 0) {
    	displayText.innerText = "Draw. Nobody wins.";
      removeListeners();
    } else {
    	displaySwitch();
    }
  }
  
  function displayWin(){
  	if (playerAturn) {
    	displayText.innerText = "Player A wins!";
    } else {displayText.innerText = "Player B wins!";}
   removeListeners();
  }
  
  function removeListeners(){
  	for (var i=0; i<allFields.length; i++){
    	allFields[i].removeEventListener("click", setSymbol);
        document.getElementsByTagName("button")[0].removeAttribute("disabled", true);
    }
  }
  
  function clearBoard(){
  	turns = allFields.length;
    for (var i=0; i<turns; i++){
    	allFields[i].innerHTML = "";
    }
  }
