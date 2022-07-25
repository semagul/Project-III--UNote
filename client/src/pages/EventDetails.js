import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function EventDetails() {

	const { id } = useParams()

	const [event, setEvent] = useState(null)

	useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setEvent(response.data)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<>
			{event === null ? <h3>Loading...</h3> :
				<>
					<h1>Event Details</h1>
					<h3>{event.title}</h3>
					<h5>{event.date}</h5>
                    <h5>{event.place}</h5>
                    <h5>{event.details}</h5>
                    <h5>{event.tags}</h5>
					<Link to={`/events/edit/${event._id}`}>
						<button>Edit this event 📝</button>
					</Link>
				</>
			}
		</>
	)
}