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
            const tile = document.createElement('div')
            tile.className = 'tile'
            tile.id = "t"+i
            tiles.appendChild(tile)
        }
    } 

    // this will be used to place the current players tolken there
    const placeTolken = (currentTolken) =>{
        tiles.childNodes.forEach(function(child){
            child.addEventListener('click', function(){
                if(child.textContent == ''){
                    child.textContent=(currentTolken)
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

    const winningSubArrays =[[0,1,2],[3,4,5],[,6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

    const checkSubset = (parentArray, subsetArray) =>{
        return subsetArray.every((el)=>{
            return parentArray.include(el)
        })
    }

    const checkWinner = () =>{
        if(){
            
        }

    }
    
    const playGame = () =>{
        gameBoard.displayGame();

        
    }

    return{playGame}

})();

//game.playGame()















