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