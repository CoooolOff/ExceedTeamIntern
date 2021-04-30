import React, {useContext, useState} from "react";
import AuthContext from "../Context/AuthContext";
const InputTask = () => {
    const {completeAllTodo, addTodo , todos} = useContext(AuthContext)
    const [value, setValue] = useState('')

    const submitHandler =(event) =>{
        event.preventDefault()
        if(value.trim()){
            addTodo(value)
            setValue('')
        }
    }
    return (
        <div className="create_new_todo browser-default">
            <button className={todos.length === 0 ? 'footerNone' : 'add browser-default'} onClick={() => completeAllTodo()}><i className="fas fa-chevron-down"/></button>
            <form onSubmit={submitHandler}>
                <div >
                    <input type="text" className="message browser-default" placeholder="What needs to be done" value={value} onChange={event => setValue(event.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default InputTask