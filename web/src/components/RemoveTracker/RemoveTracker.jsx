import React from "react";
import {connect} from "react-redux";
import {removeTrackerTC} from "../../redux/app-reducer";
import s from "../../common/button.module.scss";

const RemoveTracker = (props) => {
    return <button disabled={props.isFetching}
                   className={s.btn}
                   onClick={() => props.removeTrackerTC(+props.tracker_id)}>Remove Tracker</button>

}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    removeTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(RemoveTracker)