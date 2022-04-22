import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {removeTrackerTC} from "../../redux/app-reducer";

const RemoveTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button disabled={props.isFetching}>Remove Tracker</button>
        </form>
    )
}

const RemoveTrackerReduxForm = reduxForm({form: 'removeTracker'})(RemoveTrackerForm)

const RemoveTracker = (props) => {
    const onSubmit = () => {
        props.removeTrackerTC(Number(props.full_id))
    }
    return <RemoveTrackerReduxForm onSubmit={onSubmit} isFetching={props.isFetching}/>
}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    removeTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(RemoveTracker)