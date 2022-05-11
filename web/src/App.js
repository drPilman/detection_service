import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {Route, Routes} from 'react-router-dom'
import './App.css';
import AddTracker from "./components/AddTracker/AddTracker";
import ListTrackers from "./components/ListTrackers/ListTrackers";
import RemoveTracker from "./components/RemoveTracker/RemoveTracker";
import PauseTracker from "./components/PauseTracker/PauseTracker";
import UnpauseTracker from "./components/UnpauseTracker/UnpauseTracker";
import {initializeAppTC} from "./redux/app-reducer";
import Main from "./components/Main/Main";
import Video from "./components/Video/Video"


const App = (props) => {

    return (
        <div>
            <Routes>
                <Route path={'/:streamId'} element={<Video /> } />
                <Route path={'*'} element={<Main/>}/>
            </Routes>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToPropsObj = {

}

export default connect(mapStateToProps, mapDispatchToPropsObj)(App)
