import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addTrackerFileTC} from "../../redux/app-reducer";
import s from './AddTrackerFile.module.scss'
import FileInput from "./FileInput";

const AddTrackerFileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={FileInput}
                   name={'addTrackerFile'}
                   type={'file'}
                   />
            <button>Add Tracker File</button>

        </form>
    )
}

const AddTrackerFileReduxForm = reduxForm({form: 'addTrackerFile'})(AddTrackerFileForm)

const AddTrackerFile = (props) => {
    const onSubmit = (formData) => {
        props.addTrackerFileTC(formData.addTrackerFile)
    }
    return (
        <div className={s.addTracker}>
            <h1>Add file to track</h1>
            <AddTrackerFileReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
    addTrackerFileTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(AddTrackerFile)