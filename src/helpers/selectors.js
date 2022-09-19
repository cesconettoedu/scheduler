

export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  const filteredNames = state.days.filter(state => state.name === day);
    if(filteredNames.length === 0){
      return appointmentArr
    }
  const appointmentID = filteredNames[0].appointments
  appointmentArr = appointmentID.map(id => state.appointments[id]);
return appointmentArr;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  };
}

export function getInterviewersForDay(state, day) {
  
    let interviewersArr = [];

     const filteredNames = state.days.filter(state => state.name === day);

    if(filteredNames.length === 0){
      return interviewersArr
    }

     const interviewersId = filteredNames[0].appointments

    interviewersArr = interviewersId.map(id => state.appointments[id]);
     
  return interviewersArr;
}