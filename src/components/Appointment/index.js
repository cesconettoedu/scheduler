import React from "react";
import "./styles.scss";
import { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment (props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //Functions to save inteviews ///////////////////////// 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer      
    };
    transition(SAVING)
    bookInterview(id, interview)
      .then (() => transition(SHOW))
  }

 // Function to deleting cancel a interview //////////////////////////////////////
  function del() {
    transition(DELETING)
    cancelInterview(id)
      .then (() => transition(EMPTY))

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
                onDelete={del}
            />)}
            
            {mode === CREATE && 
            <Form 
                interviewers={interviewers}
                onCancel={back}
                onSave={save}
            />}

            {mode === SAVING && <Status message="Saving"/>}

            {mode === DELETING && <Status message="Deleting" />}

          </Fragment>

      </article>
  );
}


