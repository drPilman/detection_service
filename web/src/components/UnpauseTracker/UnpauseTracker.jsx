import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {unpauseTrackerTC} from "../../redux/app-reducer";

const UnpauseTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button disabled={props.isFetching}>Unpause Tracker</button>
        </form>
    )
}

const UnpauseTrackerReduxForm = reduxForm({form: 'unpauseTracker'})(UnpauseTrackerForm)

const UnpauseTracker = (props) => {
    const onSubmit = () => {
        props.unpauseTrackerTC(Number(props.full_id))
    }
    return <UnpauseTrackerReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    unpauseTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(UnpauseTracker)