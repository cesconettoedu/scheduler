import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";


export default function InterviewerList(props) {
 
  const { interviewers, onChange, value } = props
 

  const AvailableInterviewer = interviewers.map(interviewer => {

    return ( 
      
        <InterviewerListItem 

          key={interviewer.id}
          name={interviewer.name}
          selected={interviewer.id === value}
          avatar={interviewer.avatar}
          setInterviewer={(event) => onChange(interviewer.id)}
          
        />
    
    );

  })

 return <section className="interviewers"> 
        <h4 className="interviewers__header">Interviewer</h4>
        <ul className="interviewers__list" > {AvailableInterviewer} </ul>
        
        </section>;
}