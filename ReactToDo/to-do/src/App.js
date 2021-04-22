import './App.css';
import React from "react";
import Context from "./Context";
import Task from "./todo/Task";
import TodoList from "./todo/Todolist";
import Footer from "./todo/Footer"

function App() {

    let [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem('todo')))
    let [toggler, setToggler] = React.useState('all')
    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.checked = !todo.checked
                }
                return todo
            }))
    }
    localStorage.setItem('todo', JSON.stringify(todos))
    const toggleAll = () => {
        if(todos.every(todo => todo.checked === true)){
            setTodos(todos.map((todo) => {
                todo.checked = false
                return todo
            }))
        }else{
            setTodos(todos.map((todo) => {
                todo.checked = true
                return todo
            }))
        }
    }
    let left = (todos.filter((i) => !i.checked)).length

    const removeTodo = (id) => {
        todos = todos.filter((todo) => todo.id !== id)
        setTodos(todos)
    }
    const removeCompletedTodo = () => {
        todos = todos.filter((todo) => !todo.checked)
        setTodos(todos)
    }

    const showActive = () => {
        setToggler('unchecked')
    }

    const showCompleted = () => {
        setToggler('checked')
    }

    const showAll = () => {
        setToggler('all')

    }

    const addTodo = (title) => {
        if (!todos.some(todo => todo.title === title)){
            setTodos(todos.concat([{
                title,
                id: Date.now(),
                checked: false
            }]))
        }

    }
    return (
        <Context.Provider value={{
            toggleAll,
            removeTodo,
            removeCompletedTodo,
            showAll,
            showCompleted,
            showActive,
            addTodo,
            left,
            toggler,
            todos
        }}>

            <div className="wrapper">
                <h1>React ToDos</h1>
                <div className={'todo_list'}>
                    <Task/>
                    <TodoList toggl={toggler} todos={todos} onToggle={toggleTodo}/>
                    <Footer/>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
