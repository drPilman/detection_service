import {frontAPI} from "../api/api";

const ADD_TRACKER = 'ADD_TRACKER'
const REMOVE_TRACKER = 'REMOVE_TRACKER'
const PAUSE_TRACKER = 'PAUSE_TRACKER'
const UNPAUSE_TRACKER = 'UNPAUSE_TRACKER'
const UPDATE_TRACKERS = 'UPDATE_TRACKERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    trackers: [
        {full_id: 1, status: 'ok', isPaused: false}
    ],
    isFetching: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case UPDATE_TRACKERS:
            return {
                ...state,
                trackers: [...action.trackers]
            }
        case ADD_TRACKER:
            return {
                ...state,
                trackers: [...state.trackers, action.tracker]
            }
        case REMOVE_TRACKER:
            let newRemovedTrackersList = [...state.trackers]
            newRemovedTrackersList.splice(newRemovedTrackersList.find(tracker => tracker.full_id === action.full_id), 1)

            return {...state, trackers: newRemovedTrackersList}

        case PAUSE_TRACKER:
            let newPausedTrackersList = [...state.trackers]
            newPausedTrackersList.find(tracker => tracker.full_id === action.full_id).isPaused = true

            return {...state, trackers: newPausedTrackersList}

        case UNPAUSE_TRACKER:
            let newUnausedTrackersList = [...state.trackers]
            newUnausedTrackersList.find(tracker => tracker.full_id === action.full_id).isPaused = false

            return {...state, trackers: newUnausedTrackersList}

        default:
            return state
    }
}

const addTrackerAC = (tracker) => ({type: ADD_TRACKER, tracker})
const removeTrackerAC = (full_id) => ({type: REMOVE_TRACKER, full_id})
const pauseTrackerAC = (full_id) => ({type: PAUSE_TRACKER, full_id})
const unpauseTrackerAC = (full_id) => ({type: UNPAUSE_TRACKER, full_id})
const updateTrackersAC = (trackers) => ({type: UPDATE_TRACKERS, trackers})
const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})


export const addTrackerTC = (url) => async (dispatch) => {
    let response = await frontAPI.addTracker(url)
    if (response.status === 200) {
        dispatch(addTrackerAC({full_id: response.data[0], status: response.data[1]}))
    } else {
        alert('some problem with adding tracker')
    }
}

export const removeTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.removeTracker(tracker)
    if (response.status === 200) {
        dispatch(removeTrackerAC(tracker))

    } else {
        alert('some error with deleting')
    }
    dispatch(toggleIsFetchingAC(false))
}

export const pauseTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.pauseTracker(tracker)
    if (response.status === 200) {
        dispatch(pauseTrackerAC(tracker))
    } else {
        alert('some error with pausing')
    }
    dispatch(toggleIsFetchingAC(false))
}

export const unpauseTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.unpauseTracker(tracker)
    if (response.status === 200) {
        dispatch(unpauseTrackerAC(tracker))
    } else {
        alert('some error with unpausing')
    }
    dispatch(toggleIsFetchingAC(false))

}

export const updateTrackersTC = () => async (dispatch) => {
    let response = await frontAPI.listTrackers()
    console.log(response)
    if (response.status === 200) {
        dispatch(updateTrackersAC(response.data.trackers))
    } else {
        alert('problem with connecting to api')
    }
}

export const initializeAppTC = () => async (dispatch) => {
    dispatch(updateTrackersTC())
}

export default appReducer