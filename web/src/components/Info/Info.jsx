import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import base_url from "../../api/base_url";
import {updateInfoTrackersAC} from "../../redux/app-reducer";
import {connect} from "react-redux";

const Info = (props) => {
    const params = useParams()

    useEffect(async () => {
        let ws = new WebSocket('ws://'+base_url+`/ws/info/${params.streamId}`)
        ws.onmessage = (event) => {
            const arr = JSON.parse(event.data).sort((a, b) => a.frame - b.frame)
            props.updateInfoTrackersAC(arr)
        }
    }, [])

    return (
        <div>
            <ul>
                {props.infoTrackers.map(item =>
                    <li>
                        {JSON.stringify(item)}
                    </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    infoTrackers: state.app.infoTrackers
})

const mapDispatchToPropsObj = {
    updateInfoTrackersAC
}
export default connect(mapStateToProps, mapDispatchToPropsObj)(Info)


