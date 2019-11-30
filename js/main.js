$(function(){
    let i = 2
    $('body').keypress((evt)=>{
        let key = evt.which
        if(key == 39){
            $('button').trigger('click')
            return false
        }
    })
    $('button').on('click', ()=>{
        if(i <=5 ){
            let $moveRight = $('#pacmon').detach().appendTo(`#${i}`)
            i++
        }
    })
})