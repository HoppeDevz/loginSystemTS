import React from 'react';
import './style.css';

import { useState } from 'react'
import api from '../../services/api';
 
export default function Register() {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const[error, setError] = useState("")

    function submitHandler(e) {
        e.preventDefault();
        const first_letter_name = name[0].toUpperCase();
        const first_letter_lastaname = lastname[0].toUpperCase();
        var new_name = first_letter_name
        var new_lastname = first_letter_lastaname

        for (var letter in name) {
            if (letter !== "0") {
                new_name = new_name + name[letter]
            }    
        }

        for (var letter in lastname) {
            if (letter !== "0") {
                new_lastname = new_lastname + lastname[letter]
            }
        }

        const userSchema = {
            username,
            name: new_name,
            lastname: new_lastname,
            email,
            password
        }

        console.log(userSchema)

        api.post("users/createAccount", userSchema).then(response => {
            if (!response.data.createdAccount) {
                if (response.data.reason == "Username already exist") {
                    setError("Username em uso!")
                    setTimeout(() => {
                        setError("")
                    },8000)
                } else {
                    if (response.data.reason == "Email already exist") {
                        setError("Email em uso!")
                        setTimeout(() => {
                            setError("")
                        },8000)
                    }
                }
            }
        })
    }

    return(
        <div class='page-container'>
            <div class='register-container'>
                <h1 class='register-title'> Registrar-se</h1>
                <div class='register-schema'>
                    <input class='input-info' placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
                    <input class='input-info' placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                    <input class='input-info' placeholder="Sobrenome" value={lastname} onChange={e => setLastname(e.target.value)} />
                    <input class='input-info' placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input class='input-info' placeholder="Senha" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <div class='register-error'>
                        <button class='button' onClick={e => submitHandler(e)} >Registrar</button>
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}