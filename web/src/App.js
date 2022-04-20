import React from 'react'
import {connect} from "react-redux";
import './App.css';
import AddTracker from "./components/AddTracker/AddTracker";
import ListTrackers from "./components/ListTrackers/ListTrackers";
import RemoveTracker from "./components/RemoveTracker/RemoveTracker";
import PauseTracker from "./components/PauseTracker/PauseTracker";
import UnpauseTracker from "./components/UnpauseTracker/UnpauseTracker";


const App = (props) => {
    let trackersC = props.trackers.map(
        tracker => <tr><td>{tracker.id}</td><td>{tracker.status}</td></tr>
    )

    return (
        <main>
            <table>
                <tr>
                    <td>id</td>
                    <td>status</td>
                </tr>
                {trackersC}
            </table>
            {/*<ListTrackers/>*/}
            <AddTracker/>
            <RemoveTracker/>
            <PauseTracker/>
            <UnpauseTracker/>
        </main>
    )
}

const mapStateToProps = (state) => ({
    trackers: state.app.trackers
})

const mapDispatchToPropsObj = {
}

export default connect(mapStateToProps, mapDispatchToPropsObj)(App)
