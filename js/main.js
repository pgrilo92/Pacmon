$(function(){
    let collumnNumber = 8
    let rowNumber = 18
    $('body').keypress((evt)=>{
        let key = evt.which
        if(key == 39){
            $('button').trigger('click')
            return false
        }
    })
    $('#up-btn').on('click', ()=>{
        if(rowNumber > 1){
            rowNumber--
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`)
        }
    })
    $('#right-btn').on('click', ()=>{
        if(collumnNumber < 16){
            collumnNumber++
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`)
        }
    })
    $('#down-btn').on('click', ()=>{
        if(rowNumber < 20){
            rowNumber++
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`)
        }
    })
    $('#left-btn').on('click', ()=>{
        if(collumnNumber > 1){
            collumnNumber--
            let $moveRight = $('#pacmon').detach().appendTo(`#r${rowNumber}c${collumnNumber}`)
        }
    })
})