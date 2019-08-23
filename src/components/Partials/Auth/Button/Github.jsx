import React from "react";

import githubIcon from '../../../../media/images/icons/brands/github.svg';


export default function Github(props) {
  return (
    <a href={props.link} class="btn btn-block btn-neutral btn-icon mb-3 mb-sm-0">
      <span class="btn-inner--icon">
        <img src={githubIcon} alt=" placeholder" />
      </span>
      <span class="btn-inner--text">Github</span>
    </a>
  );
}
