import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import streamAudioWithAuth from '../components/helpers/audioStreamWithAuth'
import blobUrlFromId from '../components/helpers/blobUrlFromId'

export default function EveryItem() {
    const [events, setEvents] = useState([])
    const [notes, setNotes] = useState([])
    const [audios, setAudios] = useState([])
    const [searchTag, setSearchTag] = useState("")
    const [searchTitle, setSearchTitle] = useState("")

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
            Tag:
            <SearchBar searchProp={setSearchTag} />
            Title:
            <SearchBar searchProp={setSearchTitle} />
            {[...events, ...notes, ...audios]
                .filter((item) =>
                    item.tags.toString().toLowerCase().includes(searchTag.toLowerCase())
                    && item.title.toString().toLowerCase().includes(searchTitle.toLowerCase()))

                .map((item) => {
                    return (
                        <div key={item._id}>
                            {events.includes(item) &&
                                <>
                                    <Link to={`/events/${item._id}`}>
                                        <h2>{(item.title)}</h2>
                                    </Link>
                                    <p>{new Date(item.startDate).toDateString()}</p>
                                    <p>{new Date(item.startDate).toTimeString().substring(0, 5)}</p>
                                    <p>{(item.place)}</p>
                                </>
                            }

                            {notes.includes(item) &&
                                <>
                                    <Link to={`/notes/${item._id}`}>
                                        <h2>{(item.title)}</h2>
                                    </Link>
                                    <p>{(item.description)}</p>
                                    <p>{new Date(item.createdAt).toDateString()}</p>
                                </>
                            }

                            {audios.includes(item) &&
                                <>
                                    <Link to={`/audios/${item._id}`}>
                                        <h2>{(item.title)}</h2>
                                    </Link>
                                    <button onClick={() => streamAudioWithAuth(blobUrlFromId(item._id), storedToken)}>
                                        Play
                                    </button>
                                    <p>{new Date(item.createdAt).toDateString()}</p>
                                </>
                            }

                            {item.tags.join(", ")}
                        </div>
                    )
                })

            }
        </>
    )

}