$(function(){
    let i = 8
    $('body').keypress((evt)=>{
        let key = evt.which
        if(key == 39){
            $('button').trigger('click')
            return false
        }
    })
    $('button').on('click', ()=>{
        if(i < 17){
            i++
            let $moveRight = $('#pacmon').detach().appendTo(`#r18c${i}`)
            
        }
    })
})