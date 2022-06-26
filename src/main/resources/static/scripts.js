window.onload=function(){
var elements = document.getElementsByClassName("box");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', takeTurn, false);
}
}

function takeTurn() {
  var boxId = event.target.id;
  if(document.getElementById(boxId).style.backgroundImage == "") {
      makeMove(boxId, false);
      if(checkWin() == false) {
        cpuTurn();
      }
  }
}
function startGame() {
    document.getElementById("Main").style.display = "block";
    document.getElementById("firstOne").style.display = "none";
}
function restartGame() {
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("catPic").style.display = "none";
    document.getElementById("boxes").style.pointerEvents = "auto";
    document.getElementById("boxes").style.opacity = "1.0";
var elements = document.getElementsByClassName("box");
for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundImage = "";
}
if(!document.getElementById('cb').checked) {
    cpuTurn();
}
}

function cpuTurn() {
    var difficulty = document.getElementById("ddMenu").value;
    var index = "";
    if(difficulty == "Impossible") {
        index = impossibleTurn();
    } else if(difficulty == "Medium") {
        if(Math.random() > 0.25) {
            index = impossibleTurn();
        } else {
            index = randomTurn();
        }
    } else if(difficulty == "Natalia") {
        index = badTurn();
    } else {
        index = randomTurn();
    }
    makeMove(index, true);
    checkWin();
}

function makeMove(index, cpu) {
console.log(index);
      if(document.getElementById('cb').checked && cpu == false) {
            document.getElementById(index).style.backgroundImage = 'url("o.png")';
      } else if(cpu == false){
            document.getElementById(index).style.backgroundImage = 'url("x.png")';
      }
      if(document.getElementById('cb').checked && cpu == true) {
            document.getElementById(index).style.backgroundImage = 'url("x.png")';
      } else if(cpu == true){
            document.getElementById(index).style.backgroundImage = 'url("o.png")';
      }
}

function checkWin() {
var winCons = [
  ["box1", "box2", "box3"],
  ["box4", "box5", "box6"],
  ["box7", "box8", "box9"],
  ["box1", "box4", "box7"],
  ["box2", "box5", "box8"],
  ["box3", "box6", "box9"],
  ["box1", "box5", "box9"],
  ["box3", "box5", "box7"]
];
const arrX = [];
const arrO = [];
var count = 0;
var elements = document.getElementsByClassName("box");
for (var i = 0; i < elements.length; i++) {
     if(elements[i].style.backgroundImage == 'url("x.png")') {
     count++;
        arrX.push(elements[i].id);
     } else if(elements[i].style.backgroundImage == 'url("o.png")') {
        count++;
        arrO.push(elements[i].id);
     }
}
for (var i = 0; i < winCons.length; i++) {
    if(winCons[i].every(elem => arrX.includes(elem))) {
        gameEnd("X");
        return true;
    }
    if(winCons[i].every(elem => arrO.includes(elem))) {
        gameEnd("O");
        return true;
    }
}
if(count == 9){
    gameEnd("C");
    return true;
}
return false;
}

function gameEnd(winner) {
    var difficulty = document.getElementById("ddMenu").value;
    document.getElementById("boxes").style.pointerEvents = "none";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("boxes").style.opacity = "0.25";
    if(difficulty == "Natalia") {
        document.getElementById("image").src = "cat" + Math.ceil(Math.random() * 10).toString() + ".jpg";
        document.getElementById("catPic").style.display = "block";
    }
    if(winner == "C") {
        document.getElementById("gameOver").innerText = "Cat's Game!";
    }else {
        if(document.getElementById('cb').checked && winner == "O") {
            document.getElementById("gameOver").innerText = "You Won! Congratulations";
        }else if(document.getElementById('cb').checked && winner != "O") {
            document.getElementById("gameOver").innerText = "You Lost!";
        }else if(!document.getElementById('cb').checked && winner == "O"){
            document.getElementById("gameOver").innerText = "You Lost!";
        }else{
            document.getElementById("gameOver").innerText = "You Won! Congratulations";
        }
    }
}

