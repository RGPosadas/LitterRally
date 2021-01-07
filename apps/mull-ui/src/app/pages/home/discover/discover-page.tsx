import { gql, useQuery } from '@apollo/client';
import { ISerializedEvent } from '@mull/types';
import React from 'react';
import { EventCard } from '../../../components';
import '../home-discover.scss';

interface DiscoverData {
  discoverEvents: Partial<ISerializedEvent>[];
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
    fetchPolicy: 'network-only',
    // TODO: dynamically pass current UserId
    variables: { discoverEventsUserId: 1 },
  });

  if (data) {
    const events: Partial<ISerializedEvent>[] = data.discoverEvents;
    var eventCards = events.map((event, index) => (
      <EventCard key={index} event={event} onClick={() => history.push(`/events/${event.id}`)} />
    ));
  }
  return <div className="discover-page-tabs-container">{eventCards}</div>;
};

export default DiscoverPage;
