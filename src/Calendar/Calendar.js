import React, { useState, useEffect } from 'react';
import WeekView from './weekView';
import CalendarEventHandler from './calendarEventHandler';
import moment from 'moment';
function Calendar() {
  const [events, setEvents] = useState('');

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem ('events')) || {});
  }, []);

 ;

   
  
  const addNewEvent = (event) => {
    let newEvents = CalendarEventHandler.add(events, { ...event, id: CalendarEventHandler.generateId(event) });
    setObjectFunc(setEvents, newEvents);
  };

   
  const updateEvent = (e) => {
    // Probably have to update the [hour] mapping if an event is dragged vertically 
    // I don't think that's happening right now so it only updates when moving horizontally on drag
    if(e.hasOwnProperty("destination") && e.destination) {
      let draggableId = e.draggableId;
      let updatedEvent = '';
      Object.keys(events).map((hour) => {
        let potentialIndex = events[hour].findIndex((event) => event.id === draggableId);
        if(potentialIndex >= 0) {
          updatedEvent = events[hour][potentialIndex];
        }
        return true;
      });
      let droppableId = e.destination.droppableId;
      let timeDiff = moment(updatedEvent.end).hour() - moment(updatedEvent.start).hour();
      let newStartDate = moment(parseInt(droppableId.split('RW')[0]));
      let hour = parseInt(droppableId.split('RW')[1]);
      newStartDate.hours(hour);
      let newEndDate = moment(parseInt(droppableId.split('RW')[0]));
      newEndDate.hours(parseInt(droppableId.split('RW')[1]) + timeDiff);
      Object.assign(updatedEvent, { "start": newStartDate, "end": newEndDate });
      let newEvents = CalendarEventHandler.update(draggableId, updatedEvent, events);
      setObjectFunc(setEvents, newEvents);
    }
  };

  /**
   * Deletes an event from the event list in the state
   * @param {String} eventId - Id of the event
  */
  const deleteEvent = (eventId) => {
    setObjectFunc(setEvents, { events: CalendarEventHandler.delete(eventId, events) });
  };

  const setObjectFunc = (setObject, updateObject, nestedObjectKeys) => {
    setObject((prevObject) => {
      // console.log(prevObject);
  
      // Handle setting item of type object
      if(getType(prevObject) === "object") {
        let objectToBeUpdated = prevObject;
        if(nestedObjectKeys && nestedObjectKeys.length > 0) {
          nestedObjectKeys.forEach((key, index) => {
            if(objectToBeUpdated.hasOwnProperty(key)) {
              objectToBeUpdated = objectToBeUpdated[key];
              if(index === nestedObjectKeys.length - 1) {
                Object.assign(objectToBeUpdated, { ...updateObject });
              }
            }
          });
          return({ ...prevObject });
        } else {
          return({ ...prevObject, ...updateObject });
        }
      }
      // Handle setting item of type array
    });
  };

  const getType = (p) => {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  };

  return (
    <div style={{ "overflow": "scroll", "margin": "16px 32px 16px 32px", "minWidth": "100%" }}>
      <div>
        <WeekView
          events={events}
          onNewEvent={addNewEvent}
          onEventUpdate={updateEvent}
          onEventDelete={deleteEvent}
        />
      </div>
    </div>
  );
}

export default Calendar;
