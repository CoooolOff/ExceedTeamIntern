import React, {useContext} from "react";
import Context from "../Context";

function Footer() {
    const {left,toggler, showAll, showCompleted, showActive, removeCompletedTodo, todos} = useContext(Context)
    console.log(toggler)
    return (
        <div className={todos.length == 0 ? 'footer footerNone' : 'footer'}>
            <div className={'left'}><p>{left} todo left</p></div>
            <div>
                <label> <input type="radio" checked={toggler === 'all'} name="myName" value="1" onChange={showAll}/><span>All</span></label>
                <label> <input type="radio" name="myName" value="2" onChange={showCompleted}/><span>Completed</span></label>
                <label> <input type="radio" name="myName" value="3" onChange={showActive}/><span>Active</span></label>
            </div>
            <div className={'closeAll'}>
                <button className={'clearCompleted'} onClick={() => removeCompletedTodo()}>Clear Completed</button>
            </div>
        </div>
    )
}

export default Footer