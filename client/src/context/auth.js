import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const loginUser = token => {
        // store this in local stoga provided by the browser
        // window is the top level execution method of console.log. window.console.log
        // window.localStorage.setItem('authToken', token)
        localStorage.setItem('authToken', token)
        verifyStoredToken()

    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(response => {
                    const user = response.data
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    // invalid token
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // check if we have an auth token store
        verifyStoredToken()
    }, [])

    return (
         // it covers whatever the component is wrapped around the above tags
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, loginUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext}