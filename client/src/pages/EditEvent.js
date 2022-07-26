import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tags from "../components/Tags";

export default function EditEvent() {
	const [title, setTitle] = useState('')
	const [date, setDate] = useState('')
	const [place, setPlace] = useState('')
	const [details, setDetails] = useState('')
	const [tags, setTags] = useState([])

	const { id } = useParams()

	const navigate = useNavigate()

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
				<h2>Title</h2>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<h2>Date & Time</h2>
				<input
					type="date"
					value={date}
					onChange={e => setDate(e.target.value)}
				/>

				<h2>Place</h2>
				<input
					type="text"
					value={place}
					onChange={e => setPlace(e.target.value)}
				/>

				<h2>Details</h2>
				<input
					type="text"
					value={details}
					onChange={e => setDetails(e.target.value)}
				/>

				<h2>Tags</h2>
				<Tags
					tags={tags}
					setTags={setTags}
				/>

				<button type="submit">Update this event</button>
			</form>

			<button onClick={deleteEvent}>Delete this event ❌</button>
		</>
	)
}