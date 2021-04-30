import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
    const {toggl} = props;
    return (
            <ul>
                {
                    props.todos.map(todo => {
                        const needToShow = toggl === 'all' || todo.checked && toggl === 'checked' || !todo.checked && toggl === 'unchecked'
                        return needToShow ? <TodoItem
                            todo={todo}
                            key={todo._id}
                        /> : null
                    })
                }
            </ul>
    )
}


export default TodoList