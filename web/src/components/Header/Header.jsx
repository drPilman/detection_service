import React, {useEffect, useState} from "react"
import s from './Header.module.scss'
import backArrowImg from './../../common/backarrow.svg'
import {useLocation, useNavigate} from "react-router-dom";

const Header = (props) => {
    const location = useLocation()

    const goBack = () => {
        const url = window.location.href.slice(0, -(location.pathname.length - 1))
        window.location.replace(url)
    }

    return (
        <header>
            {location.pathname !== '/' ?
            <div className={s.prev} onClick={goBack}>
                <div className={s.backContainer}>
                    <div className={s.backArrow}>
                        <img src={backArrowImg} alt=""/>
                    </div>
                    <p>
                        Back
                    </p>
                </div>
            </div>
            : null}
            <div className={s.logo}>
                <p>
                    Detection service
                </p>
            </div>
        </header>
    )
}

export default Header