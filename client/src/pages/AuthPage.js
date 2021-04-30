import React, {useState, useContext, useEffect} from "react";
import './AuthPage.css'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const AuthPage = () => {
    const {login} = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload=initAuth;
    const meta = document.createElement("meta");
    meta.name="google-signin-client_id";
    meta.content="%REACT_APP_GOOGLE_ID_OF_WEB_CLIENT%";
    document.head.appendChild(meta);
    document.head.appendChild(script);

    function initAuth () {
        window.gapi.load('auth2', function () {
            window.gapi.auth2
                .init(
                    {
                        client_id: '714199568745-leaivbt9g6tkq6n4en529k430si40m32.apps.googleusercontent.com'
                    })
                .then(() => console.log('init ok'),
                    () => console.log('init error'))
        })
    }

    const logIn = () => {

        const authOk = async (user) => {
            const gmail = user.getBasicProfile()
            try {
                await axios.post('/api/auth/gLogin', {gmail}, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response.data.userId)
                        login(response.data.token, response.data.userId)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        const authErr = () => {
            console.log('ne ok')
        }
        const GoogleAuth = window.gapi.auth2.getAuthInstance()
        GoogleAuth.signIn({
            scope: 'profile email'
        }).then(authOk, authErr)
    }
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => console.log(response))
        } catch (err) {
            console.log(err)
        }
    }

    const loginHandler = () => {
        axios.post('/api/auth/login', {...form}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( response => {
                console.log(response.data)
                login(response.data.token, response.data.userId)
            })
    }
    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h2>Авторизация</h2>
                                <form className="login" onSubmit={e => e.preventDefault()}>
                                    <p>Введите Ваш логин и пароль</p>
                                    <div className="inputField">
                                        <input type="email"
                                               name="email"
                                               className="validate"
                                               onChange={changeHandler}
                                               placeholder="Введите логин"
                                        />
                                    </div>
                                    <div className="inputField">
                                        <input type="password"
                                               name="password"
                                               className="validate"
                                               onChange={changeHandler}
                                               placeholder="Введите пароль"
                                        />
                                    </div>
                                    <div className="loginLogout">
                                        <button
                                            onClick={loginHandler}
                                            className="authButton">
                                            Войти
                                        </button>
                                        <button onClick={logIn}>Log In</button>
                                        <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
                                    </div>
                                </form>
                            </Route>
                            <Route path="/registration">
                                <h2>Регистрация</h2>
                                <form className="login" onSubmit={e => e.preventDefault()}>
                                    <p>Введите Ваш логин и пароль</p>
                                    <div className="inputField">
                                        <input type="email"
                                               name="email"
                                               className="validate"
                                               onChange={changeHandler}
                                               placeholder="Введите логин"
                                        />
                                    </div>
                                    <div className="inputField">
                                        <input type="password"
                                               name="password"
                                               className="validate"
                                               onChange={changeHandler}
                                               placeholder="Введите пароль"
                                        />
                                    </div>
                                    <div className="loginLogout">
                                        <button
                                            onClick={registerHandler}
                                            className="authButton">
                                            Зарегистрироваться
                                        </button>
                                        <Link to="/login" className="btn-outline btn-reg">Есть аккаунт?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}
export default AuthPage