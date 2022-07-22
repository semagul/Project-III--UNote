import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import  { AuthContext } from '../context/auth'


export default function Signup() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined)

    const nagivate = useNavigate()
    const { loginUser } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password } 
        axios.post('api/auth/login', requestBody)
            .then(response => {
                    // console.log(response.data)
                    const token = response.data.authToken
                    loginUser(token)
                    // nagivate('/notes')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)

            })
    }

    const handleEmail = e => SetEmail(e.target.value)
    const handlePassword = e => SetPassword(e.target.value)


    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

            <label htmlFor='email'>Email: </label>
            <input type='text' value={email} onChange={handleEmail}/>

            <label htmlFor='password'>Password: </label>
            <input type='password' value={password} onChange={handlePassword}/>
            
            <button action="submit">Login</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <h3>Don't have an account?</h3>
        <Link to="/signup">Click here to create an account</Link>

        </>
    
    )
}