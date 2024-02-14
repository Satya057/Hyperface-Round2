import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import EventHighlighter from './EventHighlighter';

function CalendarEvent({ id, index, event, onEventDelete, onEventUpdate, startDate }) {
    return (
        <Draggable draggableId={id} index={index} >
            {(provided, snapshot) => {
                //Handles invariant not found error
                // console.log(provided.draggableProps.onTransitionEnd);
                if (typeof (provided.draggableProps.onTransitionEnd) === 'function') {
                    window?.requestAnimationFrame(() =>
                        provided.draggableProps.onTransitionEnd({
                            propertyName: 'transform',
                        })
                    );
                }
                return (
                    <div ref={provided.innerRef} snapshot={snapshot} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <EventHighlighter
                            isDragging={snapshot.isDragging}
                            calendarPosition={index}
                            event={event}
                            onEventDelete={onEventDelete}
                            onEventUpdate={onEventUpdate}
                            startDate={startDate}
                        />
                    </div>
                );
            }}
        </Draggable>
    );
}

export default CalendarEvent;
