import React, {useEffect} from 'react'
import {connect} from "react-redux";
import './../../App.css';
import AddTracker from "./../AddTracker/AddTracker";
import RemoveTracker from "./../RemoveTracker/RemoveTracker";
import PauseTracker from "./../PauseTracker/PauseTracker";
import UnpauseTracker from "./../UnpauseTracker/UnpauseTracker";
import {initializeAppTC} from "./../../redux/app-reducer";
import {useNavigate} from 'react-router-dom'
import s from './Main.module.scss'
import s1 from './../../common/button.module.scss'
import AddTrackerFile from "../AddFileTracker/AddTrackerFile";


const Main = (props) => {
    //make upload list
    useEffect(()=> {
        props.initializeAppTC()
    }, [])
    const navigate = useNavigate()

    let trackersC = props.trackers.map(
        tracker => (<tr key={tracker.tracker_id}>
            <td>{tracker.tracker_id}</td>
            <td>{tracker.status}</td>
            <td><button onClick={() => {navigate('/'+tracker.tracker_id)}}
                        className={s1.btn}>Go to stream</button></td>
            <td><button onClick={() => {navigate('/info/'+tracker.tracker_id)}}
                        className={s1.btn}>See info</button></td>
            <td>{tracker.status === 'paused'
                ? <UnpauseTracker tracker_id={tracker.tracker_id}/>
                : <PauseTracker tracker_id={tracker.tracker_id}/>}
            </td>
            <td><RemoveTracker tracker_id={tracker.tracker_id} /></td>
        </tr>)
    )

    trackersC.push(<tr key='test'>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button onClick={() => {navigate('/list_downloads')}}
                    className={s1.btn}>Download list</button>
        </td>
        <td>Update</td>
    </tr>)
    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>status</td>
                        <td>Video</td>
                        <td>Info</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {trackersC}
                </tbody>
            </table>
            <AddTracker/>
            <AddTrackerFile/>
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
