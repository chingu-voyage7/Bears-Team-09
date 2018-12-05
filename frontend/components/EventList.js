import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const events = [
      { id: 1, title: 'biking', description: 'special trail' },
      { id: 2, title: 'baking', description: 'special cake' },
      {
        id: 3,
        title: 'hiking',
        description: 'lots of bears on this hike need a friend'
      },
      { id: 4, title: 'concert', description: 'I do not wanna go alone' },
      { id: 5, title: 'workout', description: 'Lifting heavy need a spotter' }
    ];
    return (
      <div>
        {events.map(event => (
          <EventListItem key={event.id} {...event} />
        ))}
      </div>
    );
  }
}

export default EventList;
