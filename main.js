


const circle = document.createElement("img");
const cross = document.createElement("img");
circle.src = "./assets/circle.png";
cross.src = "./assets/cross.png";

// Create Cells
for (let i = 0; i< 9; i++) {

}



const DisplayController = {
    updateCell(){

    },
}


function game() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let key = "X"
    
    for (let i = 0; i< rows; i++){
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
    }

    const tieGame = function () {
        console.log("TIE GAME")
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
            const array = transpose(board);
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

    const userChoice = function () {
        const userRow= prompt("row");
        const userColumn = prompt("column")
        if(board[userRow][userColumn] != "*"){
            alert("USED")
        }
        else {
            board[userRow][userColumn] = key;
            console.log(board)
        }
        
        
    }

    const playGame = function ( count = 0) {
        if (count >= 8) {
            tieGame()
        }
        userChoice()
        if(checkWin()){
            return
        }
        key =="X" ? console.log("Player 2 turn") : console.log("Player 1 turn");
        togglekey();
        count ++;
        playGame(count);
    }

    return {playGame}
        
        
    
    
}

const myGame = game();









