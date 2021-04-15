let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');
    let input = document.querySelector('.input');
    let button = document.querySelector('.mainButton');
    let current = document.querySelector('.select__current');
    let id = 'i1';

    input.value = current.innerText;
    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        id = this.id;
        currentText.innerText = text;
        console.log(id);
        input.value = text;
        text = currentText.innerText;
        select.classList.remove('is-active');
    }
    input.addEventListener('keyup', ()=>{
        console.log(input.value);
        if(input.value){
            input.classList.toggle('submitting', false)
        }
    })
    button.addEventListener('click',()=>{
        if(input.value){
            current.innerText = input.value;
            document.getElementById(id).innerText = current.innerText;
        }else {
            input.classList.add('submitting')
        }
    })

};

select();