function checkWinMove(sign) {
    var checkForThree = [
        ["box1", "box2"],
        ["box1", "box3"],
        ["box2", "box3"],
        ["box4", "box5"],
        ["box4", "box6"],
        ["box5", "box6"],
        ["box7", "box8"],
        ["box7", "box9"],
        ["box8", "box9"],
        ["box1", "box4"],
        ["box1", "box7"],
        ["box4", "box7"],
        ["box2", "box5"],
        ["box2", "box8"],
        ["box5", "box8"],
        ["box3", "box6"],
        ["box3", "box9"],
        ["box6", "box9"],
        ["box1", "box5"],
        ["box5", "box9"],
        ["box1", "box9"],
        ["box3", "box7"],
        ["box5", "box7"],
        ["box3", "box5"]
    ];
    var threeSpot = [
        "box3", "box2", "box1",
        "box6", "box5", "box4",
        "box9", "box8", "box7",
        "box7", "box4", "box1",
        "box8", "box5", "box2",
        "box9", "box6", "box3",
        "box9", "box1", "box5",
        "box5", "box3", "box7"
    ];
    const arrX = [];
    const arrO = [];
    var elements = document.getElementsByClassName("box");
    for (var i = 0; i < elements.length; i++) {
         if(elements[i].style.backgroundImage == 'url("x.png")') {
            arrX.push(elements[i].id);
         } else if(elements[i].style.backgroundImage == 'url("o.png")') {
            arrO.push(elements[i].id);
         }
    }
    if(sign == "o"){
        for (var i = 0; i < checkForThree.length; i++) {
            if(checkForThree[i].every(elem => arrO.includes(elem))) {
                if(document.getElementById(threeSpot[i]).style.backgroundImage == "")
                    return parseInt(threeSpot[i].substr(3));
            }
        }
    } else {
        for (var i = 0; i < checkForThree.length; i++) {
            if(checkForThree[i].every(elem => arrX.includes(elem))) {
                if(document.getElementById(threeSpot[i]).style.backgroundImage == "") {
                    return parseInt(threeSpot[i].substr(3));
                }
            }
        }
    }
    return 0;
}

function checkBlockMove(sign) {
    var checkForThree = [
        ["box1", "box2"],
        ["box1", "box3"],
        ["box2", "box3"],
        ["box4", "box5"],
        ["box4", "box6"],
        ["box5", "box6"],
        ["box7", "box8"],
        ["box7", "box9"],
        ["box8", "box9"],
        ["box1", "box4"],
        ["box1", "box7"],
        ["box4", "box7"],
        ["box2", "box5"],
        ["box2", "box8"],
        ["box5", "box8"],
        ["box3", "box6"],
        ["box3", "box9"],
        ["box6", "box9"],
        ["box1", "box5"],
        ["box5", "box9"],
        ["box1", "box9"],
        ["box3", "box7"],
        ["box5", "box7"],
        ["box3", "box5"]
    ];
    var threeSpot = [
        "box3", "box2", "box1",
        "box6", "box5", "box4",
        "box9", "box8", "box7",
        "box7", "box4", "box1",
        "box8", "box5", "box2",
        "box9", "box6", "box3",
        "box9", "box1", "box5",
        "box5", "box3", "box7"
    ];
    const arrX = [];
    const arrO = [];
    var elements = document.getElementsByClassName("box");
    for (var i = 0; i < elements.length; i++) {
         if(elements[i].style.backgroundImage == 'url("x.png")') {
            arrX.push(elements[i].id);
         } else if(elements[i].style.backgroundImage == 'url("o.png")') {
            arrO.push(elements[i].id);
         }
    }
    if(sign == "o"){
        for (var i = 0; i < checkForThree.length; i++) {
            if(checkForThree[i].every(elem => arrX.includes(elem))) {
                if(document.getElementById(threeSpot[i]).style.backgroundImage == "")
                    return parseInt(threeSpot[i].substr(3));
            }
        }
    } else {
        for (var i = 0; i < checkForThree.length; i++) {
            if(checkForThree[i].every(elem => arrO.includes(elem))) {
                if(document.getElementById(threeSpot[i]).style.backgroundImage == "")
                    return parseInt(threeSpot[i].substr(3));
            }
        }
    }
    return 0;
}

