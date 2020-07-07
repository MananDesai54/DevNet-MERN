import React from 'react';
import loader from '../../assets/gifs/Loading.gif';

const Loading = ()=>{
    return (
        <React.Fragment>
            <img src={loader} alt="Loading" style={{width:'100px',margin:'20% auto',display:'block'}} />
        </React.Fragment>
    )
}

export default Loading;