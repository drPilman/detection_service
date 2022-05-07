import * as axios from "axios";

const instance = axios.create()
const base_url = 'http://drpilman.ga:8000'

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
    removeTracker(full_id) {
        console.log(full_id)
        return instance.post(base_url + `/remove_tracker`, { full_id: full_id })
    },
    pauseTracker(full_id) {
        return instance.post(base_url + `/pause_tracker`, { full_id: full_id })
    },
    unpauseTracker(full_id) {
        return instance.post(base_url + `/unpause_tracker`, { full_id: full_id })
    }
}

