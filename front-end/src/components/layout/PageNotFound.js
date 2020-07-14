import React, { Fragment } from 'react';
import PageNotFoundError from '../../assets/svg/PageNotFoundError.svg'

const PageNotFound = () => {

    // document.title = '404 - Page Not Found'

    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i>{' '}Page Not Found
            </h1>
            <p className="x-large" style={{color:'white'}}>Sorry , this page does not exists</p>
            <img src={PageNotFoundError} alt="" style={{
                marginTop:20,
                height:'100%',
                width:'90%'
            }}/>
        </Fragment>
    )
}

export default PageNotFound;
