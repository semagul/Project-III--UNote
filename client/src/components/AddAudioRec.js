import { useState } from "react"
import MicRecorder from 'mic-recorder-to-mp3'
import Tags from "./Tags";
import axios from "axios";

export default function AddAudioRec(props) {

    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [blob, setBlob] = useState(null)

    const handleSubmit = event => {
        event.preventDefault();
        (blob != null) && axiosPost();
    }

    let start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            setBlob(null)
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                }).catch((e) => console.error(e));
        }
    };

    const axiosPost = () => {
        var fd = new FormData();
        fd.append("blob", blob);
        fd.append("title", title);
        fd.append("tags", tags);

        const storedToken = localStorage.getItem('authToken')
        console.log(fd.get("blob"))
        axios.post('/api/audios', fd,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${storedToken}`
                }
            })
            .then(() => {
                setTitle('');
                setTags([]);
                props.getAllAudios();
            })
            .catch(err => console.log(err))
    }


    let stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setBlob(blob);
                setIsRecording(false);
                setIsBlocked(false);
            }).catch((e) => console.error(e));
    }

    return (
        <div className="Audios">
            <h2>Save an audio</h2>
            <form onSubmit={handleSubmit}>
                <h3>Title</h3>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h3>Record an audio</h3>
                <button className="button" type="button" onClick={start} disabled={isRecording}>Record</button>
                <button className="button" type="button" onClick={stop} disabled={!isRecording}>Stop</button>

                <h3>Tags</h3>
                <Tags
                    tags={tags}
                    setTags={setTags}
                />

                <button className="button" type="submit" disabled={isRecording}>Save this audio ➕</button>
            </form>

        </div>
    )
}

