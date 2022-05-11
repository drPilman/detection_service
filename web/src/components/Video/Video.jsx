import React, {useState} from 'react'
import {useParams} from "react-router-dom";

const Video = (props) => {
    const params = useParams()
    let [imgSrc, setImgSrc] = useState('')
    let ws = new WebSocket(`ws://127.0.0.1:8000/ws/${params.streamId}`)

    const onImgLoad = (e) => {
        URL.revokeObjectURL(this.src)
    }
    ws.onmessage = (e) => {
        setImgSrc(URL.createObjectURL(e.data))
    }

    return (
        <div>
            <img src={imgSrc} id={'frame'} onLoad={onImgLoad}/>
        </div>
    )
}

export default Video


