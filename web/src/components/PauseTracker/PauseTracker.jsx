import React from "react";
import {connect} from "react-redux";
import {pauseTrackerTC} from "../../redux/app-reducer";
import s from './../../common/button.module.scss'

const PauseTracker = (props) => {
    return <button disabled={props.isFetching}
                   className={s.btn}
                   onClick={() => props.pauseTrackerTC(+props.full_id)}>Pause Tracker</button>

}

const mapStateToProps = (state) => ({
    isFetching: state.app.isFetching
})

const mapDispatchToStateObj = {
    pauseTrackerTC
}


export default connect(mapStateToProps, mapDispatchToStateObj)(PauseTracker)