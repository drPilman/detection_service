import React from "react";
import {connect} from "react-redux";
import {unpauseTrackerTC} from "../../redux/app-reducer";
import s from '../../common/button.module.scss'

const UnpauseTracker = (props) => {
    return <button disabled={props.isFetching}
                   className={s.btn}
                   onClick={() => props.unpauseTrackerTC(+props.tracker_id)}>Unpause Tracker</button>

}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    unpauseTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(UnpauseTracker)