import React from "react"

export default function tags({ tags, setTags }) {

    const tagList = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow", "grocery"]

    let updateTags = (event) => {
        let options = event.target.options;
        let arr = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                arr.push(options[i].value)
            }
        }
        setTags(arr)
    }

    return (
            <select name="tags" multiple value={tags}
                onChange={event => updateTags(event)}>
                {tagList?.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
            </select>

    )
}



