import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addTrackerTC} from "../../redux/app-reducer";
import s from './AddTracker.module.scss'
const AddTrackerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'input'}
                   name={'addTrackerUrl'}
                   placeholder={'enter url'}
                   required/>
            <button>Add Tracker</button>

        </form>
    )
}

const AddTrackerReduxForm = reduxForm({form: 'addTracker'})(AddTrackerForm)

const AddTracker = (props) => {
    const onSubmit = (formData) => {
        props.addTrackerTC(formData.addTrackerUrl)
    }
    return (
        <div className={s.addTracker}>
            <h1>Add tracker</h1>
            <AddTrackerReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
    addTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(AddTracker)