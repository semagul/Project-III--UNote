import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function Navbar() {
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)


    return (
        <nav>
            <Link to="/allitems">
                <button>All items</button>
            </Link>
            {isLoggedIn ?
                (
                    <>
                        <Link to='/notes'>
                            <button>Notes</button>
                        </Link>
                        <Link to='/events'>
                            <button>Events</button>
                        </Link>
                        <Link to='/audios'>
                            <button>Audios</button>
                        </Link>
                        <button onClick={logoutUser}>Logout</button>
                    </>
                ) :
                <>
                    <Link to="/Signup">
                        <button>Signup</button>
                    </Link>
                    <Link to="/Login">
                        <button>Login</button>
                    </Link>

                </>
            }

        </nav>
    )
}
