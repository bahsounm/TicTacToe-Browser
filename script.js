// Facories 

const player = (name,tolken) =>{
    return {name, tolken};
};

// Modules

const gameBoard = (() =>{
    // create the board array
    let gboard = Array(9)

    // create all the tiles
    let tiles = document.querySelector('.Tiles')

    // use this in order to load the game board up
    const displayGame = () => {
        for(let i = 0; i < gboard.length;i+=1){
            // gboard[i] = ''
            const tile = document.createElement('div')
            tile.className = 'tile'
            tile.id = "t"+i
            tiles.appendChild(tile)
        }
    } 
    // display to the page who the winner is
    const displayResult = (winner)=>{
        let resultLoc = document.querySelector('.winner')
        resultLoc.textContent = winner + " Wins !!"
        start();
        stop();
    }
    //start the confetti
    const start = () =>{
        setTimeout(function(){
            confetti.start();
        },100)
    }
    // stop the confetti
    const stop = () =>{
        setTimeout(function(){
            confetti.stop();
        },2000)
    }

    // this will be used to place the current players tolken there
    const placeTolken = (currentTolken) =>{
        tiles.childNodes.forEach(function(child){
            child.addEventListener('click', function(){
                if(child.textContent == ''){
                    child.textContent=(currentTolken)
                    gboard[child.id.slice(-1)] = currentTolken
                    // if(game.currentPlayer == player)

                    let result = game.checkWinner(currentTolken)
                    if(result == 'Player 1' || result == 'Player 2'){
                        displayResult(result)
                    }
                }
            })
        })
    }



    return {gboard,displayGame,placeTolken}

})();

const game = (() =>{

    const playerOne = player('Player 1','X')
    const playerTwo = player('Player 2','O')

    let currentPlayer = playerOne
    let winnerFound = false
    let tileLeft = 9
    let winner = ''

    const winningSubArrays =[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

    const checkWinner = (tolken) =>{
        for(let i = 0; i < winningSubArrays.length;i+=1){
            let sub = winningSubArrays[i]
            if(gameBoard.gboard[sub[0]] == tolken && gameBoard.gboard[sub[1]] == tolken && gameBoard.gboard[sub[2]] == tolken){
                if(playerOne.tolken == tolken){
                    winnerFound = true
                    winner = playerOne.name
                }else if(playerTwo.tolken == tolken){
                    winnerFound = true
                    winner = playerTwo.name
                }
            }
        }
        if(winnerFound){
            return winner
        }
    }
    
    const playGame = () =>{
        gameBoard.displayGame();          
        gameBoard.placeTolken(currentPlayer.tolken);
    }

    return{playGame,checkWinner}

})();

game.playGame()















