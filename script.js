// Facories 

const player = (name) =>{
    let tolken = ""
    const setTolken = (tolk)=>{
        tolken=tolk
    };
    const getTolken = ()=> {
        return tolken;
    }
    return {name,setTolken,getTolken};
};

// Modules

const gameBoard = (() =>{
    // create the board array
    let gboard = Array(9)

    // create all the tiles
    let tiles = document.querySelector('.Tiles')

    let container = document.querySelector('.container')

    // use this in order to load the game board up
    const displayGame = () => {
        for(let i = 0; i < gboard.length;i+=1){
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
        displayEndGameOptions();
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

    const displayEndGameOptions = () =>{
        let optionContainer = document.querySelector('.optionContainer')
        //if the user wants to continue 
        let nextRound = document.createElement('div')
        nextRound.className = "nextRound"
        nextRound.textContent = "Next Round"
        optionContainer.appendChild(nextRound)
        // if the user wants to restart
        let restart = document.createElement('div')
        restart.className = "restart"
        restart.textContent = "Restart"
        optionContainer.appendChild(restart)
        respondToAnswer();
    }

    const respondToAnswer = () => {
        let restart = document.querySelector('.restart')
        let next = document.querySelector('.nextRound')

        restart.addEventListener('click',function(){

        })

        next.addEventListener('click',function(){
            
        })
        
    }

    // this will be used to place the current players tolken there
    const placeTolken = (currentTolken) =>{
        let players = document.querySelector('.players')
        players.textContent = currentTolken + " Turn"
        window.addEventListener('click', function(e){
            let child = e.srcElement
            if(child.textContent == ''){
                child.textContent=(currentTolken)
                if(currentTolken == 'X'){
                    child.style.color = "#34C3BE"
                }else{
                    child.style.color = "#F2B138"
                }
                gboard[child.id.slice(-1)] = currentTolken
                let result = game.checkWinner(currentTolken)
                if(result == 'Player 1' || result == 'Player 2'){
                    displayResult(result)
                }else{
                    currentTolken = game.switchPlayer()
                    players.textContent = currentTolken + " Turn"
                }
            }
        })
    }
    return {gboard,displayGame,placeTolken}

})();

const game = (() =>{
    const playerOne = player('Player 1')
    const playerTwo = player('Player 2')
    let currentPlayer = playerOne
    let winnerFound = false
    let winner = ''
    let selectionMade = false
    let select = document.querySelector('.select')

    const winningSubArrays =[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

    const checkWinner = (tolken) =>{
        for(let i = 0; i < winningSubArrays.length;i+=1){
            let sub = winningSubArrays[i]
            if(gameBoard.gboard[sub[0]] == tolken && gameBoard.gboard[sub[1]] == tolken && gameBoard.gboard[sub[2]] == tolken){
                if(playerOne.getTolken() == tolken){
                    winnerFound = true
                    winner = playerOne.name
                    setColors(playerOne,sub);
                }else if(playerTwo.getTolken() == tolken){
                    winnerFound = true
                    winner = playerTwo.name
                    console.log(sub)
                    setColors(playerTwo,sub);
                }
            }
        }
        if(winnerFound){
            return winner
        }
    }

    const setColors = (p,sub) =>{
        if(p.getTolken() == 'X'){
            col = "#34C3BE"
        }else if(p.getTolken() == 'O'){
            col = "#F2B138"
        }
        let tile1 = document.getElementById('t'+sub[0])
        let tile2 = document.getElementById('t'+sub[1])
        let tile3 = document.getElementById('t'+sub[2])
        tile1.style.backgroundColor = col
        tile1.style.color = "black"
        tile2.style.backgroundColor = col
        tile2.style.color = "black"
        tile3.style.backgroundColor = col
        tile3.style.color = "black"
        return
    }

    const switchPlayer = () =>{
        if(currentPlayer == playerOne){
            currentPlayer = playerTwo;
        }else if(currentPlayer == playerTwo){
            currentPlayer = playerOne;
        }
        return currentPlayer.getTolken()
    }

    const makeSelection = () =>{
        let X = document.querySelector('.X')
        let O = document.querySelector('.O')

        X.addEventListener('click', function(){
            playerOne.setTolken("X")
            playerTwo.setTolken("O")
            game.playGame()
        })

        O.addEventListener('click', function(){
            playerOne.setTolken("O")
            playerTwo.setTolken("X")
            game.playGame()
        })

    }
    
    const playGame = () =>{
        select.style.display = 'none'
        gameBoard.displayGame();
        gameBoard.placeTolken(currentPlayer.getTolken());
    }

    return{playGame,checkWinner,switchPlayer,makeSelection}

})();
game.makeSelection()













