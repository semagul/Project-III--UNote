import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const logoutUser = () => {
        localStorage.removeItem('authToken')
        setIsLoggedIn(false)
        setUser(null)
    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            return axios
                .get('/api/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(response => {
                    const user = response.data
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyStoredToken()
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            storeToken,
            user,
            isLoading,
            verifyStoredToken,
            logoutUser
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }