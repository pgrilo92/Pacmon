let pacmon
let direction
let speed = 300
let columnNumber = 10
let rowNumber = 18
let gameBoard
//let isBarrier = false

// class Game {
//     constructor(name, speed, sprite, alive, columnNumber, rowNumber, timeID, direction) {
//         this.name = name
//         this.speed = speed
//         this.sprite = sprite
//         this.alive = alive
//         this.columnNumber = columnNumber
//         this.rowNumber = rowNumber
//         this.timeID = timeID 
//         this.direction = direction
//     }
// }
// class Pacmon extends Game {
//     constructor(name, speed, sprite, alive, columnNumber, rowNumber, timeID, direction, lives) {
//         super(name, speed, sprite, alive, columnNumber, rowNumber, timeID, direction)
//         this.lives = lives
//     }
    function moveUpFunc() {
        if(rowNumber > 0) {
            rowNumber--
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${columnNumber}`).show('slow')
        } else if(this.rowNumber <= 0) {
            //clearInterval(timeID)
        }
    }
    function moveRightFunc() {
        if(columnNumber < 16) {
            columnNumber++
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${columnNumber}`).show('slow')
        } else if(columnNumber >= 19) {
            //clearInterval(timeID)
        }
    }
    function moveDownFunc () { 
        if(rowNumber < 19) {
            rowNumber++
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${columnNumber}`).show('slow')
        } else if(rowNumber >= 19) {
            //clearInterval(timeID)
        }
    }
    function moveLeftFunc() {
        if(columnNumber > 0) {
            columnNumber--
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${columnNumber}`).show('slow')
        } else if(columnNumber <= 0) {
            //clearInterval(timeID)
        }
    }
// // }
// class Cell {
//     constructor(name, isBarrier) {
//         this.name = name
//         this.isBarrier = isBarrier
//     }
// }
/*----- Moving commands for Pacmon -----*/
document.addEventListener('keydown', (evt)=> {
    let key = evt.which
    if(key == 38) {
        $('#up-btn').trigger('click')
        return false
    } else if(key == 39) {
        $('#right-btn').trigger('click')
        return false
    } else if(key == 40) {
        $('#down-btn').trigger('click')
        return false
    } else if(key == 37) {
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
    moveUpFunc()
})
$('#right-btn').on('click', ()=> {
    direction = 'right'
    moveRightFunc()
})
$('#down-btn').on('click', ()=> {
    direction = 'down'
    moveDownFunc()
})
$('#left-btn').on('click', ()=> {
    direction = 'left'
    moveLeftFunc()
})
function nextMove() {
    if(direction === 'up') {
        let innerValue = document.getElementById(`#r${rowNumber - 1}c${columnNumber}`).getAttribute('data-value')
        if (innerValue === 'isBarrier' ) {
            return console.log("cant move")
        } else {
            moveUpFunc()
        }
    } else if(direction === 'right') {
        let innerValue = document.getElementById(`#r${rowNumber}c${columnNumber + 1}`).getAttribute('data-value')
        if (innerValue=== 'isBarrier') {
            return console.log("cant move")
        } else {
            moveRightFunc()
        }
    } else if(direction === 'down') {
        let innerValue = document.getElementById(`#r${rowNumber + 1}c${columnNumber}`).getAttribute('data-value')
        if ( innerValue=== 'isBarrier') {
            return console.log("cant move")
        } else {
            moveDownFunc()
        }
    } else if(direction === 'left') {
        let innerValue = document.getElementById(`#r${rowNumber}c${columnNumber - 1}`).getAttribute('data-value')
        if (innerValue === 'isBarrier') {
            return console.log("cant move")
        } else {
            moveRightFunc()
        }
    }
}
/*------Render the board with cell numbers ----*/
function render() {
    board.forEach((row, index) => {
        $('tbody').append(`<tr id='r${index}'></tr>`)
        row.forEach((cell, cellIndex) => {
            if(index === 0 && cellIndex === cellIndex || index === 19 && cellIndex === cellIndex) {
                $(`#r${index}`).append(`<td id="r${index}c${cellIndex}" data-value="isBarrier"><div class='barrier'><img src='images/barrier1.png'></div></td>`)
            } else if(index === index && cellIndex === 0 || index === index && cellIndex === 16) {
                $(`#r${index}`).append(`<td id="r${index}c${cellIndex}" data-value="isBarrier"><div class='barrier'><img src='images/barrier1.png'></div></td>`) 
                //let cellAt[cellIndex]= new Cell('barrier', true)
            } else {
                $(`#r${index}`).append(`<td id="r${index}c${cellIndex}" data-value="notBarrier"></td>`)
            }
        })
    })
    $(`#r${rowNumber}c${columnNumber}`).prepend("<div id='pacmon'><img src='images/pacman.png'>")
}

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

    console.log(gameBoard)

    // render()
    newRender()
}
start()
let timeID = setInterval(nextMove, speed)
//  let celly = new Cell(`<td id='r${index}c${cellIndex}'><div class='barrier'><img src='images/barrier1.png'></div></td>`, true, 'images/barrier1.png')
            //       console.log(cell.element)

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
            // add statements for ghost or other chars
                trHTML += `<td id="r${rowIndex}c${cellIndex}" ><div id='ghost-pink'><img src='images/ghost-pink.png'></div></td>`
            } else {
                if (cell.isPellet) {
                    // append the td html for pellet\
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