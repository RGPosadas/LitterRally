import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { useOwnedEventsQuery } from '../../../../generated/graphql';
import { EventCard } from '../../../components';
import '../home-discover.scss';

export const MyEventsPage = ({ history }) => {
  const { data } = useOwnedEventsQuery({});

  if (data) {
    const events = (data.coHostEvents.concat(
      data.hostEvents
    ) as unknown) as Partial<ISerializedEvent>[];
    const sortedEvents = events
      .slice()
      .sort(
        (event1, event2) =>
          new Date(event1.startDate).valueOf() - new Date(event2.startDate).valueOf()
      );

    var eventCards = sortedEvents.map((event, index) => (
      <EventCard
        key={`myEvents-${index}`}
        isJoined={true}
        event={event}
        onClick={() => history.push(`/events/${event.id}`)}
      />
    ));
  }
  return (
    <div className="discover-page-tabs-container" data-testid="my-events-tab">
      {eventCards}
    </div>
  );
};

export default MyEventsPage;
