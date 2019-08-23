import React from 'react'

import googleIcon from '../../../../media/images/icons/brands/google.svg';

export default function Google(props) {
    return (
        <a href={props.link} class="btn btn-block btn-neutral btn-icon">
                    <span class="btn-inner--icon">
                      <img
                        src={googleIcon}
                        alt="placeholder"
                      />
                    </span>
                    <span class="btn-inner--text">Google</span>
                  </a>
    )
}
