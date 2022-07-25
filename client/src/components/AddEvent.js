import React, { useState } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export default function AddEvent(props) {

    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
    const [place, setPlace] = useState('')
    const [details, setDetails] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const formattedDate = new Date(startDate).toDateString();
    
    const handleSubmit = event => {
        event.preventDefault()
        const storedToken = localStorage.getItem('authToken')
        axios.post('/api/events', { title, startDate, place, details, tags: selectedTags },{ headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setTitle('')
                setStartDate('')
                setPlace('')
                setDetails('')
                setSelectedTags([])
                props.getAllEvents()
            })
            .catch(err => console.log(err))
    }

    let updateSelectedTags = (event) => {
        let options = event.target.options;
        let arr = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                arr.push(options[i].value)
            }
        }
        setSelectedTags(arr)
    }

    const tags = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow", "grocery"]


    return (
        <>
            <h1>Add an event</h1>
            <form onSubmit={ handleSubmit }>
                <h2>Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h2>Date & Time</h2>
                <DatePicker
                    selected={ startDate }
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
                
                <h2>Place</h2>
                <input
                    type="text"
                    value={ place }
                    onChange={event => setPlace(event.target.value)}
                />

                <h2>Details</h2>
                <input
                    type="text"
                    value={ details }
                    onChange={event => setDetails(event.target.value)}
                />

                <h2>Tags</h2>

                <select name="tags" multiple value={ selectedTags }
                    onChange={event => updateSelectedTags(event)}>
                    {tags?.map((tag) => <option key={tag} value={tag}>{tag}</option>)}

                </select>
                <button type="submit">Save this event➕</button>
            </form>
        </>
    )
}