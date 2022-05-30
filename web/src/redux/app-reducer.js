import {frontAPI} from "../api/api"
import _ from 'lodash'

const UPDATE_TRACKERS = 'UPDATE_TRACKERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const GET_LIST_DOWNLOADS = 'GET_LIST_DOWNLOADS'
const UPDATE_INFO_TRACKERS = 'UPDATE_INFO_TRACKERS'
const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO'

let initialState = {
    trackers: [
        {tracker_id: 1, status: 'test'}
    ],
    infoTrackers: [],
    listDownloads: [],
    selectedVideo: null,
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
        case GET_LIST_DOWNLOADS:
            return {
                ...state,
                listDownloads: [...action.listDownloads]
            }
        case UPDATE_INFO_TRACKERS:
            let newInfoTrackers = _.cloneDeep(state.infoTrackers)
            for (let i in action.infoTrackers) {
                newInfoTrackers.push(action.infoTrackers[i])
            }
            newInfoTrackers.sort((a, b) => (b.frame - a.frame))

            return {
                ...state,
                infoTrackers: newInfoTrackers
            }
        case SET_SELECTED_VIDEO:
            return {
                ...state,
                selectedVideo: action.video
            }
        default:
            return state
    }
}

const updateTrackersAC = (trackers) => ({type: UPDATE_TRACKERS, trackers})
const getListDownloadsAC = (listDownloads) => ({type: GET_LIST_DOWNLOADS, listDownloads})
const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const updateInfoTrackersAC = (infoTrackers) => ({type: UPDATE_INFO_TRACKERS, infoTrackers})
export const setSelectedVideoAC = (video) => ({type: SET_SELECTED_VIDEO, video})

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

export const addTrackerFileTC = (file) => async (dispatch) => {
    let response = await frontAPI.addTrackerFile(file)

    let errorText = 'some problem with adding tracker file'
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

export const getListDownloadsTC = () => async (dispatch) => {
    let response = await frontAPI.listDownloads()

    if (response.status === 200) {
        dispatch(getListDownloadsAC(response.data))
    } else {
        alert('problem with connecting to api')
    }
}

export const initializeAppTC = () => async (dispatch) => {
    dispatch(updateTrackersTC())
}

export default appReducer