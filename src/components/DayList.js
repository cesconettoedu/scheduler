import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, setDay, day } = props
  
  const AvailableDays = days.map(dayArr => {
    
    return (

      <DayListItem
        key={dayArr.id}
        selected={dayArr.name === day}
        setDay={setDay}
        {...dayArr}
      />

    );
  });
  
  return <ul>{AvailableDays}</ul>;
}

