import React, {useContext} from "react";
import Context from "../Context";

function TodoItem({todo, onChange}) {
    const {removeTodo} = useContext(Context)
    let classes = []
    if (todo.checked) {
        classes.push('done')
    }
    return (
        <li>
            <span className={classes.join(' ')}>
                <div className="round">
                    <input id={'checkbox'+todo.id}
                           type="checkbox"
                           checked={todo.checked}
                           onChange={() => onChange(todo.id)}/>
                        <label htmlFor={'checkbox' + todo.id}/>
                </div>
                <div className={'todot'}>
                {todo.title}
                </div>
            </span>
            <button className={'closeItem'} onClick={() => removeTodo(todo.id)}>&times;</button>
        </li>
    )
}
export default TodoItem