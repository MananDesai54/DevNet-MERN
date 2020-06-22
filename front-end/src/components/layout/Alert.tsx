import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

interface Props {
    alerts:any
}

const Alert:React.FC<Props> = ({ alerts }:any) => 
    alerts!==null && 
    alerts.length > 0 && 
    alerts.map((alert: { alertType: string; id: string; msg: string; })=> (
        <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.msg}
        </div>
    ))

Alert.propTypes = {
    alerts:PropTypes.array
}

const mapStateToProps = (state: { alert: any; })=>({
    alerts:state.alert
});

export default connect(mapStateToProps)(Alert);