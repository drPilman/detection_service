import React from 'react'
import {connect} from "react-redux"
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Main from "./components/Main/Main";
import Video from "./components/Video/Video"
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";


const App = (props) => {
    //rtsp://localhost:8554/stream
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={':streamId'} element={<Video /> } />
                <Route path={'info/:streamId'} element={<Info /> } />
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
