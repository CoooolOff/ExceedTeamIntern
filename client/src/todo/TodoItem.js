import React, {useContext} from "react";
import AuthContext from "../Context/AuthContext";
function TodoItem({todo}) {
    const {completedTodo, deleteTodo} = useContext(AuthContext)
    let classes = []
    if (todo.checked) {
        classes.push('done')
    }
    return (
        <li>
            <div className="colorLine" style={{backgroundColor: todo.color}}></div>
            <div className="todoItem">
                <span className={classes.join(' ')}>
                    <div className="round">
                        <input id={'checkbox'+todo._id}
                           type="checkbox"
                           checked={todo.checked}
                           onChange={() => completedTodo(todo._id)}/>
                        <label htmlFor={'checkbox' + todo._id}/>
                    </div>
                <div className={'todot'}>
                {todo.title}
                </div>
            </span>
                <button className={'closeItem'} onClick={() => deleteTodo(todo._id)}>&times;</button>
            </div>

        </li>
    )
}
export default TodoItem