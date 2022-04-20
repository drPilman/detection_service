import * as axios from "axios";

const instance = axios.create({
    withCredentials: true
})
const base_url = 'https://cors-anywhere.herokuapp.com/http://127.0.0.1:8000'
export const frontAPI = {
    check() {
        return instance.get('/')
    },
    addTracker(url) {
        return instance.post(base_url + '/add_tracker/', {url})
    },
    listTrackers() {
        return instance.post(base_url + `/list_trackers/`)
    },
    removeTracker(full_id) {
        return instance.post(base_url + `/remove_tracker/`, {full_id})
    },
    pauseTracker(full_id) {
        return instance.post(base_url + `/pause_tracker/`, {full_id})
    },
    unpauseTracker(full_id) {
        return instance.post(base_url + `/unpauseTracker/`, {full_id})
    }
}

