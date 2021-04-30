import React, {useContext} from "react";
import AuthContext from "../Context/AuthContext";
function Footer() {
    const {left,toggler, showAll, showCompleted, showActive, deleteCheckedTodo,todos} = useContext(AuthContext)
    return (
        <div className={todos.length == 0 ? 'footer footerNone' : 'footer'}>
            <div className={'left'}><p>{left} todo left</p></div>
            <div className="filter-todo">
                <label> <input className="browser-default" type="radio" checked={toggler === 'all'} name="myName" value="1" onChange={showAll}/><span>All</span></label>
                <label> <input className="browser-default" type="radio" name="myName" value="2" onChange={showCompleted}/><span>Completed</span></label>
                <label> <input className="browser-default" type="radio" name="myName" value="3" onChange={showActive}/><span>Active</span></label>
            </div>
            <div className={'closeAll'}>
                <button className={'clearCompleted'}  onClick={deleteCheckedTodo}>Clear Completed</button>
            </div>
        </div>
    )
}

export default Footer