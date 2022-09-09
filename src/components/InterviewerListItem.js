import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {

  const { selected, setInterviewer, avatar, name } = props
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const interviewerImgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected
  });

  return (
    <li  className={interviewerClass} onClick={setInterviewer}>
    <img
      className={interviewerImgClass}
      src={avatar}
      alt={name}
    />
    {props.selected && props.name}
  </li>
   );
}