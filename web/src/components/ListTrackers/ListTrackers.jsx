import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {listTrackersTC} from "../../redux/app-reducer";

const ListTrackersForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>Get trackers list</button>
        </form>
    )
}

const ListTrackersReduxForm = reduxForm({form: 'listTrackers'})(ListTrackersForm)

const ListTrackers = (props) => {
    const onSubmit = () => {
        props.listTrackers()
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
    listTrackersTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(ListTrackers)