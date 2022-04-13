import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

const ListTrackersForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>Get trackers list</button>
        </form>
    )
}

const ListTrackersReduxForm = reduxForm({form: 'listTrackers'})(ListTrackersForm)

const ListTrackers = (props) => {
    const onSubmit = (formData) => {
        alert('Showing avialable trackers')
    }
    return (
        <div>
            <h1>Get trackers list</h1>
            <ListTrackersReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToStateObj = {
}


export default connect(mapStateToProps, mapDispatchToStateObj)(ListTrackers)