function impossibleTurn(){
    var index = "";
    var valid = false;
    var num = 0;
    var moveCount = 0;
    const arrX = [];
    const arrO = [];
    var elements = document.getElementsByClassName("box");
    for (var i = 0; i < elements.length; i++) {
         if(elements[i].style.backgroundImage == 'url("x.png")') {
         moveCount++;
            arrX.push(elements[i].id);
         } else if(elements[i].style.backgroundImage == 'url("o.png")') {
         moveCount++;
            arrO.push(elements[i].id);
         }
    }
        if(moveCount == 0){
                index = "box1";
        } else if(moveCount == 1) {
            if(arrO[0] != "box5") {
                index = "box5";
            } else {
                    index = "box1";
            }
        } else if(moveCount == 2) {
            if(arrX[0] == "box5") {
                if(arrO[0] == "box1")
                    index = "box9";
                if(arrO[0] == "box3")
                    index = "box7";
                if(arrO[0] == "box7")
                    index = "box3";
                if(arrO[0] == "box9")
                    index = "box1";
            } else {
                if(arrO[0] == "box1") {
                    if(arrX[0] == "box4" || arrX[0] == "box7") {
                        index = "box3";
                    } else {
                        index = "box7";
                    }
                }
                if(arrO[0] == "box3") {
                    if(arrX[0] == "box6" || arrX[0] == "box9") {
                        index = "box1";
                    } else {
                        index = "box9";
                    }
                }
                if(arrO[0] == "box7"){
                    if(arrX[0] == "box8" || arrX[0] == "box9") {
                        index = "box1";
                    } else {
                        index = "box9";
                    }
                }
                if(arrO[0] == "box9"){
                    if(arrX[0] == "box3" || arrX[0] == "box6") {
                        index = "box7";
                    } else {
                        index = "box3";
                    }
                }
            }
        } else if(moveCount == 3) {
            //if we got center
            if(arrX[0] == "box5"){
                        //if corner 2nd spot should be any edge unless blocking
                if(arrO.includes("box1")){
                    if(arrO.includes("box4")) {
                        index = "box7";
                    } else if(arrO.includes("box2")){
                        index = "box3";
                    } else if(arrO.includes("box3") || arrO.includes("box6")){
                        index = "box2";
                    } else {
                        index = "box4";
                    }
                } else if(arrO.includes("box3")){
                    if(arrO.includes("box6")) {
                        index = "box9";
                    } else if(arrO.includes("box2")){
                        index = "box1";
                    } else if(arrO.includes("box9")|| (arrO.includes("box8"))){
                        index = "box6";
                    } else {
                        index = "box2";
                    }
                } else if(arrO.includes("box7")){
                    if(arrO.includes("box4")) {
                        index = "box1";
                    } else if(arrO.includes("box8")){
                        index = "box9";
                    } else if(arrO.includes("box9") || (arrO.includes("box6"))){
                        index = "box8";
                    } else {
                        index = "box4";
                    }
                } else if(arrO.includes("box9")){
                    if(arrO.includes("box8")) {
                        index = "box7";
                    } else if(arrO.includes("box6")){
                        index = "box3";
                    } else if(arrO.includes("box3") || (arrO.includes("box2"))){
                        index = "box6";
                    } else {
                        index = "box8";
                    }
                } else {
                //if double edge set up win
                    index = "box1";
                }
            } else {
                //they have center we are in 1
                if(arrO.includes("box2")){
                    index = "box8";
                } else if(arrO.includes("box3")){
                    index = "box7";
                } else if(arrO.includes("box4")){
                    index = "box6";
                } else if(arrO.includes("box6")){
                    index = "box4";
                } else if(arrO.includes("box7")){
                    index = "box3";
                } else if(arrO.includes("box8")){
                    index = "box2";
                } else {
                    index = "box3";
                }
            }
        } else if(moveCount == 4) {
            var bestIndex = 0;
                bestIndex = checkWinMove("o");
            if(bestIndex == 0) {
                bestIndex = checkBlockMove("o");
            }
            index = "box" + bestIndex.toString();
            if(bestIndex == 0) {
                if(!arrX.includes("box5")){
                    if(arrX.includes("box3") || arrX.includes("box7")){
                        index = "box9";
                    } else if(arrX.includes("box9")){
                        index = "box3";
                    } else {
                        index = "box5";
                    }
                } else {
                }
            }
        } else if(moveCount == 5) {
                var bestIndex = checkWinMove("x");
            if(bestIndex == 0) {
                bestIndex = checkBlockMove("x");
            }
                index = "box" + bestIndex.toString();
            if(bestIndex == 0) {
                if(arrO.includes("box5")){
                    if(document.getElementById("box2").style.backgroundImage == "")
                        index = "box2";
                    else
                        index = "box4";
                } else {
                    if((arrO.includes("box1") && arrO.includes("box3")) || (arrO.includes("box1") && arrO.includes("box7")) || (arrO.includes("box3") && arrO.includes("box9")) || (arrO.includes("box7") && arrO.includes("box9"))) {
                        if(document.getElementById("box2").style.backgroundImage == "")
                            index = "box2";
                        else
                            index = "box4";
                    } else {
                        if(arrX.includes("box8")) {
                            index = "box3";
                        } else if(arrX.includes("box6")) {
                            index = "box1";
                        } else {
                            index = "box9";
                        }
                    }
                }
            }
        } else if(moveCount == 6) {
            var bestIndex = checkWinMove("o");
            if(bestIndex == 0) {
                bestIndex = checkBlockMove("o");
            }
            if(bestIndex == 0) {
                //hardcode if needed
            }
            index = "box" + bestIndex.toString();
        } else if(moveCount == 7) {
            var bestIndex = checkWinMove("x");
            if(bestIndex == 0) {
                bestIndex = checkBlockMove("x");
            }
            if(bestIndex == 0) {
                for (var i = 0; i < elements.length; i++) {
                     if(elements[i].style.backgroundImage == "") {
                        var bestIndex = i + 1;
                     }
                }
            }
            index = "box" + bestIndex.toString();
        } else if(moveCount == 8) {
            for (var i = 0; i < elements.length; i++) {
                 if(elements[i].style.backgroundImage == "") {
                    var bestIndex = i + 1;
                 }
            }
            index = "box" + bestIndex.toString();
        }
        return index;
}

