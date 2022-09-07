import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  

  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const renderName = () => {
    if(props.selected){
      return props.name
    }
    return '';
  }

  return ( 
    <li className={interviewersClass} onClick={() => props.setInterviewer(props.id)}>
    <img className="interviewers__item-image" src={props.avatar} /> 
      {renderName()}
    </li>
  );
}
 
