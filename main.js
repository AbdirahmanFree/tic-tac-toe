const circle = document.createElement("img");
const cross = document.createElement("img");
circle.src = "./assets/circle.png";
cross.src = "./assets/cross.png";


// Create Cells

const cellOne = document.getElementById("cellOne");
const cellTwo = document.getElementById("cellTwo");
const cellThree = document.getElementById("cellThree");
const cellFour = document.getElementById("cellFour");
const cellFive = document.getElementById("cellFive");
const cellSix = document.getElementById("cellSix");
const cellSeven = document.getElementById("cellSeven");
const cellEight = document.getElementById("cellEight");
const cellNine = document.getElementById("cellNine");

const cells = [cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix, cellSeven, cellEight, cellNine]



function game() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let key = "X"
    let turns = 0


    

    const getKey = function () {
        return key
    }
    
    for (let i = 0; i<rows; i++){
        board[i] = []
        for (let j = 0; j < columns; j++){
            board[i][j] = "*";
        }
    }

    const togglekey = () => {
        key =="X" ? key = "O" : key = "X";
        
    }

    const winGame =  function () {
        key == "X" ? console.log("Player 1 has won the game!") : console.log("Player 2 has one the game");
        DisplayController.endGame();
    }

    const tieGame = function () {
        console.log("TIE GAME")
        DisplayController.endGame();
    }

   
     
    const checkWin = function () {
        const transpose = function (grid) {
            const rows = grid.length;
            const cols = grid[0].length;
            const result = [];
            for (let c = 0; c < cols; c++) {
                result[c] = [];
                for (let r = 0; r < rows; r++){
                    result[c][r] = grid[r][c]
                }
            }
            return result;
        }
        const checkRowWin = function (grid) {
            for (const row of grid){
                if (row[0] == key && row[0] == row[1] && row[1] == row[2]){
                    return true;
                }
            }
            return false;
        } 
        const checkColWin = function(grid) {
            const array = transpose(grid);
            return checkRowWin(array)
        }

        function checkDiagWin(grid) {
            if (grid[0][0] == key && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]){
                return true;
            }
            else if (grid[0][2] == key && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]){
                return true;
            }
            return false;
        }
         if (checkRowWin(board) || checkColWin(board) || checkDiagWin(board)) {
            winGame()
            return true;
         }
         return false;
         
    }

    const userChoice = function (row,column) {
        const userRow= row
        const userColumn = column
        if(board[userRow][userColumn] != "*"){
            alert("USED")
            return false;
        }
        else {
            board[userRow][userColumn] = key;
            console.log(board)
            console.log(key)
            DisplayController.updateScreen(userRow,userColumn)
            turns++;
        }

        if(checkWin()) {
            return;
        }
        else if (turns >= 9){
            return tieGame()
        }
        key =="X" ? console.log("Player 2 turn") : console.log("Player 1 turn");
        togglekey();
        console.log(board)
        return true
        
    
    }

    

    return {userChoice, getKey}
        
        
    
    
}

const myGame = game();

const DisplayController = {
    updateCell(cell){
        switch(cell.id) {
            case "cellOne":
                return myGame.userChoice(0,0);
                
            case "cellTwo":
                return myGame.userChoice(0,1);
                
            case "cellThree":
                return myGame.userChoice(0,2);
                
            case "cellFour":
                return myGame.userChoice(1,0);
               
            case "cellFive":
                return myGame.userChoice(1,1);
               
            case "cellSix":
                return myGame.userChoice(1,2);
               
            case "cellSeven":
                return myGame.userChoice(2,0);
               
            case "cellEight":
                return myGame.userChoice(2,1);
               
            case "cellNine":
                return myGame.userChoice(2,2);
               
        }


    },
    endGame(){
        for (const cell of cells) {
            cell.removeEventListener("click", handleClick)
        }
    },
    updateScreen(row,col){
        if (row == 0) {
            switch (col) {
                case 0:
                    myGame.getKey() == "X" ? cellOne.appendChild(cross.cloneNode(false)) : cellOne.appendChild(circle.cloneNode(false))
                    break;
                case 1:
                    myGame.getKey() == "X" ? cellTwo.appendChild(cross.cloneNode(false)) : cellTwo.appendChild(circle.cloneNode(false))
                    break
                case 2:
                    myGame.getKey() == "X" ? cellThree.appendChild(cross.cloneNode(false)) : cellThree.appendChild(circle.cloneNode(false))
                    break;
            }

        }
        else if (row == 1){
            switch (col) {
                case 0:
                    myGame.getKey() == "X" ? cellFour.appendChild(cross.cloneNode(false)) : cellFour.appendChild(circle.cloneNode(false))
                    break;
                case 1:
                    myGame.getKey() == "X" ? cellFive.appendChild(cross.cloneNode(false)) : cellFive.appendChild(circle.cloneNode(false))
                    break;
                case 2:
                    myGame.getKey() == "X" ? cellSix.appendChild(cross.cloneNode(false)) : cellSix.appendChild(circle.cloneNode(false))
                    break;  
            }

        }
        else {
            switch (col) {
                case 0:
                    myGame.getKey() == "X" ? cellSeven.appendChild(cross.cloneNode(false)) : cellSeven.appendChild(circle.cloneNode(false))
                    break;
                case 1:
                    myGame.getKey() == "X" ? cellEight.appendChild(cross.cloneNode(false)) : cellEight.appendChild(circle.cloneNode(false))
                    break;
                case 2:
                    myGame.getKey() == "X" ? cellNine.appendChild(cross.cloneNode(false)) : cellNine.appendChild(circle.cloneNode(false))
                    break;    
            }

        }
    }
}


for (const cell of cells) {
    cell.addEventListener("click", handleClick)
}

function handleClick() {
    DisplayController.updateCell(event.currentTarget)
}


