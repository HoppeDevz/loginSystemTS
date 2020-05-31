import React from 'react';
import './style.css';
import { useState } from 'react';
import api from '../../services/api';

export default function SendMail() {
    const[email, setEmail] = useState("")
    const[alert, setAlert] = useState("")
    const[error, setError] = useState("")
    
    function sendMailHandler(e) {
        e.preventDefault();
        api.post("users/sendTokenForgotPassword", { email }).then(response => {
            if (response.data.sendMail) {
                console.log(response.data.sendMail)
                setAlert("Email enviado com sucesso!")
                setTimeout(() => {
                    setAlert("")
                },8000)
            } else {
                setError("Email não encontrado")
                setTimeout(() => {
                    setError("")
                },8000)
            }
        })
    }

    return(
        <div class='page-container'>
            <div class='sendmail-container'>
                <h1>Redefinir Senha</h1>
                <span>Chegara uma mesangem em seu email com o link para você alterar sua senha!</span>
                <div class='sendmail-infodata'>
                    <input class='input-info' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <button class='button' onClick={e => sendMailHandler(e)} >Enviar</button>
                    <p class='alert-email-send'>{alert}</p>
                    <p class='error-email-send'>{error}</p>
                </div>
            </div>
        </div>
    )
}