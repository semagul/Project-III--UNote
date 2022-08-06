import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

    return (
        <>
            <Navbar bg="light" expand="lg" variant="light">
                <Container fluid>
                    <Navbar.Brand href="#">tagtag</Navbar.Brand>
                    {isLoggedIn ?
                        (
                            <>
                                <Nav.Link href="/allitems">All items</Nav.Link>
                                <Nav.Link href="/notes">Notes</Nav.Link>
                                <Nav.Link href="/events">Events</Nav.Link>
                                <Nav.Link href="/audios">Audios</Nav.Link>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-secondary">Search</Button>
                                </Form>
                                <Button variant="outline-secondary" onClick={logoutUser}>Logout</Button>
                            </>
                        ) :
                        <>
                            <Button variant="outline-secondary"><Link to="/login">Login</Link></Button>
                            <Button variant="outline-secondary"><Link to="/signup">Signup</Link></Button>

                        </>
                    }

                </Container>
            </Navbar>
        </>
    )
}