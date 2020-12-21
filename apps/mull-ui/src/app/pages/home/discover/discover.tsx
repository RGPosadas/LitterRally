import React from 'react';
import { IEvent } from '@mull/types';
import { EventCard } from '../../../components';
import { gql, useQuery } from '@apollo/client';

import '../home-discover.scss';

interface DiscoverData {
  discoverEvents: IEvent[];
}

export const GET_DISCOVER_EVENTS = gql`
  query DiscoverEvents($discoverEventsUserId: Int!) {
    discoverEvents(userId: $discoverEventsUserId) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

export const DiscoverPage = ({ history }) => {
  const { data } = useQuery<DiscoverData>(GET_DISCOVER_EVENTS, {
    variables: { discoverEventsUserId: 11 },
  });

  if (data) {
    const events: [Partial<IEvent>] = data.discoverEvents as [Partial<IEvent>];
    var eventCards = events.map((event, index) => <EventCard key={index} event={event} onClick={() => history.push(`/events/${event.id}`)}/>);
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default DiscoverPage;
