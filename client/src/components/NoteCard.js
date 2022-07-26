import React from 'react'
import { Link } from 'react-router-dom'

export default function NoteCard({ title, _id, description, tags, createdAt }) {
	const formattedDate = new Date(createdAt).toDateString();

	return (
		<div>

			<Link to={`/notes/${_id}`}>
				<h3>{title}</h3>
			</Link>

			<p>{description}</p>
			<p>{tags.map((el, i) => (
				i === tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
			))}</p>

			<p>{formattedDate} </p>

		</div>
	)
}