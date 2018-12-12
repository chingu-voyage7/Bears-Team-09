import React, { Component } from "react";
import { format } from "date-fns";
import EventListItem from "./EventListItem";

// we would use this helper function to filter events, may need to push out //to utils folder for cleaner looking component
function applyEventsFilter(events, filters) {
  let filterMatch = true;
  function compareEventAndFilter(event, filtersObject) {
    // we would always loop over every filter that is present
    Object.keys(filtersObject).forEach(filter => {
      // comparing filter value to the event value
      // handle null value which should return true (skip)
      if (filters[filter] === null) {
        filterMatch = true;
        return;
      }
      if (filter === "datefrom") {
        // nomralization before comparison
        const filterDate = format(filters[filter], "YYYY-MM-DD");
        const eventDate = format(event[filter], "YYYY-MM-DD");
        if (filterDate !== eventDate) {
          filterMatch = false;
        }
      }
      if (filter === "activity" || filter === "city") {
        // these two should be handled the same
        const filterValue = filters[filter].toLowerCase();
        const eventValue = event[filter].toLowerCase();
        if (filterValue !== eventValue) {
          filterMatch = false;
        }
      }
    });
    return filterMatch;
  }
  const filteredEvents = events.filter(event => compareEventAndFilter(event, filters));
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
