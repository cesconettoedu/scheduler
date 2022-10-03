import axios from "axios";
import { useState, useEffect } from "react";


export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      setState(prev => (
        {...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
      ));
    }); 
  }, []);


  const updatedDays = (appointments) => {
    const currentDay = state.days.find(day => day.name === state.day)
    const currentDayIndex = state.days.findIndex(day => day.name === state.day)

    const spots =  currentDay.appointments.filter(appointmentId => !appointments[appointmentId].interview).length
    const updatedDay = {...currentDay, spots}
    const updatedDays = [...state.days]
    updatedDays[currentDayIndex] = updatedDay
    return updatedDays
  }




// book a interview ////////////////////////////////////////////////
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.put(`/api/appointments/${id}`, {interview: interview})
      .then(res => {setState({...state, appointments, days: updatedDays(appointments)})})  
  }

//cancel deleting a interview ///////////////////////////////////////////////////
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



     return axios.delete(`/api/appointments/${id}`)
      .then(res => {setState({...state, appointments, days: updatedDays(appointments)})
      
    })
  }
//////////////////////////////////////////////////////////////////////

return {
  state, 
  setDay,
  bookInterview,
  cancelInterview
}
};