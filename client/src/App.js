import React, {useEffect} from "react"
import AuthContext from "./Context/AuthContext";
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"

function App() {
    const {login, logout , token ,userID ,isReady} = useAuth()
    const isLogin = !!token
    const routs = useRoutes(isLogin)

    return (
        <AuthContext.Provider value={{login, logout , token ,userID ,isReady ,isLogin}}>
            <div className="App">
                <BrowserRouter>
                    {routs}
                </BrowserRouter>
            </div>
        </AuthContext.Provider>

)
}

export default App;
