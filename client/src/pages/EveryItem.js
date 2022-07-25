import React, { useEffect, useState } from "react"
import axios from "axios"

export default function EveryItem() {
    const [events, setEvents] = useState([])
    // const [notes, setNotes] = useState([])
    // const [audios, setAudios] = useState([])

    const storedToken = localStorage.getItem('authToken')

    const getAllItems = () => {
        axios.get("/api/allitems", { headers: { Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                setEvents(response.data.savedEvents)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllItems()
    }, [])
    
    return (
        <>
            <h1>All your items</h1>
            {events.map(event => (event.title)
            )}
                
            
        </>
    )

}