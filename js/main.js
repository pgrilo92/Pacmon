$(function(){
/*----- Variables-----*/ 
    let collumnNumber = 8
    let rowNumber = 18
    let changeDirection = false
    let timeID
    let pacmonSpeedTimer = 600
/*---- Classes ---*/
/*----- Moving functions for Pacmon -----*/
    $('body').keypress((evt)=>{
        let key = evt.which
        if(key == 39){
            $('button').trigger('click')
            return false
        }
    })
    $('#up-btn').on('click', ()=>{
        clearInterval(timeID)
        function moveUpFunc(){
            if(rowNumber > 1 ){
                rowNumber--
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(rowNumber <= 1 || changeDirection === true) {
                clearInterval(timeID)
                changeDirection = false
            }
        }
        timeID = setInterval(moveUpFunc, pacmonSpeedTimer)
    })
    $('#right-btn').on('click', ()=>  {
        clearInterval(timeID)
        function moveRightFunc(){
            if(collumnNumber < 17 ){
                collumnNumber++
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(collumnNumber >= 20 || changeDirection === true) {
                clearInterval(timeID)
                changeDirection = false
            }
        }
        timeID = setInterval(moveRightFunc, pacmonSpeedTimer)
    })
    $('#down-btn').on('click', ()=>{
        clearInterval(timeID)
        function moveDownFunc (){
            if(rowNumber < 20 ){
                rowNumber++
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(rowNumber >= 20 || changeDirection === true) {
                clearInterval(timeID)
                changeDirection = false
            }
        }
        timeID = setInterval(moveDownFunc, pacmonSpeedTimer)
    })
    $('#left-btn').on('click', ()=>{
        clearInterval(timeID)
        function moveLeftFunc(){
            if(collumnNumber > 1 ){
                collumnNumber--
                let $moveRight= $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`).show('slow')
            } else if(collumnNumber <= 1 || changeDirection === true) {
                clearInterval(timeID)
                changeDirection = false
            }
        }
        timeID = setInterval(moveLeftFunc, pacmonSpeedTimer)
    })
/
})