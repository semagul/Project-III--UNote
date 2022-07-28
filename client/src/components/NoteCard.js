import React from 'react'
import { Link } from 'react-router-dom'

export default function NoteCard({ title, _id, description, tags, createdAt }) {
	const formattedDate = new Date(createdAt).toDateString();

	return (
		<>
	<div className="card" style={{ width: `18rem` }}>
		<div className="card-body">

			<Link to={`/notes/${_id}`}>
			<h5 className="card-title">{title}</h5>
			</Link>

			<p className="card-text">{description}</p>
			<p>{tags.join(", ")}</p>

			<p>{formattedDate} </p>

			</div>

</div>
    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
   Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}

		
		</>
	)
}