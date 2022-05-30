import React from "react";
import {connect} from "react-redux";
import {updateTrackersTC} from "../../redux/app-reducer";
import s from './../../common/button.module.scss'

const UpdateTrackers = (props) => {
    return <button disabled={props.isFetching}
                   className={s.btn}
                   onClick={() => props.updateTrackersTC(+props.tracker_id)}>Update</button>

}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    updateTrackersTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(UpdateTrackers)