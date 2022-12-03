import React from 'react';
import { connect } from 'react-redux';
import { getSingleVenueThunk } from '../redux/singleVenue';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { convert, findDayOfWeek } from '../../helperFunctions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalSignUpandLogIn from './ModalSignUpAndLogin';

const SingleVenue = (props) => {
  console.log('url visiting', urlVisting);
  const business = props?.venue?.data?.business;

  useEffect(() => {
    const yelpId = props.match.params;
    console.log('YELPPPPPP', yelpId);
    props.getSingleVenue(yelpId);
  }, []);

  if (!business) return null;

  const open = convert(business.hours[0].open[0].start);
  const close = convert(business.hours[0].open[0].end);
  const daysOpen = business.hours[0].open.map((day) => {
    return ` ${findDayOfWeek(day.day)}, `;
  });

  let counter = 0;

  const reviews = business.reviews.map((review) => {
    counter += 1;
    return ` ${counter}.  ${review.text} `;
  });

  const { name, rating, photos, phone, price } = business;

  const urlVisting = props.history.location.pathname;
  window.localStorage.setItem('pathVisting', urlVisting);

  const saveLikedItem = async (e, venueInfo) => {
    const idToSave = e.target.name;
    const loggedInUserToken = window.localStorage.getItem('token');
    // attaching token to venueInfo since I will need it to find a user when login works
    venueInfo.token = loggedInUserToken;
    console.log('venueInfo', venueInfo);

    if (loggedInUserToken) {
      const saving = await axios.post(`/api/likedItems/${idToSave}`, venueInfo);
      console.log('returned from saving!', saving);
    }
    //else trigger sign up/login component
  };

  return (
    <div>
      <h1>{name ? name : ''}</h1>
      <Card className='text-center'>
        <Card.Header>Venue</Card.Header>
        <Card.Body>
          <Card.Title>{name ? name : 'No name available'}</Card.Title>
          <Card.Img className='img' variant='top' src={photos} />
          <Card.Text>
            <strong>Phone:</strong> {phone ? phone : 'No phone available'}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> {price ? price : 'No price available'}
          </Card.Text>
          <Card.Text>
            <strong>Open:</strong>{' '}
            {open ? open : 'No open hours information available'}
          </Card.Text>
          <Card.Text>
            <strong>Closes:</strong>{' '}
            {close ? close : 'No closing hours information available'}
          </Card.Text>
          <Card.Text>
            <strong>Days Open:</strong>{' '}
            {daysOpen ? daysOpen : 'No days open information available'}
          </Card.Text>
          <Card.Text>
            <strong>Overall rating:</strong>{' '}
            {rating ? rating : 'No rating available'}
          </Card.Text>
          <Card.Text>
            <strong>Reviews:</strong>{' '}
            {reviews ? reviews : 'No reviews available'}
          </Card.Text>
          {window.localStorage.getItem('token') ? (
            <Button
              variant='outline-success'
              name={business.id}
              onClick={(e) => {
                const venueInfo = {
                  name: name,
                  category: 'venue',
                  image_url: photos,
                };
                saveLikedItem(e, venueInfo);
              }}
            >
              Like
            </Button>
          ) : (
            <ModalSignUpandLogIn
              id={business.id}
              name={name}
              category={'venue'}
              image_url={photos}
              urlVisted={urlVisting}
            />
          )}
          <Link to='/allVenues'>
            <Button variant='outline-primary'>Go Back</Button>{' '}
          </Link>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    venue: state.singleVenue,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleVenue);
