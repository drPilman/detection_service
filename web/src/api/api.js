import * as axios from "axios";
import base_url from "./base_url";

const instance = axios.create()

export const frontAPI = {
    check() {
        return instance.get('http://' + base_url + '/')
    },
    addTracker(rtsp_url) {
        return instance.post('http://' + base_url + '/add_tracker', { rtsp_url })
    },
    addTrackerFile(video) {
        let formData = new FormData()
        formData.append('video', video)

        return instance.post('http://' + base_url + '/add_file_tracker', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    listTrackers() {
        return instance.get('http://' + base_url + `/list_trackers`)
    },
    removeTracker(tracker_id) {
        return instance.post('http://' + base_url + `/remove_tracker`, { tracker_id })
    },
    pauseTracker(tracker_id) {
        return instance.post('http://' + base_url + `/pause_tracker`, { tracker_id })
    },
    unpauseTracker(tracker_id) {
        return instance.post('http://' + base_url + `/unpause_tracker`, { tracker_id })
    },
    listDownloads() {
        return instance.get('http://' + base_url + `/list_downloads`)
    },
}

