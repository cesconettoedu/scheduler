import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

import PropTypes from 'prop-types';


export default function InterviewerList(props) {
 
  const { interviewers, onChange, value } = props
 

  const AvailableInterviewer = interviewers.map(interviewer => {

    return ( 
      
        <InterviewerListItem 

          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === value}
          setInterviewer={() => onChange(interviewer.id)}
          
        />
    
    );

  })

 return <section className="interviewers"> 
        <h4 className="interviewers__header">Interviewer</h4>
        <ul className="interviewers__list" > {AvailableInterviewer} </ul>
        
        </section>;
        
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};