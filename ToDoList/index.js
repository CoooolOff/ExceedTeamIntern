let addMessage   = document.querySelector('.message'),
    addButton    = document.querySelector('.add'),
    todo         = document.querySelector('.todo'),
    delCompleted = document.querySelector('.delCompleted'),
    completed    = document.querySelector('.completed'),
    all          = document.querySelector('.all'),
    active       = document.querySelector('.active'),
    btnClose     = [],
    todolist     = [],
    activeList   = [],
    compList     = []

if(localStorage.getItem('todo')){
    try {
        todolist = JSON.parse(localStorage.getItem('todo'))
        printNewToDO(todolist)
    } catch (err) {
        console.log(err)
    }
}
addButton.addEventListener('click', ()=>{
    if(addMessage.value && !isEqual(addMessage.value)){
        let newTodo = {
                 todo: addMessage.value,
              checked: false,
        }
        todolist.push(newTodo)
        printNewToDO(todolist)
        setStorage(todolist)
        addMessage.value = ''
    }

})
document.addEventListener('click', (evnt)=>{
    if(evnt.target.dataset.action){
        let itemText = evnt.target.parentNode.querySelector('.item').textContent
        todolist.splice(todolist.findIndex(item => item.todo === itemText), 1)
        printNewToDO(todolist)
        setStorage(todolist)
    }
})
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
all.addEventListener('click' , ()=>{
    printNewToDO(todolist)
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
})
todo.addEventListener('change', (event)=> {

    let idInput    = event.target.getAttribute('id')
    let forLabel   = todo.querySelector(`[for = ${idInput}]`)
    let valueLabel = forLabel.innerHTML

    todolist.forEach((item)=>{
        if(item.todo === valueLabel){
            item.checked = !item.checked
            setStorage(todolist)
        }
    })
})
function printNewToDO(arr){
    let createTask = ''
    if(arr){
        arr.forEach((item , i) => {
            createTask += `
        <li>
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label class="item" for="item_${i}">${item.todo}</label>
            <button class="close" data-action="close">&tosa;</button>
        </li>
        `;
        })
    }
    todo.innerHTML = createTask

}