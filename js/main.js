let pacmon
let direction
let speed = 300
let columnNumber = 10
let rowNumber = 18
let gameBoard
let angle = 0
let gamePoints = 0
let pointBoardText = document.getElementById('message-text')
let pointsTextValue = `Points: ${gamePoints}`
let ghostDirection
/*----Moving Functions ----*/
function moveUpFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        rowNumber--
        gameBoard[rowNumber][columnNumber].char = 'p'
        newRender()
        angle = -90;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
}
function moveRightFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        columnNumber++
        gameBoard[rowNumber][columnNumber].char = 'p'
        newRender()
        angle = 0;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
}
function moveDownFunc () { 
        gameBoard[rowNumber][columnNumber].char = ''
        rowNumber++
        gameBoard[rowNumber][columnNumber].char = 'p'
        newRender()
        angle = 90;
        $('#pacmon').css('transform','rotate(' + angle + 'deg)')
}
function moveLeftFunc() {
        gameBoard[rowNumber][columnNumber].char = ''
        columnNumber--
        gameBoard[rowNumber][columnNumber].char = 'p'
        newRender()
        $('#pacmon').css('transform','scaleX(-1)');
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
    //pacmon = new Pacmon('pacmon', 300, '/images/pacman.png', true, 10, 18, undefined, 3)
    //console.log(pacmon)
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
    if (direction === 'up') {
        if (gameBoard[rowNumber - 1][columnNumber].char === '+') {
            return
        } else if (gameBoard[rowNumber - 1][columnNumber].isPellet) {
            gameBoard[rowNumber - 1][columnNumber].isPellet = false
            gamePoints += 100
            moveUpFunc()
            pointBoardText.innerHTML = `Points: ${gamePoints}`
        } else {
            moveUpFunc()
        }
    } else if (direction === 'right') {
        if (gameBoard[rowNumber][columnNumber + 1].char === '+') {
            return
        }  else if (gameBoard[rowNumber][columnNumber + 1].isPellet) {
            gameBoard[rowNumber][columnNumber + 1].isPellet = false
            gamePoints += 100
            moveRightFunc()
            pointBoardText.innerHTML = `Points: ${gamePoints}`
        } else {
            moveRightFunc()
        }
    } else if (direction === 'down') {
        if( gameBoard[rowNumber + 1][columnNumber].char === '+') {
            return
        }  else if (gameBoard[rowNumber + 1][columnNumber].isPellet) {
            gameBoard[rowNumber + 1][columnNumber].isPellet = false
            gamePoints += 100
            moveDownFunc()
            pointBoardText.innerHTML = `Points: ${gamePoints}`
        } else {
            moveDownFunc()
        }
    } else if (direction === 'left') {
        if (gameBoard[rowNumber][columnNumber - 1].char === '+') {
            return
        }  else if (gameBoard[rowNumber][columnNumber - 1].isPellet) {
            gameBoard[rowNumber][columnNumber - 1].isPellet = false
            gamePoints += 100
            moveLeftFunc()
            pointBoardText.innerHTML = `Points: ${gamePoints}`
        } else {
            moveLeftFunc()
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
        ['+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+'],//1
        ['+', '+', '+', 'c', '+', 'c', 'c', 'c', '+', 'c', 'c', 'c', 'c', 'c', '+', 'c', '+'],//2
        ['+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+', 'c', '+'],//3
        ['+', 'c', 'c', 'c', '+', '+', '+', 'c', '+', 'c', '+', '+', '+', '+', '+', 'c', '+'],//4
        ['+', 'c', '+', '+', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'c', 'c', '+'],//5
        ['+', 'c', 'c', 'c', '+', 'c', 'c', '+', '+', '+', 'c', 'c', '+', 'c', 'c', 'c', '+'],//6
        ['+', '+', '+', 'c', '+', 'c', ' ', ' ', ' ', ' ', ' ', 'c', '+', 'c', '+', '+', '+'],//7
        [' ', ' ', '+', ' ', ' ', 'c', '+', ' ', 'g', ' ', '+', ' ', '+', ' ', '+', ' ', ' '],//8
        ['+', '+', '+', ' ', ' ', 'c', '+', 'g', ' ', 'g', '+', ' ', ' ', ' ', '+', '+', '+'],//9
        ['-', ' ', '=', ' ', ' ', 'c', '+', ' ', 'g', ' ', '+', ' ', ' ', ' ', '=', ' ', '-'],//10
        ['+', '+', '+', ' ', '+', 'c', '+', '+', '+', '+', '+', '+', '+', ' ', '+', '+', '+'],//11
        [' ', ' ', '+', 'c', 'c', 'c', 'c', '+', '+', 'c', 'c', '+', 'c', 'c', '+', ' ', ' '],//12
        ['+', '+', '+', 'c', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', '+', '+', '+'],//13
        ['+', 'c', 'c', 'c', '+', 'c', '+', '+', '+', '+', '+', 'c', '+', 'c', 'c', 'c', '+'],//14
        ['+', 'c', '+', '+', '+', 'c', 'c', 'c', '+', 'c', 'c', 'c', '+', '+', '+', 'c', '+'],//15
        ['+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '+'],//16
        ['+', 'c', '+', '+', '+', '+', 'c', '+', '+', '+', 'c', '+', '+', '+', '+', 'c', '+'],//17
        ['+', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'p', 'c', 'c', 'c', 'c', 'c', '+'],//18
        ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],//19
    ];
    gameBoard = board.map(row => row.map(char => new Cell(char)))
    console.table(board)
    console.table(gameBoard)
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
                trHTML += `<td id="r${rowIndex}c${cellIndex}" ><div id='ghost-pink'><img src='images/ghost-pink.png'></div></td>`
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


start() //startgame
console.log(pointBoardText.innerHTML)
let timeID = setInterval(nextMove, speed)