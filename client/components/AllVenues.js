import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import { getSingleVenueThunk } from '../redux/singleVenue';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';
import FlexBoxForAllView from './Styled-Components/FlexBoxForAllView.styled';
import FlexBoxForSearchResults from './Styled-Components/FlexBoxForSearchResults.styled';

export const AllVenues = (props) => {
  const [price, setPrice] = useState(() => {
    const priceValue = window.localStorage.getItem('price');
    return priceValue !== null ? JSON.parse(priceValue) : '';
  });
  const [hoursOfOperation, setHoursOfOperation] = useState('');

  window.localStorage.removeItem('pathVisiting');

  useEffect(() => {
    const { location, service } = props.startForm;
    window.localStorage.setItem('price', JSON.stringify(price));
    return props.getVenues({ location, service, price });
  }, [price, hoursOfOperation]);

  const handlePriceSelect = (priceOptions) => {
    if (priceOptions.value) {
      if (priceOptions.value !== 'all') {
        setPrice(priceOptions.value);
      } else {
        setPrice('');
      }
    }
  };

  const priceOptions = [
    { value: '1', label: '$' },
    { value: '2', label: '$$' },
    { value: '3', label: '$$$' },
    { value: '4', label: '$$$$' },
    { value: 'all', label: 'All' },
  ];

  const allVenues = props.venues.filter((venue) => {
    return venue.is_claimed === true && venue.rating >= 3.5;
  });

  return (
    <div>
      <FlexBoxForSearchResults>
        <h1>Venue search results for {props.startForm.location}: </h1>
        <p>{allVenues.length} venues found</p>

        <form style={{ width: '100px' }} onSubmit={handlePriceSelect(price)}>
          <Select
            defaultValue={priceOptions[4]}
            // isMulti
            name='price'
            options={priceOptions}
            menuPlacement='auto'
            menuPosition='fixed'
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handlePriceSelect}
          />
        </form>
        <br></br>
      </FlexBoxForSearchResults>
      <br></br>
      <br></br>
      <FlexBoxForAllView>
        {allVenues.map((venue) => {
          return (
            <div key={venue.id}>
              <Card className='mb-4 ' style={{ width: '25rem' }}>
                <Card.Img
                  className='allViews'
                  variant='top'
                  src={venue.photos[0]}
                />
                <Card.Body>
                  <Card.Title>
                    {venue.name ? venue.name : 'No venue name available'}
                  </Card.Title>
                  <Card.Text>
                    <strong>Address: </strong>
                    {venue.location.address1
                      ? venue.location.address1
                      : 'No address available'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price: </strong>
                    {venue.price ? venue.price : 'Price not available'}
                  </Card.Text>
                  <Link to={`/singleVenue/${venue.id}`}>
                    <Button variant='primary' name={venue.id}>
                      See More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </FlexBoxForAllView>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    venues: state.venues,
    venue: state.venue,
    startForm: state.startFormReducer,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getVenues: ({ location, service, price }) => {
      dispatch(getVenuesThunk({ location, service, price }, history));
    },
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);
