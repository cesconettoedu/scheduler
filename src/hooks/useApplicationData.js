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
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {

      setState(prev => (
        {...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
      ));
    }); 
  }, []);



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
      .then(res => {setState({...state, appointments})})  
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
      .then(res => {setState({...state, appointments})
      
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