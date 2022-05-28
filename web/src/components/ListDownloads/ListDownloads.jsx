import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getListDownloadsTC} from "./../../redux/app-reducer";
import s from './ListDownloads.module.scss'
import s1 from './../../common/button.module.scss'


const ListDownloads = (props) => {
    //make upload list
    useEffect(()=> {
        props.getListDownloadsTC()
    }, [])

    let downloadsC = props.listDownloads.map(
        item => (<tr key={item}>
            <td>{item}</td>
            <td><button onClick={() => {window.open('/download/'+item, '_blank')}}
                        className={s1.btn}>Download</button></td>
        </tr>)
    )

    downloadsC.push(<tr key='test'>
        <td></td>
        <td><button onClick={() => {props.getListDownloadsTC()}}
                    className={s1.btn}>Update</button>
        </td>
    </tr>)

    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {downloadsC}
                </tbody>
            </table>
        </main>
    )


}

const mapStateToProps = (state) => ({
    listDownloads: state.app.listDownloads
})

const mapDispatchToPropsObj = {
    getListDownloadsTC
}

export default connect(mapStateToProps, mapDispatchToPropsObj)(ListDownloads)
