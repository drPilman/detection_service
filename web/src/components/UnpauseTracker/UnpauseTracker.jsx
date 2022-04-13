import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const UnpauseTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'input'}
                   name={'unpauseTrackerId'}
                   placeholder={'enter id'}/>
            <button>Unpause Tracker</button>

        </form>
    )
}

const UnpauseTrackerReduxForm = reduxForm({form: 'unpauseTracker'})(UnpauseTrackerForm)

const UnpauseTracker = (props) => {
    const onSubmit = (formData) => {
        alert(formData.unpauseTrackerId)
    }
    return (
        <div>
            <h1>Unpause tracker</h1>
            <UnpauseTrackerReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
}


export default connect(mapStateToProps, mapDispatchToStateObj)(UnpauseTracker)