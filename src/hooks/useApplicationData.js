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


  
                    //catch the day name and return the value (id)
  function availableDays(day) {
    const weekDays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return weekDays[day]
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


                                  // state.day pass the day name 'monday' to the function
    const weekDay = availableDays(state.day)

    let day = {
     ...state.days[weekDay],
     spots: state.days[weekDay]
    }

    if (!state.appointments[id].interview) {
      day = {
       ...state.days[weekDay],
       spots: state.days[weekDay].spots - 1
      } 
    } else {
      day = {
       ...state.days[weekDay],
       spots: state.days[weekDay].spots
      } 
    }

    let days = state.days
    days[weekDay] = day;






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



    const weekDay = availableDays(state.day)

    const day = {
      ...state.days[weekDay],
      spots: state.days[weekDay].spots + 1
    }

    let days = state.days
    days[weekDay] = day;

    


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