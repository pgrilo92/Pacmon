$(function(){
/*----- Variables-----*/ 
    let collumnNumber = 8
    let rowNumber = 18
    let changeDirection = false
    let timeID
    let pacmonSpeedTimer = 300
/*---- Classes ---*/
/*----- Moving functions for Pacmon -----*/
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
    $('#up-btn').on('click', ()=> {
        clearInterval(timeID)
        function moveUpFunc(){
            if(rowNumber > 1 ){
                rowNumber--
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(rowNumber <= 1 || changeDirection === true) {
                clearInterval(timeID)
                clearInterval(checkWallCollider)
                changeDirection = false
            }
        }
        timeID = setInterval(moveUpFunc, pacmonSpeedTimer)
        checkWallCollider = setInterval(touchPellet, pacmonSpeedTimer)
    })
    $('#right-btn').on('click', ()=>  {
        clearInterval(timeID)
        function moveRightFunc(){
            if(collumnNumber < 17 ){
                collumnNumber++
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(collumnNumber >= 20 || changeDirection === true) {
                clearInterval(timeID)
                clearInterval(checkWallCollider)
                changeDirection = false
            }
        }
        timeID = setInterval(moveRightFunc, pacmonSpeedTimer)
        checkWallCollider = setInterval(touchPellet, pacmonSpeedTimer)
    })
    $('#down-btn').on('click', ()=>{
        clearInterval(timeID)
        function moveDownFunc (){
            if(rowNumber < 20 ){
                rowNumber++
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(rowNumber >= 20 || changeDirection === true) {
                clearInterval(timeID)
                clearInterval(checkWallCollider)
                changeDirection = false
            }
        }
        timeID = setInterval(moveDownFunc, pacmonSpeedTimer)
        checkWallCollider = setInterval(touchPellet, pacmonSpeedTimer)
    })
    $('#left-btn').on('click', ()=>{
        clearInterval(timeID)
        function moveLeftFunc(){
            if(collumnNumber > 1 ){
                collumnNumber--
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(collumnNumber <= 1 || changeDirection === true) {
                clearInterval(timeID)
                clearInterval(checkWallCollider)
                changeDirection = false
            }
        }
        timeID = setInterval(moveLeftFunc, pacmonSpeedTimer)
        checkWallCollider = setInterval(touchPellet, pacmonSpeedTimer)
    })
    // function hitWall() {
    //     //if($('#pacmon').a)
    // }
    function touchPellet() {
        let x = $('#pacmon').parent()
        let y = $('.barrier').parent()
        console.log(x)
        console.log(y)
        let z = y.some(x)
        
        if(z===true) {
            clearInterval(timeID)
            clearInterval(checkWallCollider)
        }
    }
})