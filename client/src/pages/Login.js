import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { storeToken, verifyStoredToken } = useContext(AuthContext)

    const nagivate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password }
        axios.post('api/auth/login', requestBody)
            .then(response => {
                const token = response.data.authToken
                storeToken(token)
                verifyStoredToken()
                    .then(() => {
                        nagivate('/allitems')
                    })

            })
            .catch(err => {
                console.log(err)
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)

            })
    }

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)


    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor='email'>Email: </label>
                <input type='text' value={email} onChange={handleEmail} />

                <label htmlFor='password'>Password: </label>
                <input type='password' value={password} onChange={handlePassword} />

                <button className="button" action="submit">Login</button>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}

            <h3>Don't have an account?</h3>
            <Link to="/signup">Click here to create an account</Link>

        </>

    )
}