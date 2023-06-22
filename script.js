// Facories 

const player = (name) =>{
    let score = 0
    let tolken = ""
    const setTolken = (tolk)=>{
        tolken=tolk
    };
    const getTolken = ()=> {
        return tolken;
    }
    const updateScore = ()=>{
        score+=1
    }
    const resetScore = ()=>{
        score = 0
    }
    const getScore = ()=>{
        return score
    }
    
    return {name,setTolken,getTolken,updateScore,resetScore,getScore};
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
        tiles.innerHTML = ''
        let p = document.querySelector('.players')
        p.style.display = 'block'
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
        resultLoc.textContent = winner[0] + " Wins !!"
        let p1 = document.querySelector('.p1Selection')
        let p2 = document.querySelector('.p2Selection')
        p1.textContent = p1.textContent.substring(0, p1.textContent.indexOf(':')+1) + " " + winner[1]
        p2.textContent = p2.textContent.substring(0, p1.textContent.indexOf(':')+1) + " " + winner[2]
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

    const resetArray = () =>{
        for(let i = 0; i < gboard.length;i+=1){
            gboard[i] = ''
        }
    }

    const respondToAnswer = () => {
        let restart = document.querySelector('.restart')
        let next = document.querySelector('.nextRound')
        let resultLoc = document.querySelector('.winner')
        let option = document.querySelector('.optionContainer')
        let select = document.querySelector('.select')

        restart.addEventListener('click',function(){
            location.reload()
        })

        next.addEventListener('click',function(){
            resultLoc.textContent = ""
            option.innerHTML = '';
            resetArray()
            game.setWinnerFound(false)
            displayGame();

        })
        
    }

    // this will be used to place the current players tolken there
    const placeTolken = (currentTolken) =>{
        let players = document.querySelector('.players')
        players.textContent = currentTolken + " Turn"


        window.addEventListener('click', function(e){
            if(!game.getWinnerFound()){
                let child = e.srcElement
                console.log("Hello")

                if(child.textContent == ''){
                    child.textContent=(currentTolken)

                    if(currentTolken == 'X'){
                        child.style.color = "#34C3BE"
                    }else{
                        child.style.color = "#F2B138"
                    }

                    gboard[child.id.slice(-1)] = currentTolken
                    let result = game.checkWinner(currentTolken)

                    if(result != undefined){
                        if(result[0] == 'Player 1' || result[0] == 'Player 2'){
                            displayResult(result)
                        }
                    }else{
                        currentTolken = game.switchPlayer()
                        players.textContent = currentTolken + " Turn"
                    }
                }
            }
        })
    }
    return {gboard,displayGame,placeTolken}

})();

const game = (() =>{
    let playerOne = player('Player 1')
    let playerTwo = player('Player 2')
    let currentPlayer = playerOne
    let winnerFound = false
    let winner = ''
    let select = document.querySelector('.select')

    const winningSubArrays =[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

    const setWinnerFound = (val) =>{
        winnerFound = val
    }

    const getWinnerFound = () =>{
        return winnerFound
    }

    const checkWinner = (tolken) =>{
        for(let i = 0; i < winningSubArrays.length;i+=1){
            let sub = winningSubArrays[i]
            if(gameBoard.gboard[sub[0]] == tolken && gameBoard.gboard[sub[1]] == tolken && gameBoard.gboard[sub[2]] == tolken){
                if(playerOne.getTolken() == tolken){
                    setWinnerFound(true)
                    winner = playerOne.name
                    setColors(playerOne,sub);
                    playerOne.updateScore()
                }else if(playerTwo.getTolken() == tolken){
                    setWinnerFound(true)
                    winner = playerTwo.name
                    setColors(playerTwo,sub);
                    playerTwo.updateScore()

                }
            }
        }
        if(winnerFound){
            return [winner,playerOne.getScore(),playerTwo.getScore()]
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
        let p1 = document.querySelector('.p1Selection')
        let p2 = document.querySelector('.p2Selection')
        let p = document.querySelector('.players')
        p1.textContent = ''
        p2.textContent = ''
        p.style.display = 'none'

        X.addEventListener('click', function(){
            playerOne.setTolken("X")
            playerTwo.setTolken("O")
            p1.textContent = "Player "+ playerOne.getTolken() + " Score: " + playerOne.getScore()
            p2.textContent = "Player "+ playerTwo.getTolken() + " Score: " + playerTwo.getScore()
            game.playGame()
        })

        O.addEventListener('click', function(){
            playerOne.setTolken("O")
            playerTwo.setTolken("X")
            p1.textContent = "Player "+ playerOne.getTolken() + " Score: " + playerOne.getScore()
            p2.textContent = "Player "+ playerTwo.getTolken() + " Score: " + playerTwo.getScore()
            game.playGame()
        })

    }
    
    const playGame = () =>{
        select.style.display = 'none'
        playerOne.resetScore()
        playerTwo.resetScore()
        gameBoard.displayGame();
        gameBoard.placeTolken(currentPlayer.getTolken());
    }

    return{playGame,checkWinner,switchPlayer,makeSelection,getWinnerFound,setWinnerFound}

})();
game.makeSelection()













