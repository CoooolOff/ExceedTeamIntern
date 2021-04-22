import React, {useContext, useState} from "react";
import Context from "../Context";

const InputTask = () => {
    const {toggleAll, addTodo , todos} = useContext(Context)
    const [value, setValue] = useState('')

    const submitHandler =(event) =>{
        event.preventDefault()
        if(value.trim()){
            addTodo(value)
            setValue('')
        }
    }
    return (
        <div className="create_new_todo">
            <button className={todos.length == 0 ? 'footerNone' : 'add'} onClick={() => toggleAll()}><i className="fas fa-chevron-down"></i></button>
            <form onSubmit={submitHandler}>
                <input type="text" className="message" placeholder="What needs to be done" value={value} onChange={event => setValue(event.target.value)} />
            </form>
        </div>
    )
}

export default InputTask