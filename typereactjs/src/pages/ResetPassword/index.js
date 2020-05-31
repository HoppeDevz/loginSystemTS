import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

export default function ResetPassword() {
    const params = useParams();
    const token = params.token

    const[alert, setAlert] = useState("")
    const[error, setError] = useState("")

    const[password, setPassword] = useState("")
    const[passwordconfirmation, setPasswordconfirmation] = useState("")

    function changePasswordHandler(e) {
        e.preventDefault();
        if (password == passwordconfirmation) {
            const resetSchema = { token, newPassword: password }
            api.post("users/resetPassword", resetSchema).then(response => {
                if (response.data.changedPassword) {
                    setAlert("Senha alterada!")
                } else {
                    setError("Erro! solicite um novo link")
                    //error <token inválido>
                }
            }) 
        } else {
            setError("Senhas diferentes")
            //error <senhas diferentes>
        }
    }

    return(
        <div class='page-container'>
            <div class='resetpassword-container'>
                <h1 class='title-resetpassword'>Troque sua senha</h1>
                <div class='resetpassword-infodata'>
                    <input placeholder='Nova Senha' type='password' class='input-info' value={password} onChange={e => setPassword(e.target.value)} />
                    <input placeholder='Repita a senha' type='password' class='input-info' value={passwordconfirmation} onChange={e => setPasswordconfirmation(e.target.value)} />
                    <div class='alert-container'>
                        <button class='button' onClick={e => changePasswordHandler(e)} >Trocar</button>
                        <span class='resetpass-error'>{error}</span>
                        <span class='resetpass-alert'>{alert}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}