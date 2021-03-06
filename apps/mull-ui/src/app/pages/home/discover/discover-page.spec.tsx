import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { DiscoverEventsDocument, DiscoverEventsQuery } from '../../../../generated/graphql';
import { UserProvider } from '../../../context/user.context';
import DiscoverPage from './discover-page';

describe('discoverPage', () => {
  const renderHelper = (history, mocks: MockedResponse[]) => {
    return (
      <UserProvider value={{ userId: 1, setUserId: jest.fn() }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <DiscoverPage history={history} />
          </Router>
        </MockedProvider>
      </UserProvider>
    );
  };

  it('should render successfully', () => {
    const history = createMemoryHistory();
    history.push(ROUTES.DISCOVER.url);

    const { baseElement } = render(renderHelper(history, null));
    expect(baseElement).toBeTruthy();
  });

  it('should render eventCards within the discover page', async () => {
    await act(async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: DiscoverEventsDocument,
          },
          result: {
            data: {
              discoverEvents: [
                {
                  id: 1,
                  title: 'test',
                  description: 'test',
                  startDate: '2022-12-12T03:00:00.000Z',
                  endDate: '2022-12-13T03:00:00.000Z',
                  __typename: 'Event',
                  location: {
                    title: 'mockTitle',
                  },
                  restriction: 1,
                  image: {
                    id: 1,
                    mediaType: 'jpeg',
                  },
                },
              ],
            } as DiscoverEventsQuery,
          },
        },
      ];

      const history = createMemoryHistory();
      history.push(ROUTES.DISCOVER.url);

      const utils = render(renderHelper(history, mocks));

      await new Promise((resolve) => setTimeout(resolve, 0));

      const eventCards = utils.container.querySelector('.event-card-container');
      expect(eventCards).toBeTruthy();
    });
  });
});
