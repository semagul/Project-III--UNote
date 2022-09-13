import React, { useState } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Tags from "./Tags";

export default function AddEvent(props) {

    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
    const [place, setPlace] = useState('')
    const [details, setDetails] = useState('')
    const [tags, setTags] = useState([])

    const formattedDate = new Date(startDate).toDateString();

    const handleSubmit = event => {
        event.preventDefault()
        const storedToken = localStorage.getItem('authToken')
        axios.post('/api/events', { title, startDate, place, details, tags }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setTitle('')
                setStartDate('')
                setPlace('')
                setDetails('')
                setTags([])
                props.getAllEvents()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="mb-3">
                <h2>Add an event</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Title</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />

                    <h3>Date & Time</h3>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                            setHours(setMinutes(new Date(), 1), 0),
                            setHours(setMinutes(new Date(), 5), 12),
                            setHours(setMinutes(new Date(), 59), 23),
                        ]}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <p>{formattedDate}</p>

                    <h3>Place</h3>
                    <input
                        type="text"
                        value={place}
                        onChange={event => setPlace(event.target.value)}
                    />

                    <h3>Details</h3>
                    <input
                        type="text"
                        value={details}
                        onChange={event => setDetails(event.target.value)}
                    />

                    <h3>Tags</h3>
                    <Tags
                        tags={tags}
                        setTags={setTags}
                    />

                    <button className="button" type="submit">Save this event➕</button>
                </form>
            </div>
        </>
    )
}