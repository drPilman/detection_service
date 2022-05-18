import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import s from './Video.module.scss'

const Video = (props) => {
    const params = useParams()

    useEffect(async () => {
        let ws = await new WebSocket(`ws://drpilman.ga:8000/ws/stream/${params.streamId}`)

        ws.onmessage = (e) => {
            setImgSrc(URL.createObjectURL(e.data))
        }

    }, [])

    let [imgSrc, setImgSrc] = useState('')

    return (
        <div className={s.videoContainer}>
            <img src={imgSrc} id={'frame'} onLoad={(e) => { URL.revokeObjectURL(this.src) }} />
        </div>
    )
}

export default Video


