import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditEvent() {

	const { id } = useParams()

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [date, setDate] = useState('')
    const [place, setPlace] = useState('')
    const [details, setDetails] = useState('')
    const [tags, setTags] = useState('')
	
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				const { title, date, place, details, tags } = response.data
				setTitle(title)
				setDate(date)
                setPlace(place)
                setDetails(details)
                setTags(tags)
			})
			.catch(err => console.log(err))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { title, date, place, details, tags }
        const storedToken = localStorage.getItem('authToken')
		// put request to the backend to update the event
		axios.put(`/api/events/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/events')
			})
			.catch(err => console.log(err))
	}

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
			<h1>Edit event</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<input
					type="date"
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
                <input
					type="text"
					value={place}
					onChange={e => setPlace(e.target.value)}
				/>
                <input
					type="text"
					value={details}
					onChange={e => setDetails(e.target.value)}
				/>
                <input
					type="text"
					value={tags}
					onChange={e => setTags(e.target.value)}
				/>
				<button type="submit">Update this event</button>
			</form>
			<button onClick={deleteEvent}>Delete this event ❌</button>
		</>
	)
}