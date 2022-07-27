import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function EventDetails() {
	const [event, setEvent] = useState(null)
	
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setEvent(response.data)
			})
			.catch(err => console.log(err))
	}, [])

	const deleteEvent = () => {
		const storedToken = localStorage.getItem('authToken')
		axios.delete(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/events')
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{event === null ? <h3>Loading...</h3> :
				<>
					<h1>Event Details</h1>
					<h3>{event.title}</h3>
					<p>{event.date}</p>
					<p>{event.place}</p>
					<p>{event.details}</p>
					<p>{event.tags.map((el, i) => (
                                i === event.tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
                            ))}</p>
					<Link to={`/events/edit/${event._id}`}>
						<button>Edit this event 📝</button>
					</Link>
					<button onClick={deleteEvent}>Delete this event ❌</button>
				</>
			}
		</>
	)
}