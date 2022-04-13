import * as axios from "axiAddTrackeros";

const instance = axios.create({
    withCredentials: true,
})

export const frontAPI = {
    addTracker(url) {
        return instance.post(`/add_tracker/`, {url})
    },
    listTrackers() {
        return instance.get(`/list_trackers/`)
    },
    removeTracker(tracker) {
        return instance.post(`/remove_tracker/`, {tracker})
    },
    pauseTracker(tracker) {
        return instance.post(`/pause_tracker/`, {tracker})
    },
    unpauseTracker(tracker) {
        return instance.post(`/unpauseTracker/`, {tracker})
    }
}