function randomTurn(){
    var valid = false;
    var num = 0;
    var index = "";
        while(valid == false) {
            num = Math.ceil(Math.random() * 9)
            index = "box" + num.toString();
             if(document.getElementById(index).style.backgroundImage == "") {
                  valid = true;
             }
        }
        return index;
}

function badTurn(){
    var index = "";
    var winIndex = "";
    var blockIndex = "";
    var moveCount = 0;
    var valid = false;
    const arrX = [];
    const arrO = [];
    var elements = document.getElementsByClassName("box");
    for (var i = 0; i < elements.length; i++) {
         if(elements[i].style.backgroundImage == 'url("x.png")') {
            moveCount++;
            arrX.push(elements[i].id);
         } else if(elements[i].style.backgroundImage == 'url("o.png")') {
            moveCount++;
            arrO.push(elements[i].id);
         }
    }
    if((moveCount == 0) || (moveCount == 1)){
        while(valid == false) {
            num = Math.ceil(Math.random() * 9)
            index = "box" + num.toString();
             if((num % 2 == 0) && (document.getElementById(index).style.backgroundImage == "")) {
                  valid = true;
             }
        }
    } else if(moveCount == 7) {
        winIndex = "box" + checkWinMove("x").toString();
        while(valid == false) {
            num = Math.ceil(Math.random() * 9)
            index = "box" + num.toString();
             if((winIndex != index) && (document.getElementById(index).style.backgroundImage == "")) {
                  valid = true;
             }
        }
    } else if(moveCount == 8) {
        for (var i = 0; i < elements.length; i++) {
             if(elements[i].style.backgroundImage == "") {
                var bestIndex = i + 1;
             }
        }
        index = "box" + bestIndex.toString();
    } else {
        if(moveCount % 2 == 0) {
            winIndex = "box" + checkWinMove("o").toString();
            blockIndex = "box" + checkBlockMove("o").toString();
        } else {
            winIndex = "box" + checkWinMove("x").toString();
            blockIndex = "box" + checkBlockMove("x").toString();
        }
        while(valid == false) {
            num = Math.ceil(Math.random() * 9)
            index = "box" + num.toString();
             if((blockIndex != index) && (winIndex != index) && (document.getElementById(index).style.backgroundImage == "")) {
                  valid = true;
             }
        }
    }
    console.log("blockIndex = " + blockIndex);
    console.log("winIndex = " + winIndex);
    return index;
}