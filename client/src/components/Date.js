import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export default function date(startDate, setStartDate) {
    setStartDate(setHours(setMinutes(new Date(), 30), 16))
    const formattedDate = new Date(startDate).toDateString()
    const eventTime = startDate?.slice(11, 16)

    return (

        // QUESTION I
        // what I want:
        // if it is for add${item} page i want to render the calender
        // if it is for ${item} details or everyitem page i want to render <p>{formattedDate}</p> as text
        // QUESTION I.B: same for tags

        // QUESTION II
        // is it possible to create a component for handlesubmit and delete that I use for differrent items 

        // QUESTION III
        // is it possible to render line 47-61 of EveryItem

        // todo : audiodetails

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
                
                
                
    )
}