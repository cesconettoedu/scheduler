

export function getAppointmentsForDay(state, day) {
  
  let appointmentArr = [];

  const filteredNames = state.days.filter(state => state.name === day);
    
    if(filteredNames.length === 0){
      return appointmentArr
    }

  const appointmentID = filteredNames[0].appointments
        // [1, 2, 3]

   appointmentArr = appointmentID.map(id => state.appointments[id]);

return appointmentArr;
}

