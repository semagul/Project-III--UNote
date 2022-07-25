import React, { useEffect, useState } from "react"
import axios from "axios"
import AddEvent from "../components/AddEvent"
import EventCard from "../components/EventCard"

export default function EventList() {
    const [events, setEvents] = useState([])

    const getAllEvents = () => {
        axios.get("/api/events")
            .then(response => {
                setEvents(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <>
            <h1>All your events</h1>
            <AddEvent getAllEvents={getAllEvents} />
            {events.map(event => <EventCard key={event._id} {...event} />)}
        </>
    )
}