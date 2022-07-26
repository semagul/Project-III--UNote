import React from 'react'
import { Link } from 'react-router-dom'


export default function EventCard({ _id, title, startDate, place, details, tags }) {
	const eventTime = startDate?.slice(11, 16)
	const formattedDate = new Date(startDate).toDateString()

	return (
		<div>
			<Link to={`/events/${_id}`}>
				<h3>{title}</h3>
			</Link>

			<p>{formattedDate}</p>
			<p>{eventTime}</p>
			<p>{place}</p>
			<p>{details}</p>
			<p>{tags.map((el, i) => (
				i === tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
			))}</p>
		</div>
	)
}