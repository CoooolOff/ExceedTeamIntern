let addMessage   = document.querySelector('.message'),
    checkButton    = document.querySelector('.add'),
    todo         = document.querySelector('.todo'),
    delCompleted = document.querySelector('.delCompleted'),
    completed    = document.querySelector('.completed'),
    all          = document.querySelector('.all'),
    active       = document.querySelector('.active'),
    left         = document.querySelector('.left'),
    footer       = document.querySelector('.footer'),
    todolist     = [],
    activeList   = [],
    compList     = []



if(localStorage.getItem('todo')){
    try {
        todolist = JSON.parse(localStorage.getItem('todo'))
        findLeft(todolist)
        printNewToDO(todolist)
    } catch (err) {
        console.log(err)
    }
}
addMessage.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13 && addMessage.value && !isEqual(addMessage.value)){
            let newTodo = {
                todo: addMessage.value,
                checked: false,
            }
            todolist.push(newTodo)
            printNewToDO(todolist)
            setStorage(todolist)
            findLeft(todolist)
            addMessage.value = ''
        }

})
checkButton.addEventListener('click', ()=>{
    if (todolist.every(e => e.checked == true)){
        todolist.forEach(i => i.checked = false)
        printNewToDO(todolist)
        findLeft(todolist)
    }else{
        todolist.forEach(i => i.checked = true)
        printNewToDO(todolist)
        findLeft(todolist)
    }
})
document.addEventListener('click', (evnt)=>{
    if(evnt.target.dataset.action){
        let itemText = evnt.target.parentNode.querySelector('.item').textContent
        todolist.splice(todolist.findIndex(item => item.todo === itemText), 1)
        findLeft(todolist)
        printNewToDO(todolist)
        setStorage(todolist)
    }
})
all.addEventListener('click' , ()=>{
    printNewToDO(todolist)
    findLeft(todolist)
})
active.addEventListener('click' , ()=>{
    activeList = todolist.filter((val)=>{
        return !val.checked
    })
    printNewToDO(activeList)
})
completed.addEventListener('click', ()=>{
    compList = todolist.filter((val)=>{
        return val.checked
    })
    printNewToDO(compList)
})
delCompleted.addEventListener('click',()=>{
    todolist = todolist.filter((val)=>{
        return !val.checked
    })
    setStorage(todolist)
    printNewToDO(todolist)
    findLeft(todolist)
})
todo.addEventListener('change', (event)=> {

    let idInput    = event.target.getAttribute('id'),
        forLabel   = todo.querySelector(`[for = ${idInput}]`),
        valueLabel = forLabel.innerHTML

    todolist.forEach((item)=>{
        if(item.todo === valueLabel){
            item.checked = !item.checked
            setStorage(todolist)
            findLeft(todolist)
        }
    })

})
function findLeft(arr){
    let iter = 0;
    arr.forEach((i)=>{
        if(!i.checked) ++iter
    })
    left.textContent = `${iter} :iter left`
    footerClose()
}
function footerClose(){
    todolist.length == 0 ? footer.classList.toggle('footerNone' , true) : footer.classList.toggle('footerNone' , false)
}
function printNewToDO(arr){
    let createTask = ''
    if(arr){
        arr.forEach((item , i) => {
            createTask += `
        <li>
            <input class="check" type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label class="item" for="item_${i}">${item.todo}</label>
            <button class="close" data-action="close">&tosa;</button>
        </li>
        `;
        })
    }
    todo.innerHTML = createTask

}
function setStorage(arr){
    try{
        localStorage.setItem('todo', JSON.stringify(arr))
    }catch (err){
        console.log(err)
    }
}
function isEqual(message){
    return todolist.some((item)=> item.todo === message)
}
