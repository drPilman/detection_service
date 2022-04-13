import React from 'react'
import {connect} from "react-redux";
import './App.css';
import AddTracker from "./components/AddTracker/AddTracker";
import ListTrackers from "./components/ListTrackers/ListTrackers";
import RemoveTracker from "./components/RemoveTracker/RemoveTracker";
import PauseTracker from "./components/PauseTracker/PauseTracker";
import UnpauseTracker from "./components/UnpauseTracker/UnpauseTracker";


const App = (props) => {
    return (
        <main>
            <ListTrackers/>
            <AddTracker/>
            <RemoveTracker/>
            <PauseTracker/>
            <UnpauseTracker/>
        </main>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToPropsObj = {}

export default connect(mapStateToProps, mapDispatchToPropsObj)(App)
