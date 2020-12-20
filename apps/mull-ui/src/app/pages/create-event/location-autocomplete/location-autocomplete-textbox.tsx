import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { gql, useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './location-autocomplete-textbox.scss';
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

export const AUTOCOMPLETED_LOCATIONS = gql`
  query Query($userInput: String!) {
    getAutocompletedLocations(userInput: $userInput)
  }
`;

export interface LocationAutocompleteTextboxProps {
  handleClose: (value: string) => void;
  input: string;
}

export default function LocationAutocompleteTextbox({ handleSetValue, input }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [getAutocompletedLocations, { loading, data }] = useLazyQuery(AUTOCOMPLETED_LOCATIONS);
  const CURRENT_LOCATION = 'Current Location';
  const debounceGetLocation = useMemo(
    () =>
      debounce(
        (values: string) =>
          getAutocompletedLocations({
            variables: { userInput: values },
          }),
        350
      ),
    []
  );

  useEffect(() => {
    if (!loading && data) {
      setOptions(data.getAutocompletedLocations);
    }
  }, [loading, data, setOptions]);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = `latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`;
        handleSetValue({ title: 'Current Location', coords: pos });
      });
    }
  };

  return (
    <Autocomplete
      id="location-input-field"
      data-testid="location-autocomplete-textbox"
      style={{ width: '100%' }}
      open={open}
      onFocus={() => {
        setOptions([CURRENT_LOCATION]);
        setOpen(true);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      defaultValue={input}
      onInputChange={(_event, value) => {
        if (value) {
          debounceGetLocation(value);
        }
      }}
      onChange={(_event, value) => {
        if (value === CURRENT_LOCATION) {
          getCurrentPosition();
        } else if (value) {
          handleSetValue({ title: value });
        }
      }}
      getOptionSelected={(option, value) => option === value}
      renderOption={(option) => {
        let icon = option == CURRENT_LOCATION ? faLocationArrow : faMapMarkerAlt;
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={icon} style={{ marginRight: '0.8rem' }} />
            {option}
          </React.Fragment>
        );
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          placeholder={'Search Address'}
          autoFocus
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
