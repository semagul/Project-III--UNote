import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
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
                            <Button variant="outline-secondary">Login</Button>
                            <Button variant="outline-secondary">Signup</Button>

                        </>
                    }
                    {/* <nav>
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

        </nav> */}




                    {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}




                </Container>
            </Navbar>
        </>
    )
}