import React from 'react'
import {connect} from "react-redux";
import './App.css';
import AddTracker from "./components/AddTracker/AddTracker";
import ListTrackers from "./components/ListTrackers/ListTrackers";
import RemoveTracker from "./components/RemoveTracker/RemoveTracker";
import PauseTracker from "./components/PauseTracker/PauseTracker";
import UnpauseTracker from "./components/UnpauseTracker/UnpauseTracker";
import {initializeAppTC} from "./redux/app-reducer";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        let trackersC = this.props.trackers.map(
            tracker => (<tr>
                            <td>{tracker.full_id}</td>
                            <td>{tracker.status}</td>
                            <td>{tracker.isPaused
                                    ? <UnpauseTracker full_id={tracker.full_id}/>
                                    : <PauseTracker full_id={tracker.full_id}/>}
                            </td>
                            <td><RemoveTracker full_id={tracker.full_id} /></td>
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

}

const mapStateToProps = (state) => ({
    trackers: state.app.trackers
})

const mapDispatchToPropsObj = {
    initializeAppTC
}

export default connect(mapStateToProps, mapDispatchToPropsObj)(App)
