let button   = document.querySelector('.mainButton'),
    selector = document.querySelector('.select'),
    input    = document.querySelector('.input'),
    option   = selector.querySelectorAll(`.select option`)

selector.addEventListener('change',()=>{
    input.value = option.item(selector.value).textContent
})

button.addEventListener('click' , ()=>{
   option.item(selector.value).textContent = input.value
})
