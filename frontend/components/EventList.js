import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import Event from "./Event";

// we would use this helper function to filter events, may need to push out //to utils folder for cleaner looking component
function applyEventsFilter(events, filters) {
  function compareEventAndFilter(event, filtersObject) {
    let everyFilterMatching = true;
    Object.keys(filtersObject).forEach(filter => {
      if (filter === "datefrom") {
        // early exit for null dates
        if (filters[filter] !== null) {
          const filterDate = format(filters[filter], "YYYY-MM-DD");
          const eventDate = format(event[filter], "YYYY-MM-DD");
          if (filterDate !== eventDate) {
            everyFilterMatching = false;
          }
        }
      } else if (filter === "activity" || filter === "city") {
        if (filters[filter] !== null) {
          // normalization before comparison
          const filterValue = filters[filter].toLowerCase();
          const eventValue = event[filter].toLowerCase();
          if (filterValue !== eventValue) {
            everyFilterMatching = false;
          }
        }
      }
    });
    return everyFilterMatching;
  }

  const filteredEvents = events.filter(event => compareEventAndFilter(event, filters));
  return filteredEvents;
}

const makeEventsDomElements = events => events.map(event => <Event {...event} key={event.id} />);

const EventList = props => {
  const { filters, events } = props;
  const eventsToShow = makeEventsDomElements(applyEventsFilter(events, filters));
  return <div>{eventsToShow && eventsToShow}</div>;
};

export default EventList;

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.shape({
    datefrom: PropTypes.string,
    city: PropTypes.string,
    activity: PropTypes.string
  }).isRequired
};
