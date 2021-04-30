import React,{useContext} from "react";
import AuthContext from "../Context/AuthContext";
import {useAuth} from "../hooks/auth.hook";

const NavBar = () =>{
    const{logout} = useAuth()
    return(
        <div className="navbar">
            <h5>MERN TODO</h5>
            <button className="logout"><a href="/" onClick={() =>logout()}>LOGOUT</a></button>
        </div>
    )
}

export default NavBar