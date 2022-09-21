import React from "react";
import "./styles.scss";
import { Fragment } from 'react'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm  from "./Confirm"
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment (props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //Functions to save inteviews ////////////////////////////////////////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer      
    };

    transition(SAVING)
    
      bookInterview(id, interview)
      .then (() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

 // Function to deleting cancel a interview //////////////////////////////////////
  function del() {
    
    transition(DELETING, true)
    
      cancelInterview(id)
      .then (() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }

//////////////////////////////////////////////////////////////////////////////////

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
                  onDelete={() => transition(CONFIRM)}  //clic Trash icon, goes to CONFIRM, then use onClick to del
                  onEdit={edit}
              />)}
            
            {mode === CREATE && 
              <Form 
                  interviewers={interviewers}
                  onCancel={back}
                  onSave={save}
              />}

            {mode === SAVING && <Status message="Saving"/>}
            {mode === DELETING && <Status message="Deleting" />}

            {mode === CONFIRM &&
              <Confirm
                onCancel={back}
                onConfirm={del}
                message="Are you sure you want to delete?"
              />}

            {mode === EDIT &&
              <Form
                student={interview.student}
                interviewer={interview.interviewer.id}
                interviewers={interviewers}
                onSave={save}
                onCancel={back}
              />}
            
            {mode === ERROR_SAVE &&
              <Error
                message="Could not create appointment"
                onClose={back}
              />
            }
            
            {mode === ERROR_DELETE &&
              <Error
                message="Could not delete appointment"
                onClose={back}
              />
            }

           
          </Fragment>

      </article>
  );
}


