import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteExperience } from '../../actions/profiles';
import { CSSTransition } from 'react-transition-group';

const Experience = ({ experience,deleteExperience }) => {

    const [activeMenu,setActiveMenu] = useState('detail-exp');
    const [selectedExp,setSelectedExp] = useState('');
    const [height,setHeight] = useState(null);

    const calcHeight = e =>{
        setHeight(e.offsetHeight+80);
    }

    const experiences = experience.map(exp=>(
        <div key={exp._id} className="detail-exp" onClick={()=>{
            setActiveMenu('detail-data');
            setSelectedExp(exp._id);
        }}>
            <div className="data">
                <div className="detail-company">{exp.company}</div>
                <div className="detail-title">{exp.title}</div>
            </div>
            <span>
                <i className="material-icons">arrow_forward_ios</i>
            </span>
        </div>    
    ))

    return (
        <div className="details__position">
            <h2 className="my-1 center">Experience</h2>
            <div className="detail" style={{height:height}}>
                <div className="detail-data">
                    <CSSTransition
                        in={activeMenu === 'detail-exp'}
                        unmountOnExit 
                        timeout={400} 
                        classNames='detail-primary'
                        onEnter={calcHeight}
                    >
                        <div className="menu">
                            {experiences}
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={activeMenu === 'detail-data'}
                        unmountOnExit 
                        timeout={400} 
                        classNames='detail-secondary'
                        onEnter={calcHeight}
                    >
                        <div className="menu">
                            <span onClick={()=>{
                                    setActiveMenu('detail-exp');
                                }}>
                                <i className="material-icons icon-button">west</i>
                            </span>
                            {experience.map(exp=>{
                                if(exp._id===selectedExp){ 
                                    return (
                                        <div className="detail-data" key={exp._id}>
                                            <div className="detail-company">{exp.company}</div>
                                            <div className="detail-title">{exp.title}</div>
                                            <div>
                                                <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
                                                {exp.current ? (
                                                ' Now'
                                                ) : (
                                                <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => deleteExperience(exp._id)}
                                                    className="btn btn-danger"
                                                >
                                                Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </div> 
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        experience:state.profile.profile.experience
    }
}

export default connect(mapStateToProps,{
    deleteExperience
})(Experience);
