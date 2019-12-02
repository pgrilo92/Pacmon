//$(function(){
/*----- Variables-----*/ 
    //let columnNumber = 8
    //let rowNumber = 18
    //let changeDirection = false
    //let timeID
    //let pacmonSpeedTimer = 300
/*---- Classes ---*/

class Characters {
    constructor(name, speed, sprite, alive, columnNumber, rowNumber, timeID) {
        this.name = name
        this.speed = speed
        this.sprite = sprite
        this.alive = alive
        this.columnNumber = columnNumber
        this.rowNumber = rowNumber
        this.timeID = timeID 
    }
    moveUpFunc() {}
    moveRightFunc() {}
    moveDownFunc() {}
    moveLeftFunc() {}
}
class Pacmon extends Characters {
    constructor(name, speed, sprite, alive, columnNumber, rowNumber, timeID, lives) {
        super(name, speed, sprite, alive, columnNumber, rowNumber, timeID)
        this.lives = lives
    }
    moveUpFunc() {
        if(pacmon.rowNumber > 1 ) {
            pacmon.rowNumber--
            let $moveRight= $('#pacmon').detach().appendTo(`#r${pacmon.rowNumber}c${pacmon.columnNumber}`).show('slow')
            console.log('called')
            console.log(pacmon)
        } else if(pacmon.rowNumber <= 1) {
            clearInterval(pacmon.timeID)
        }
    }
    moveRightFunc(){
        if(pacmon.columnNumber < 17 ) {
            pacmon.columnNumber++
            let $moveRight= $('#pacmon').detach().appendTo(`#r${pacmon.rowNumber}c${pacmon.columnNumber}`).show('slow')
        } else if(pacmon.columnNumber >= 20) {
            clearInterval(pacmon.timeID)
        }
    }
    moveDownFunc () { 
        if(pacmon.rowNumber < 20 ) {
            pacmon.rowNumber++
            let $moveRight= $('#pacmon').detach().appendTo(`#r${pacmon.rowNumber}c${pacmon.columnNumber}`).show('slow')
        } else if(pacmon.rowNumber >= 20) {
            clearInterval(pacmon.timeID)
        }
    }
    moveLeftFunc() {
        if(pacmon.columnNumber > 1 ) {
            pacmon.columnNumber--
            let $moveRight= $('#pacmon').detach().appendTo(`#r${pacmon.rowNumber}c${pacmon.columnNumber}`).show('slow')
        } else if(pacmon.columnNumber <= 1) {
            clearInterval(pacmon.timeID)
        }
    }
}
// class Ghosts extends Characters {
    
// }
/*----- Moving commands for Pacmon -----*/
    $('body').keypress((evt)=> { 
        let key = evt.which
        if(key == 39){
            $('button').trigger('click')
            return false
        }
    })
    $('#play-btn').on('click', ()=> {
        let pacmon = new Pacmon('pacmon', 300, '/images/pacman.png', true, 8, 18, undefined, 3)
        console.log(pacmon)
    })
    $('#up-btn').on('click', ()=> {
        //clearInterval(pacmon.timeID)
        pacmon.timeID = setInterval(pacmon.moveUpFunc, pacmon.speed)
        console.log(pacmon.timeID)
    })

    $('#right-btn').on('click', ()=> {
        //clearInterval(pacmon.timeID)
        pacmon.timeID = setInterval(pacmon.moveRightFunc, pacmon.speed)
    })
    $('#down-btn').on('click', ()=> {
        //clearInterval(pacmon.timeID)
        pacmon.timeID = setInterval(pacmon.moveDownFunc, pacmon.speed)
    })
    $('#left-btn').on('click', ()=> {
        //clearInterval(pacmon.timeID)
        pacmon.timeID = setInterval(pacmon.moveLeftFunc, pacmon.speed)
    })
/*----- Ghost Function ------*/ 
//})