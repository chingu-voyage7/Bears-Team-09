import React, { Component } from "react";
import { format } from "date-fns";
import EventListItem from "./EventListItem";

// we would use this helper function to filter events, may need to push out //to utils folder for cleaner looking component
function applyEventsFilter(events, filters = null) {
  if (!filters) return events;
  const filterArr = Object.keys(filters);
  const filteredEvents = events.filter(event => {
    for (let i = 0; i < filterArr.length; i++) {
      const currFilter = filterArr[i];
      // handle unset state which is null and should be ignored
      if (filters[currFilter] === null) break;
      // special handling of the date filter as we need to format it
      if (currFilter === "datefrom") {
        if (format(new Date(filters[currFilter]), "yyy-MM-dd") !== format(new Date(event[currFilter]), "yyy-MM-dd")) {
          return false;
        }
        return true;
      }
      // handle everything else
      if (filters[currFilter] !== event[currFilter]) {
        return false;
      }
    }
    return true;
  });
  return filteredEvents;
}

class EventList extends Component {
  render() {
    const { events, filters } = this.props;
    const eventsToShow = applyEventsFilter(events, filters);
    return (
      <div>
        {eventsToShow.map(event => (
          <EventListItem key={event.id} {...event} />
        ))}
      </div>
    );
  }
}

export default EventList;
