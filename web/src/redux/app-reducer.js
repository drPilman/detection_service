import {frontAPI} from "../api/api";

const ADD_TRACKER = 'ADD_TRACKER'
const DELETE_TRACKER = 'DELETE_TRACKER'
const PAUSE_TRACKER = 'PAUSE_TRACKER'
const UNPAUSE_TRACKER = 'UNPAUSE_TRACKER'
const UPDATE_TRACKERS = 'UPDATE_TRACKERS'

let initialState = {
    trackers: [
        {id: 1, status: 'ok'}
    ]
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRACKERS:
            return {
                ...state,
                trackers: [...action.data]
            }
        case ADD_TRACKER:
            return {
                ...state,
                trackers: [...state.trackers, action.tracker]
            }
        case DELETE_TRACKER:
            return state
        case PAUSE_TRACKER:
            return state
        case UNPAUSE_TRACKER:
            return state
        default:
            return state
    }
}

const addTrackerAC = (tracker) => ({type: ADD_TRACKER, tracker})
const deleteTrackerAC = () => ({type: DELETE_TRACKER})
const pauseTrackerAC = () => ({type: PAUSE_TRACKER})
const unpauseTrackerAC = () => ({type: UNPAUSE_TRACKER})
const updateTrackersAC = (trackers) => ({type: UPDATE_TRACKERS, trackers})

export const addTrackerTC = (url) => async (dispatch) => {
    // let response = await frontAPI.addTracker(url)
    // console.log(response)
    // making request for adding tracker

    dispatch(addTrackerAC({id: 2, status: 'not ok'}))
}

export const deleteTrackerTC = (tracker) => async (dispatch) => {
    // let response = await frontAPI.deleteTracker(tracker)
    // console.log(response)
    dispatch(deleteTrackerAC())
}

export const pauseTrackerTC = (tracker) => async (dispatch) => {
    // let response = await frontAPI.pauseTracker(tracker)
    // console.log(response)
    dispatch(pauseTrackerAC())

}

export const unpauseTrackerTC = (tracker) => async (dispatch) => {
    // let response = await frontAPI.unpauseTracker(tracker)
    // console.log(response)
    dispatch(unpauseTrackerAC())
}

export const updateTrackersTC = (url) => async (dispatch) => {
    // let response = await frontAPI.listTrackers()
    // console.log(response)


    // some request
    const trackers = [
        {}
    ]
    dispatch(updateTrackersAC())
}

export default appReducer