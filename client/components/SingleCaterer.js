import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCaterer } from '../redux/singleCaterer';

const SingleCaterer = (props) => {
  const business = props?.caterer?.data?.business;
  console.log('heree======', props);

  useEffect(() => {
    const yelpId = props.match.params;
    props.fetchSingleCaterer(yelpId);
  }, []);
  const { name, rating, photos, phone, price } = business;

  return (
    <div>
      <h1>{name}</h1>
      <Card className="text-center">
        <Card.Header>Caterer</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img className="img" variant="top" src={photos} />
          <Card.Text>
            <strong>Phone:</strong> {phone}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> {price}
          </Card.Text>
          <Card.Text>
            <strong>Overall rating:</strong> {rating}
          </Card.Text>
          <Card.Text>
            <strong>Reviews:</strong> {reviews}
          </Card.Text>
          <Link to="/allCaterers">
            <Button variant="primary">Go Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    caterer: state.singleCaterer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleCaterer);
