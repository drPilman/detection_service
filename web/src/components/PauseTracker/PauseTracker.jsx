import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const PauseTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'input'}
                   name={'pauseTrackerId'}
                   placeholder={'enter id'}/>
            <button disabled>Pause Tracker</button>

        </form>
    )
}

const PauseTrackerReduxForm = reduxForm({form: 'pauseTracker'})(PauseTrackerForm)

const PauseTracker = (props) => {
    const onSubmit = (formData) => {
        alert(formData.pauseTrackerId)
    }
    return (
        <div>
            <h1>Pause tracker</h1>
            <PauseTrackerReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
}


export default connect(mapStateToProps, mapDispatchToStateObj)(PauseTracker)