import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Main from "./components/Main/Main";
import Video from "./components/Video/Video"
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";
import ListDownloads from "./components/ListDownloads/ListDownloads";


const App = (props) => {
    //rtsp://localhost:8554/stream
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={':streamId'} element={<Video /> } />
                <Route path={'info/:streamId'} element={<Info /> } />
                <Route path={'list_downloads'} element={<ListDownloads /> } />
                <Route path={'*'} element={<Main/>}/>
            </Routes>
        </div>
    )
}

export default App
