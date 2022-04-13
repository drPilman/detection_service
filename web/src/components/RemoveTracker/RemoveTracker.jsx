import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const RemoveTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'input'}
                   name={'removeTrackerId'}
                   placeholder={'enter id'}/>
            <button>Remove Tracker</button>

        </form>
    )
}

const RemoveTrackerReduxForm = reduxForm({form: 'removeTracker'})(RemoveTrackerForm)

const RemoveTracker = (props) => {
    const onSubmit = (formData) => {
        alert(formData.removeTrackerId)
    }
    return (
        <div>
            <h1>Add tracker</h1>
            <RemoveTrackerReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
}


export default connect(mapStateToProps, mapDispatchToStateObj)(RemoveTracker)