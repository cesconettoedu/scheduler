import React from "react";
import "./styles.scss";
import { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment (props) {
  const { id, time, interview, interviewers, bookInterview } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer      
    };
    bookInterview(id, interview)
    transition(SHOW)
  }

 

  return (
      <article className="appointment">
          <Header time={time} />

          <Fragment>
            {mode === EMPTY && 
            <Empty onAdd={() => transition(CREATE)} />}
            
            {mode === SHOW && interview &&(
            <Show
                student={interview.student}
                interviewer={interview.interviewer}
            />
            )}
            
            {mode === CREATE && 
            <Form 
                interviewers={interviewers}
                onCancel={back}
                onSave={save}
            />}
          </Fragment>

      </article>
  );
}


