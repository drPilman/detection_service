import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addTrackerFileTC, setSelectedVideoAC} from "../../redux/app-reducer";
import s from './AddTrackerFile.module.scss'
import FileInput from "./FileInput";

// const AddTrackerFileForm = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <Field component={FileInput}
//                    type='file'
//                    name='addTrackerFile'
//                    />
//             <button>Add Tracker File</button>
//
//         </form>
//     )
// }
//
// const AddTrackerFileReduxForm = reduxForm({form: 'addTrackerFile'})(AddTrackerFileForm)

const AddTrackerFile = (props) => {
    const onSubmit = () => {
        props.addTrackerFileTC(props.selectedVideo)
    }
    const onFileChange = (e) => {
        props.setSelectedVideoAC(e.target.files[0])
    }

    return (
        <div className={s.addTracker}>
            <h1>Add file to track</h1>
            <div className={s.form}>
                <input
                    type="file"
                    required
                    accept='.mp4'
                    onChange={onFileChange}
                />
                <button onClick={onSubmit}>Upload video</button>
            </div>

            {/*<AddTrackerFileReduxForm onSubmit={onSubmit}/>*/}
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedVideo: state.app.selectedVideo
})

const mapDispatchToStateObj = {
    addTrackerFileTC,
    setSelectedVideoAC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(AddTrackerFile)