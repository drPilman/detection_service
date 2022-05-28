import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import base_url from "../../api/base_url";
import _ from 'lodash'

const Info = (props) => {
    const params = useParams()
    let [infoObj, setInfoObj] = useState({})
    let [infoArr, setInfoArr] = useState([])

    useEffect(async () => {
        let ws = new WebSocket('ws://'+base_url+`/ws/info/${params.streamId}`)
        ws.onmessage = (event) => {
            const arr = JSON.parse(event.data).sort((a, b) => a.frame - b.frame)
            setInfoObj(arr[0])
            console.log(arr[0])
        }
    }, [])

    useEffect(() => {
        const newArr = _.cloneDeep(infoArr)
        newArr.push(infoObj)
        setInfoArr(newArr)
    }, [infoObj])

    return (
        <div>
            <ul>
                {infoArr.map(item =>
                    <li>
                        {JSON.stringify(item)}
                    </li>)}
            </ul>
        {/*    {JSON.stringify(infoObj) !== '' ?*/}
        {/*    <ul>*/}
        {/*        <li>*/}
        {/*            frame: {infoObj['frame']}*/}
        {/*        </li>*/}
        {/*        {infoObj['data'].map((item) => (<>*/}
        {/*            <li>{item[0]}*/}
        {/*                <ul>*/}
        {/*                    <li>type: {item[1]}</li>*/}
        {/*                    <li>{item[2]}*/}
        {/*                        <ul>*/}
        {/*                            {item[3].map(insideItem => (<li>{insideItem}</li>))}*/}
        {/*                        </ul>*/}
        {/*                    </li>*/}
        {/*                </ul>*/}
        {/*            </li>*/}
        {/*        </>))}*/}
        {/*    </ul>*/}
        {/*    : null*/}

        {/*}*/}

        </div>
    )
}


export default Info


