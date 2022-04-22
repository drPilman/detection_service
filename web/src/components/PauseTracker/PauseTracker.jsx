import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {pauseTrackerTC} from "../../redux/app-reducer";

const PauseTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button disabled={props.isFetching}>Pause Tracker</button>
        </form>
    )
}

const PauseTrackerReduxForm = reduxForm({form: 'pauseTracker'})(PauseTrackerForm)

const PauseTracker = (props) => {
    const onSubmit = () => {
        props.pauseTrackerTC(Number(props.full_id))
    }
    return <PauseTrackerReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    pauseTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(PauseTracker)