import React from 'react';
import { useState } from 'react';
import './style.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import anim from '../../assets/1804-cup-game-loader.gif';

export default function Home() {
    const history = useHistory()
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[alerterror, setError] = useState("")

    function tryLogin(e) {
        e.preventDefault();
        api.post("users/tryLogin", {username: username,password: password}).then(response => {
            if (response.data.login) {
                localStorage.setItem('username', username)
                history.push('/dashboard')
            } else {
                setError("Senha Incorreta!")
                console.log(alerterror)

                setTimeout(() => {
                    setError("")
                },3000)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    function registerHandler() {
        history.push('/register')
    }

    function forgotPassword(e) {
        e.preventDefault();
        history.push('/forgotpassword')
    }

    return(
        <div class='page-container'>

            <div class='login-container'>
                <h1 class='login-title'>HoppeMedia</h1>
                <form class='input-container'>
                    <input class='input-info' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    <input class='input-info' type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
                    <div class='button-alert-container'>
                        <button class='button' onClick={e => tryLogin(e)}>Login</button>
                        <span>{alerterror}</span>
                    </div>
                </form>
                <p class='warning-no-registered'>Ainda não é cadastrado?</p>
                <button class='register-button' onClick={() => registerHandler()} >Registrar-se</button>
                <br></br>
                <button class='register-button' onClick={e => forgotPassword(e)}>Esqueci minha senha</button>

            </div>

        </div>
    )
}