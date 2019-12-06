/*------ Global variables -----*/
let speed = 250
let playCoinSound = document.getElementById('coin-sound')
let pointBoardText = document.getElementById('message-text')
let livesText = document.getElementById('lives')
let gamePoints = 0
let gameBoard
//Pacmon Variables
let columnNumber = 10
let rowNumber = 16
let angle = 0
let pacmonEatGhost = false
let direction
let lives = 2
//Ghost Variables
let timeID
let ghostDirection = 'up'
let ghostCol = 8
let ghostRow = 8
let directionNumber
let directionArray = ['up', 'right', 'down', 'left']
/*----Moving Functions ----*/
function moveUpFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        rowNumber--
        gameBoard[rowNumber][columnNumber].char = 'p'
}
function moveRightFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        columnNumber++
        gameBoard[rowNumber][columnNumber].char = 'p'
}
function moveDownFunc () { 
        gameBoard[rowNumber][columnNumber].char = ''
        rowNumber++
        gameBoard[rowNumber][columnNumber].char = 'p'
}
function moveLeftFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        columnNumber--
        gameBoard[rowNumber][columnNumber].char = 'p'
}
function moveGhost() {
    if (ghostDirection === 'up') {
        gameBoard[ghostRow][ghostCol].char = ''
        ghostRow --
        gameBoard[ghostRow][ghostCol].char = 'g'
    } else if (ghostDirection === 'right') {
        gameBoard[ghostRow][ghostCol].char = ''
        ghostCol ++
        gameBoard[ghostRow][ghostCol].char = 'g'
    } else if (ghostDirection === 'down') {
        gameBoard[ghostRow][ghostCol].char = ''
        ghostRow ++
        gameBoard[ghostRow][ghostCol].char = 'g'
    } else if (ghostDirection ==='left') {
        gameBoard[ghostRow][ghostCol].char = ''
        ghostCol --
        gameBoard[ghostRow][ghostCol].char = 'g'
    }
}
/*----- Button inputs for Pacmon -----*/
document.addEventListener('keydown', (evt)=> {
let key = evt.which
if (key == 38) {
    $('#up-btn').trigger('click')
    return false
} else if (key == 39) {
    $('#right-btn').trigger('click')
    return false
} else if (key == 40) {
    $('#down-btn').trigger('click')
    return false
} else if (key == 37) {
    $('#left-btn').trigger('click')
    return false
}
})
$('#play-btn').on('click', ()=> {
    start() //startgame
    timeID = setInterval(nextMove, speed)
    gameOverText = document.querySelector('h1')
    gameOverText.innerText = 'Pacmon'
    gameOverText.style.color = 'rgb(21, 50, 90)'
    hideElement = document.querySelector('.overlay-class')
    hideElement.style.display = 'none'
    soundElement = document.getElementById('game-music')
    soundElement.play()
    soundElement.loop = true

})
$('#up-btn').on('click', ()=> {
    direction = 'up'
})
$('#right-btn').on('click', ()=> {
    direction = 'right'
})
$('#down-btn').on('click', ()=> {
    direction = 'down'
})
$('#left-btn').on('click', ()=> {
    direction = 'left'
})
/*----Collision and movement conditions----*/
function nextMove() {
    newRender()
    livesText.innerText = `Lives ${lives}`
    pointBoardText.innerHTML = `Points: ${gamePoints}`
    if(gamePoints > 10000) {gameOver()}
    if (direction === 'up') {
        if (gameBoard[rowNumber - 1][columnNumber].char === '+') {
            angle = -90;
            $('#pacmon').css('transform','rotate(' + angle + 'deg)')
        } else if (gameBoard[rowNumber - 1][columnNumber].isPellet) {
            gameBoard[rowNumber - 1][columnNumber].isPellet = false
            gamePoints += 100
            moveUpFunc()
            playCoinSound.play()
        } else if (gameBoard[rowNumber - 1][columnNumber].char === 'g' || gameBoard[rowNumber][columnNumber].char === 'g') {
            collisionWithGhost()
        } else {
            moveUpFunc()
        }
        angle = -90;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
    } else if (direction === 'right') {
        if (gameBoard[rowNumber][columnNumber + 1].char === '+') {
            angle = 0;
            $('#pacmon').css('transform','rotate(' + angle + 'deg)')
        }  else if (gameBoard[rowNumber][columnNumber + 1].isPellet) {
            gameBoard[rowNumber][columnNumber + 1].isPellet = false
            gamePoints += 100
            moveRightFunc()
            playCoinSound.play()
        }  else if (gameBoard[rowNumber][columnNumber + 1].char === '=') {
            gameBoard[rowNumber][columnNumber].char = ''
            rowNumber = 10
            columnNumber = 1
            gameBoard[rowNumber][columnNumber].char = 'p'
        } else if (gameBoard[rowNumber][columnNumber + 1].char === 'g' || gameBoard[rowNumber][columnNumber].char === 'g') {
            collisionWithGhost()
        } else {
            moveRightFunc()
        }
        angle = 0;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
    } else if (direction === 'down') {
        if( gameBoard[rowNumber + 1][columnNumber].char === '+') {
            angle = 90;
            $('#pacmon').css('transform','rotate(' + angle + 'deg)')
        }  else if (gameBoard[rowNumber + 1][columnNumber].isPellet) {
            gameBoard[rowNumber + 1][columnNumber].isPellet = false
            gamePoints += 100
            moveDownFunc()
            playCoinSound.play()
        } else if (gameBoard[rowNumber + 1][columnNumber].char === 'g' || gameBoard[rowNumber][columnNumber].char === 'g') {
            collisionWithGhost()
        } else {
            moveDownFunc()
        } 
        angle = 90;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
    } else if (direction === 'left') {
        if (gameBoard[rowNumber][columnNumber - 1].char === '+') {
            $('#pacmon').css('transform','scaleX(-1)')
        }  else if (gameBoard[rowNumber][columnNumber - 1].isPellet) {
            gameBoard[rowNumber][columnNumber - 1].isPellet = false
            gamePoints += 100
            moveLeftFunc()
            playCoinSound.play()
        } else if (gameBoard[rowNumber][columnNumber - 1].char === '-') {
            gameBoard[rowNumber][columnNumber].char = ''
            rowNumber = 10
            columnNumber = 14
            gameBoard[rowNumber][columnNumber].char = 'p'
        } else if (gameBoard[rowNumber][columnNumber - 1].char === 'g' || gameBoard[rowNumber][columnNumber].char === 'g') {
            collisionWithGhost()
        } else {
            moveLeftFunc()
        }
        $('#pacmon').css('transform','scaleX(-1)')
    }
    nextMoveGhost()
}
function collisionWithGhost() {
    if (lives <= 1) {
        gameOver()

    } else if (pacmonEatGhost === false && lives > 1) {
        gameBoard[rowNumber][columnNumber].char = ''
        rowNumber = 16
        columnNumber = 10
        gameBoard[rowNumber][columnNumber].char = 'p'
        direction = 'right'
        lives--
        gameBoard[ghostRow][ghostCol].char = ''
        ghostDirection = 'up'
        ghostCol = 8
        ghostRow = 8
        gameBoard[ghostRow][ghostCol].char = 'g'
    } else if (pacmonEatGhost === true) {
        gamePoints += 500
        gameBoard[ghostRow][ghostCol].char = ''
        ghostDirection = 'up'
        ghostCol = 8
        ghostRow = 8
        gameBoard[ghostRow][ghostCol].char = 'g'
        pacmonEatGhost = false
        $("#ghost-pink").attr("src","images/ghost-pink.png")
    }
}
function gameOver() {
    /*---- Global variables -----*/
    console.log('gameover')
    clearInterval(timeID)
    gameOverText = document.querySelector('h1')
    if(gamePoints > 10000){
        gameOverText.innerText = 'You Win!'
        gameOverText.style.color = 'green'
    } else {
        gameOverText.innerText = 'Game Over'
        gameOverText.style.color = 'red'
    }
    speed = 250
    gamePoints = 0
    gameBoard[rowNumber][columnNumber].char = ''
    gameBoard[ghostRow][ghostCol].char = ''
    //pacmon Variables
    columnNumber = 10
    rowNumber = 16
    angle = 0
    pacmonEatGhost = false
    lives = 1
    //ghost Variables
    ghostDirection = 'up'
    ghostCol = 8
    ghostRow = 8
    directionArray = ['up', 'right', 'down', 'left']
    hideElement = document.querySelector('.overlay-class')
    hideElement.style.display = 'flex'
    hideElement.style.position = 'absolute'
    newRender()

}
    function nextMoveGhost() {
    if(ghostDirection === 'up') {
        if (gameBoard[ghostRow - 1][ghostCol].char === '+') {
            directionArray = ['right', 'down', 'left']
            directionNumber = Math.floor(Math.random() * directionArray.length)
            ghostDirection = directionArray[directionNumber]
        } else if (gameBoard[ghostRow - 1][ghostCol].char === 'p' || gameBoard[ghostRow][ghostCol].char === 'p') {
            collisionWithGhost()
        } else {
            moveGhost()
        }
    } else if (ghostDirection === 'right') {
        if(gameBoard[ghostRow][ghostCol + 1].char === '+'){
            directionArray = ['up', 'down', 'left']
            directionNumber = Math.floor(Math.random() * directionArray.length)
            ghostDirection = directionArray[directionNumber]
        } else if (gameBoard[ghostRow][ghostCol + 1].char === '=') {
            gameBoard[ghostRow][ghostCol].char = ''
            ghostRow = 10
            ghostCol = 2
            gameBoard[ghostRow][ghostCol].char = 'g'
        } else if (gameBoard[ghostRow][ghostCol + 1].char === 'p' || gameBoard[ghostRow][ghostCol].char === 'p') {
            collisionWithGhost()
        }  else {
            moveGhost()
        }
    } else if (ghostDirection === 'down') {
        if (gameBoard[ghostRow + 1][ghostCol].char === '+') {
            directionArray = ['up', 'right', 'left']
            directionNumber = Math.floor(Math.random() * directionArray.length)
            ghostDirection = directionArray[directionNumber]
        } else if (gameBoard[ghostRow + 1][ghostCol].char === 'p' || gameBoard[ghostRow][ghostCol].char === 'p') {
            collisionWithGhost()
        } else {
            moveGhost()
        }
    } else if (ghostDirection === 'left') {
        if(gameBoard[ghostRow][ghostCol - 1].char === '+') {
            directionArray = ['up', 'right', 'down']
            directionNumber = Math.floor(Math.random() * directionArray.length)
            ghostDirection = directionArray[directionNumber]
            console.log(ghostDirection)
        } else if (gameBoard[ghostRow][ghostCol - 1].char === 'p' || gameBoard[ghostRow][ghostCol].char === 'p') {
                collisionWithGhost()
        } else if (gameBoard[ghostRow][ghostCol - 1].char === '-') {
                gameBoard[ghostRow][ghostCol].char = ''
                ghostRow = 10
                ghostCol = 14
                gameBoard[ghostRow][ghostCol].char = 'g'
        } else {
            moveGhost()
        }
    } 
}
/*----Cell intances----*/
function Cell(char) {
    this.char = char === ' ' || char === 'c' ? '' : char
    this.isPellet = char === 'c'
}
/*------Start arrary----*/
function start() {
    board = [
        ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],//0
        ['+', 'bc', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'bc', '+'],//1
        ['+', '+', '+', 'c', '+', 'c', 'c', 'c', '+', 'c', 'c', 'c', 'c', 'c', '+', 'c', '+'],//2
        ['+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+'],//3
        ['+', 'c', 'c', 'c', '+', '+', '+', 'c', '+', 'c', '+', '+', '+', '+', '+', 'c', '+'],//4
        ['+', 'c', '+', '+', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'c', 'c', '+'],//5
        ['+', 'c', 'c', 'c', '+', 'c', 'c', '+', '+', '+', 'c', 'c', '+', 'c', 'c', 'c', '+'],//6
        ['+', '+', '+', 'c', '+', 'c', ' ', ' ', ' ', ' ', ' ', 'c', '+', 'c', '+', '+', '+'],//7
        [' ', ' ', '+', ' ', ' ', 'c', '+', ' ', 'g', ' ', '+', ' ', '+', ' ', '+', ' ', ' '],//8
        ['+', '+', '+', ' ', ' ', 'c', '+', ' ', ' ', ' ', '+', ' ', ' ', ' ', '+', '+', '+'],//9
        ['-', ' ', ' ', ' ', ' ', 'c', '+', ' ', ' ', ' ', '+', ' ', ' ', ' ', ' ', ' ', '='],//10
        ['+', '+', '+', ' ', '+', 'c', '+', '+', '+', '+', '+', '+', '+', ' ', '+', '+', '+'],//11
        [' ', ' ', '+', 'c', 'c', 'c', 'c', '+', '+', 'c', 'c', '+', 'c', 'c', '+', ' ', ' '],//12
        ['+', '+', '+', 'c', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', '+', '+', '+'],//13
        ['+', 'c', 'c', 'c', '+', 'c', '+', '+', '+', '+', '+', 'c', '+', 'c', 'c', 'c', '+'],//14
        ['+', 'c', '+', '+', '+', 'c', 'c', 'c', '+', 'c', 'c', 'c', '+', '+', '+', 'c', '+'],//15
        ['+', 'bc', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'p', 'c', 'c', 'c', 'c', 'bc', '+'],//16
        ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],//17
    ];
    gameBoard = board.map(row => row.map(char => new Cell(char)))
    newRender()
}
/*----- Render board -----*/
function newRender() {
    let $tbody = $('tbody');
    let tbodyHTML = '';
    gameBoard.forEach((row, rowIndex) => {
        let trHTML = `<tr id='r${rowIndex}'>`
        row.forEach((cell, cellIndex) => {
            if (cell.char === '+') {
                trHTML += `<td id="r${rowIndex}c${cellIndex}"><div class='barrier'><img src='images/barrier-2.png'></div></td>`
            } else if (cell.char === 'p') {
                trHTML += `<td id="r${rowIndex}c${cellIndex}"><div id='pacmon'><img src='images/pacmon-open.png'></div></td>`
            } else if (cell.char === 'g') {
                trHTML += `<td id="r${rowIndex}c${cellIndex}" ><div id='ghost-pink'><img id="ghost-img" src='images/ghost-pink.png'></div></td>`
            }  else if (cell.char === 'bc') {
                trHTML += `<td id="r${rowIndex}c${cellIndex}" ><div id='eat-ghost'><img src='images/pellet-1.png'></div></td>`
            } else {
                if (cell.isPellet) {
                    // append the td html for pellet
                    trHTML += `<td id="r${rowIndex}c${cellIndex}"><div id='pellet'><img src='images/pellet-1.png'></div></td>`
                } else {
                    // append
                    trHTML += `<td id="r${rowIndex}c${cellIndex}"></td>`
                }
            }
        })
        trHTML += '</tr>'
        tbodyHTML += trHTML
    });
    $tbody.html(tbodyHTML)
}


