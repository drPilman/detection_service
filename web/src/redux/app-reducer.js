import {frontAPI} from "../api/api";

const UPDATE_TRACKERS = 'UPDATE_TRACKERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    trackers: [
        {full_id: 1, status: 'test'}
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

        default:
            return state
    }
}

const updateTrackersAC = (trackers) => ({type: UPDATE_TRACKERS, trackers})
const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

const updateTracker =  (dispatch, errorText, status) => async () => {
    if (status === 200) {
        dispatch(updateTrackersTC())
    } else {
        alert(errorText)
    }
}

export const addTrackerTC = (url) => async (dispatch) => {
    let response = await frontAPI.addTracker(url)

    let errorText = 'some problem with adding tracker'
    await updateTracker(dispatch, errorText, response.status)()
}

export const removeTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.removeTracker(tracker)

    let errorText = 'some error with deleting'
    await updateTracker(dispatch, errorText, response.status)()

    dispatch(toggleIsFetchingAC(false))
}

export const pauseTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.pauseTracker(tracker)

    let errorText = 'some error with pausing'
    await updateTracker(dispatch, errorText, response.status)()

    dispatch(toggleIsFetchingAC(false))
}

export const unpauseTrackerTC = (tracker) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    let response = await frontAPI.unpauseTracker(tracker)

    let errorText = 'some error with unpausing'
    await updateTracker(dispatch, errorText, response.status)()

    dispatch(toggleIsFetchingAC(false))
}

export const updateTrackersTC = () => async (dispatch) => {
    let response = await frontAPI.listTrackers()

    if (response.status === 200) {
        dispatch(updateTrackersAC(response.data))
    } else {
        alert('problem with connecting to api')
    }
}

export const initializeAppTC = () => async (dispatch) => {
    dispatch(updateTrackersTC())
}

export default appReducer