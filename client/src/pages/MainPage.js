import React, {useContext, useEffect} from "react";
import AuthContext from "../Context/AuthContext";
import Task from "../todo/Task";
import TodoList from "../todo/Todolist";
import Footer from "../todo/Footer"
import ColorPicker from "../todo/ColorPicker";
import NavBar from "../todo/NavBar";
import axios from "axios";

function MainPage() {
    let colors = ['blue', 'red' ,'green', 'black']
    const {userID} = useContext(AuthContext)

    const [todos, setTodos] = React.useState([])
    const [color, setColor] = React.useState(colors[0])
    const [toggler, setToggler] = React.useState('all')

    const getTodo = async () =>{
        console.log('>>', userID)
        try {
            await axios.get('/api/todo',{
                headers:{
                    'Content-Type': 'application/json'
                },
                params: { userID }
            })
                .then(response => {
                    console.log(response.data)
                    setTodos(response.data)
                })
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {getTodo()},[userID])

    const addHandler = async (text , color) =>{
        try {
            await axios.post('/api/todo/add',{text, userID, color},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(response => setTodos([...todos, response.data])
                )
        }catch (err){
            console.log(err)
        }
    }

    const deleteTodo = async (ID) =>{
        try {
            await axios.delete(`/api/todo/delete/${ID}`, {ID},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(() => getTodo())
        }catch (e) {
            console.log(e)
        }
    }

    const deleteCheckedTodo = async () =>{
        try {
            await axios.delete(`/api/todo/deleteCheckedTodo`,{data: {userID}},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(() => getTodo())
        }catch (e) {
            console.log(e)
        }
    }

    const completedTodo = async (_id) =>{
        try {
            await axios.put(`/api/todo/completed/${_id}`, {_id},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {getTodo()})
        }catch (e) {
            console.log(e)
        }
    }
    const completeAllTodo = async () =>{
        try {
            await axios.put(`/api/todo/completeAll`, {userID}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {getTodo()})
        }catch (e) {
            console.log(e)
        }
    }


    let left = (todos.filter((i) => !i.checked)).length


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
            addHandler(title , color)
            getTodo()
        }
    }
    return (
        <AuthContext.Provider value={{
            completeAllTodo,
            deleteCheckedTodo,
            showAll,
            showCompleted,
            showActive,
            addTodo,
            left,
            toggler,
            todos,
            deleteTodo,
            completedTodo
        }}>
            <NavBar/>
            <div className="wrapper">
                <div className={'todo_list'}>
                    <ColorPicker colors={colors} value={color} onColorChange={setColor}/>
                    <Task/>
                    <TodoList toggl={toggler} todos={todos}/>
                    <Footer/>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default MainPage;
