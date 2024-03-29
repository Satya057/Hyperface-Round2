import moment from 'moment';

const CalendarEventHandler = (function () {
  /**
   * Add event after adding meta data in the event
   * @param {arr} allEvent - Array of all the events
   * @param {Object} newEvent - Event object of the new event
   * @returns {Object} allEvents - A new object reference for all events
  */
  function addEvent (allEvents, newEvent) {
    const time = moment(newEvent.start).hours();
    const eventWithMeatInfo = {
      ...newEvent,
      startWeek: moment(newEvent.start).week(),
      endWeek: moment(newEvent.end).week(),
    };
    if(allEvents[time]) {
      allEvents[time].push(eventWithMeatInfo);
    } else {
      allEvents[time] = [eventWithMeatInfo];
    }
    return {...allEvents};
  }

 
  function generateUniqueId({start, title, end}) {
    return start + title + end;
  }

 
  function deleteEvent (eventId, allEvents) {
    Object.keys(allEvents).forEach((time) => {
      allEvents[time] = allEvents[time].filter((event) => event.id !== eventId);
    });
    return {...allEvents};
  }

  
  function updateEvent (eventId, updatedEvent, allEvents) {
    Object.keys(allEvents).forEach((time) => {
      allEvents[time] = allEvents[time].map((event) => (event.id === eventId ? {...event, ...updatedEvent} : event));
    });
    return {...allEvents};
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId,
  };
}) ();

export default CalendarEventHandler;
