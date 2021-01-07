import React, { CSSProperties } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { dummyEvent, ROUTES } from '../constants';
import './app.scss';
import { BotNavBar, EventCard, SubNavBar, TopNavBar } from './components';
import CreateEventPage from './pages/create-event/create-event';
import EventPage from './pages/event-page/event-page';
import DiscoverPage from './pages/home/discover/discover-page';
import MyEventsPage from './pages/home/my-events/my-events';
import UpcomingPage from './pages/home/upcoming/upcoming';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

/**
 * Main component of the application
 */

/* Temporary, to be removed */
const showNavigation = (location) => {
  if ([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname)) {
    return false;
  }
  return true;
};

export const App = () => {
  const location = useLocation();

  const getTopBarStyle = (): CSSProperties => {
    if (location.pathname.includes(ROUTES.HOME)) {
      return { boxShadow: 'none' };
    }
    return {};
  };

  return (
    <div>
      <Switch>
        <Route exact path={['/', ROUTES.HOME]}>
          {<Redirect to={ROUTES.DISCOVER} />}
        </Route>
        <Route exact path={ROUTES.CREATE_EVENT} component={CreateEventPage} />
        {/* Temporary, to be removed */}
        <Route exact path={'/test-event-card'}>
          <div className="page-container">
            <EventCard event={dummyEvent} style={{ marginBottom: '1rem' }} />
            <EventCard event={dummyEvent} style={{ marginBottom: '1rem' }} />
          </div>
        </Route>
        <Route
          exact
          path="/events/:id"
          children={
            <EventPage
              // TODO: Remove placeholder once file download is done
              eventImageURL={'https://i.ytimg.com/vi/-Mb3FoIlTCY/maxresdefault.jpg'}
              prevPage="Discover"
            />
          }
        />
        <Route exact path={'/test-event-page'}>
          <EventPage
            event={dummyEvent}
            eventImageURL="https://www.citywindsor.ca/residents/parksandforestry/City-Parks/PublishingImages/Assumption%20Park%20Street%20View.JPG"
            prevPage="home"
          />
        </Route>
        <Route path={ROUTES.HOME}>
          <SubNavBar className="top-nav-bar-shadow" />
          <div className="page-container with-sub-nav-bar">
            <SwipeableRoutes>
              <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
              <Route path={ROUTES.UPCOMING} component={UpcomingPage} />
              <Route path={ROUTES.MY_EVENTS} component={MyEventsPage} />
              <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.DISCOVER} />} />
            </SwipeableRoutes>
          </div>
        </Route>
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
      </Switch>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {showNavigation(location) ? (
        <>
          <TopNavBar style={getTopBarStyle()} />
          <BotNavBar />
        </>
      ) : null}
    </div>
  );
};

export default App;
