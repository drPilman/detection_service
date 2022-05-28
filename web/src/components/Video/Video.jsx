import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import s from './Video.module.scss'
import base_url from "../../api/base_url";

const Video = (props) => {
    const params = useParams()

    useEffect(async () => {
        let ws = await new WebSocket('ws://'+base_url+`/ws/info/${params.streamId}`)

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


