import React from 'react';
import { row, lightHighlighter, timeCol } from '../styles';
import { isTodaysDate } from '../../utils';
import moment from 'moment';
import { Droppable } from "react-beautiful-dnd";

function TimeSlotGroup ({ children, openAddEventModal, resources, time }) {
  const formattedTime = moment().set('hours', time).format('h a');
  let width = 100 / (resources.length + 1);
  return (
    <div className="timeSlotRow" key={time} style={{ ...row, "display": "flex" }}>
      <div style={{ ...timeCol, "width": `${width/2}%`, "paddingRight": "36px" }}>
        <span style={{ "position": "absolute", "top": "-8px" }}>
          {formattedTime}
        </span>
      </div>
      {resources.map((resource, index) =>  {
        let key = resource.dateStamp
        let dateStamp = resource.dateStamp;
        let droppableId = `${key}RW${time}`;
        let divStyle = { "minWidth": `${width}%`, "height": "40px", "borderLeft": "1px solid #e0e0e0", "borderTop": "1px solid #e0e0e0", "borderBottom": "1px solid #e0e0e0" };
        if(index === resources.length - 1) {
          Object.assign(divStyle, { "borderRight": "1px solid #e0e0e0" });
        }
        return(
          <div key={droppableId} style={divStyle}>
            <Droppable
              droppableId={droppableId}
              index={time}
            >
              {(provided, snapshot) => {
                return(
                  <div style={{ "height": "100%" }} snapshot={snapshot} {...provided.droppableProps} ref={provided.innerRef}>
                    <div key={`${key}${time}n`} style={isTodaysDate(dateStamp) ? { ...lightHighlighter, "height": "100%" } : { "height": "100%" }}>
                        <button style={{ "width": "100%", "height": "100%", "background": "transparent", "border": "none", "cursor": "pointer", "outline": "none" }} onClick={() => openAddEventModal(key, time)} />
                    </div>
                    {children && children(resource.date)}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </div>
  );
}

export default TimeSlotGroup;
