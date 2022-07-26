import { useState, useEffect } from "react"
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";
import packageJson from '../../package.json';

export default function AddAudioRec(props) {

    const [title, setTitle] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobUrl] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [latestBlobID, setLatestBlobID] = useState('')
    

    useEffect(() => { 
        
        console.log('latestBlobID=' + latestBlobID);
           const blobURLBackEnd = `${packageJson.proxy}/api/bloburl/${latestBlobID}`;
           setBlobUrl(blobURLBackEnd); // E: the backend will change the file to stream from the database
           console.log('bloburl=' + blobURL);
        }, [latestBlobID, blobURL])
    console.log(packageJson.proxy)

    const handleSubmit = event => {
        event.preventDefault()
//         const storedToken = localStorage.getItem('authToken')
//         axios.post('/api/audios', { title, blobURL, tags: selectedTags }, { headers: { Authorization: `Bearer ${storedToken}` } })
//             .then(response => {
//                 setTitle('')
// // WHAT TO  DO FOR BLOB
//                 setSelectedTags([])
//                 props.getAllAudios()
//             })
//             .catch(err => console.log(err))
    }

    let start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                }).catch((e) => console.error(e));
        }
    };

    // E: this will send the mp3 blob to the backend!
    let upload = (blob) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                const resp = JSON.parse(e.target.responseText)
                console.log(resp);
                setLatestBlobID(resp._id);
                console.log('latestBlobID=' + latestBlobID);
            }
        }

        var fd = new FormData();
        fd.append("data", blob);
        fd.append("title", title);
        fd.append("tags", selectedTags);
        
        const url = `${packageJson.proxy}/api/audios`;
        console.log(url);
        xhr.open("POST", process.env.REACT_APP_POST_AUDIO_FILE, true);
        const storedToken = localStorage.getItem('authToken')
        xhr.setRequestHeader('Authorization', 'Bearer ' + storedToken);

        // xhr.withCredentials = true; 
        // xhr.responseType = 'arraybuffer';
        // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(fd);
        setTitle('');
        // WHAT TO  DO FOR BLOB
                        setSelectedTags([]);
                        props.getAllAudios();
    }

    let stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                upload(blob);
                setIsRecording(false);
                setIsBlocked(false);

                console.log('blobURL' + blobURL);
            }).catch((e) => console.error(e));
    }

    let streamWithAuth = () => {
        
        console.log(" Attempt to stream from");
        console.log(blobURL);

// create context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create source
let source = audioCtx.createBufferSource();

// route source
source.connect(audioCtx.destination);

// prepare request
let request = new XMLHttpRequest();
request.open('GET', blobURL, true /* async */ );
request.responseType = 'arraybuffer';

request.onload = function () {
    // on load callback

    // get audio data
    let audioData = request.response;

    // try to decode audio data
    audioCtx.decodeAudioData(audioData,
        function (buffer) {
            // on success callback
            console.log("Successfully decoded");

            // set source
            source.buffer = buffer;

            // .. do whatever you want with the source
            // e.g. play it
            source.start(0);
            // or stop
            // source.stop();
        },
        function (e) {
            // on error callback
            console.log("An error occurred");
            console.log(e);
        });
};
const authenticationToken = localStorage.getItem('authToken')
request.setRequestHeader("Authorization", `Bearer ${authenticationToken}`);
request.send();
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
        console.log(selectedTags)
    }

    const tags = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow", "grocery"]


    return (
        <div className="Audios">
            <h1>Save an audio</h1>
            <form onSubmit={handleSubmit}>
                <h2>Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h2>Record an audio</h2>
                <button onClick={start} disabled={isRecording}>Record</button>
                <button onClick={stop} disabled={!isRecording}>Post</button> 
                <button onClick={streamWithAuth} disabled={blobURL===""}>Play</button> 
                {/* <audio src={streamWithAuth(blobURL)} controls="controls" /> */}

                <h2>Tags</h2>

                <select name="tags" multiple value={selectedTags}
                    onChange={event => updateSelectedTags(event)}>
                    {tags?.map((tag) => <option key={tag} value={tag}>{tag}</option>)}

                </select>
                <button type="submit">Save this audio ➕</button>
            </form>

        </div>
    )
}

