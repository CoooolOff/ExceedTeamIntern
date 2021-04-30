import {useState, useEffect , useCallback} from "react"

export const useAuth = () => {
    let dataUser = null
    let dataToken = null
    const data = JSON.parse(localStorage.getItem('userData'))
    if(data && data.token){
        dataUser = data.userID
        dataToken = data.token
    }

    const [token, setToken] = useState(dataToken)
    const [userID, setUserID] = useState(dataUser)
    const [isReady, setIsReady] = useState(false)

    const login = (jwtToken , id) => {
        setToken(jwtToken)
        setUserID(id)

        localStorage.setItem('userData', JSON.stringify({
            userID: id,
            token: jwtToken
        }))
    }

    const logout = () => {
        setToken(null)
        setUserID(null)
        localStorage.clear()
    }
    return {login, logout , token ,userID ,isReady}
}