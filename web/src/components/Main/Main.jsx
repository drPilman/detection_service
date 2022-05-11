import React, {useEffect} from 'react'
import {connect} from "react-redux";
import './../../App.css';
import AddTracker from "./../AddTracker/AddTracker";
import ListTrackers from "./../ListTrackers/ListTrackers";
import RemoveTracker from "./../RemoveTracker/RemoveTracker";
import PauseTracker from "./../PauseTracker/PauseTracker";
import UnpauseTracker from "./../UnpauseTracker/UnpauseTracker";
import {initializeAppTC} from "./../../redux/app-reducer";
import {useNavigate} from 'react-router-dom'


const Main = (props) => {
    useEffect(()=> {
        props.initializeAppTC()
    }, [])
    const navigate = useNavigate()

    let trackersC = props.trackers.map(
        tracker => (<tr>
            <td>{tracker.full_id}</td>
            <td>{tracker.status}</td>
            <td>{tracker.isPaused
                ? <UnpauseTracker full_id={tracker.full_id}/>
                : <PauseTracker full_id={tracker.full_id}/>}
            </td>
            <td><RemoveTracker full_id={tracker.full_id} /></td>
            <td><button onClick={() => {navigate('/'+tracker.full_id)}}>Go to stream</button></td>
        </tr>)

    )
    return (
        <main>
            <table>
                <thead>
                <tr>
                    <td>id</td>
                    <td>status</td>
                    <td></td>
                    <td></td>
                    <td>Video</td>
                    <td>Info</td>
                </tr>
                </thead>
                <tbody>
                {trackersC}
                </tbody>
            </table>
            <AddTracker/>
        </main>
    )


}

const mapStateToProps = (state) => ({
    trackers: state.app.trackers
})

const mapDispatchToPropsObj = {
    initializeAppTC
}

export default connect(mapStateToProps, mapDispatchToPropsObj)(Main)
