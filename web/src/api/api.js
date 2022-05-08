import * as axios from "axios";
import base_url from "./base_url";

const instance = axios.create()

export const frontAPI = {
    check() {
        return instance.get('/')
    },
    addTracker(url) {
        return instance.post(base_url + '/add_tracker', { url: url })
    },
    listTrackers() {
        return instance.get(base_url + `/list_trackers`)
    },
    removeTracker(id) {
        console.log(id)
        return instance.post(base_url + `/remove_tracker`, { id: id })
    },
    pauseTracker(id) {
        return instance.post(base_url + `/pause_tracker`, { id: id })
    },
    unpauseTracker(id) {
        return instance.post(base_url + `/unpause_tracker`, { id: id })
    }
}

