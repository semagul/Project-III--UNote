import React from 'react'
import { Link } from 'react-router-dom'

export default function NoteCard({ title, _id, description, tags, createdAt }) {
	const formattedDate = new Date(createdAt).toDateString();

	return (
		<>
			<div className="flex-container">
				<div className="card" c>
					<Link to={`/notes/${_id}`}>
						<h5 className="card-title">{title}</h5>
					</Link>

					<p className="card-text">{description}</p>
					<p>{tags.join(", ")}</p>

					<p>{formattedDate} </p>

				</div>

			</div>

		</>
	)
}