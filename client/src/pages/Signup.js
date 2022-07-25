import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [name, SetName ] =  useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined)

    const nagivate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password, name } 
        axios.post('api/auth/signup', requestBody)
            .then(response => {
                    nagivate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)

            })
    }

    const handleName = e => SetName(e.target.value)
    const handleEmail = e => SetEmail(e.target.value)
    const handlePassword = e => SetPassword(e.target.value)


    return (
        <>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: </label>
            <input type='text' value={name} onChange={handleName}/>

            <label htmlFor='email'>Email: </label>
            <input type='text' value={email} onChange={handleEmail}/>

            <label htmlFor='password'>Password: </label>
            <input type='password' value={password} onChange={handlePassword}/>
            
            <button action="submit">Sign Up</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <h3>Already have an account?</h3>
        <Link to="/login">Login</Link>
        </>
    
    )
}