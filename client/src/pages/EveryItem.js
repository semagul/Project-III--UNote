import React, { useEffect, useState } from "react"
import axios from "axios"

export default function EveryItem() {
    const [events, setEvents] = useState([])
    const [notes, setNotes] = useState([])
    const [audios, setAudios] = useState([])

    const storedToken = localStorage.getItem('authToken')
    const getAllItems = () => {
        axios.get("/api/allitems", { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setEvents(response.data.createdEvents)
                setNotes(response.data.createdNotes)
                setAudios(response.data.createdAudios)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <>
            <h1>All your items</h1>
            {events.map(event => (
                <div key={(event._id)}>
                    <h2>{(event.title)}</h2>
                    <p>{(event.date)}</p>
                    <p>{(event.place)}</p>
                    <p>{(event.tags)}</p>
                </div>
            )
            )}

            {notes.map(note => (
                <div key={(note._id)}>
                    <h2>{(note.title)}</h2>
                    <p>{(note.description)}</p>
                    <p>{(note.tags)}</p>
                </div>
            )
            )}
            {audios.map(audio => (
                <div key={(audio._id)}>
                    <h2>{(audio.title)}</h2>
                    <p>{(audio.tags)}</p>
                </div>
            )
            )}


        </>
    )

}