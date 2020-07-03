import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = ({ profile:{experience:{}} }) => {
    return (
        <div>
            <h3 class="text-dark">Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p><strong>Position: </strong>Senior Developer</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileExperience;
