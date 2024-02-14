import React from 'react';
import { weekDayName, weekDates, lightHighlighter, timeCol } from '../styles';
import {isTodaysDate} from '../../utils';

function WeekHeader ({ headerArray }) {
  let weekView = 0;
  let width = 100 / (headerArray.length + 1);
  return (
    <div style={{ "display": "flex", "width": "100%" }}>
      <div style={{ ...timeCol, "width": `${width/2}%`, "paddingRight": "36px" }} />
      {headerArray.map((day, index) => {
        let width = 100 / (headerArray.length + 1);
        let divStyle = { "minWidth": `${width}%`, "borderLeft": "1px solid #e0e0e0", "borderTop": "1px solid #e0e0e0", "borderBottom": "1px solid #e0e0e0" };
        if(index === 0) {
            Object.assign(divStyle, { "marginLeft": `${(width/2 + (weekView * 4.75))}%` });
        }
        if(index === headerArray.length - 1) {
            Object.assign(divStyle, { "borderRight": "1px solid #e0e0e0", "marginRight": `${width/2}%` });
        }
        if(!day.hasOwnProperty("name") && isTodaysDate(day.dateStamp)) {
            Object.assign(divStyle, { ...lightHighlighter });
        } 
        return(
          <div
            key={day.dateStamp}
            style={divStyle}
          >
            <p style={weekDayName}>{day.weekDayName}</p>
            <p style={weekDates}>{day.date}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WeekHeader;