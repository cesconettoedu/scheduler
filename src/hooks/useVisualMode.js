import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if(replace){
    setMode(newMode)
    } else {
    setMode(newMode)
    setHistory(prevHistory =>  [...prevHistory, newMode])
    }
  }


  function back() {
    setHistory(prevHistory => {

          //limit to back function 
      if(prevHistory.length === 1){
         setMode(initial)
      } else {
        prevHistory.pop()  // remove the last item
        setMode(prevHistory[prevHistory.length -1]) //get the last item after remove in the line before
        return prevHistory
      }
    })

  }

  return { mode, transition, back };
}


