import React from 'react'
import { Link } from 'react-router-dom'

export default function AudioCard({ title, _id, blobURL, tags, createdAt }) {
    const formattedDate = new Date(createdAt).toDateString();


    return (
        <div>
            <Link to={`/bloburl/${_id}`}>
                <h3>{title}</h3>
            </Link>

            <audio src={`${process.env.REACT_APP_BLOB_URL}/${_id}`} controls="controls" />

            {tags.map((el, i) => (
                i === tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
            ))}

            <p>Created: {formattedDate} </p>

        </div>
    )
}