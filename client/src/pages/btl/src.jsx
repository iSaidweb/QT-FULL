import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../component/Navbar'
import { link } from '../../cfg';
function SRC(props) {
    const [state,setState]=useState({})

    useEffect(()=>{
        axios(link+'/api/base?_id='+props.match.params.id).then(e=>{
            setState(e.data.data);
            console.log(e.data.data);
        })
    },[])
    return ( 
        <div className="src">
         <Navbar/>
            <div className="bottom">
                <h1>Salom</h1>
                <img src={state.download_url} alt="ss" />
            </div>
        </div>
     );
}
export default SRC;