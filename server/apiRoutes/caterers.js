const express = require('express');
const caterersRouter = express.Router();
const axios = require('axios');
// const { GraphQLClient } = require('graphql-request');

require('dotenv').config();

const query = `{
    search(term: "restaurant mexican", location: "11209", categories: "catering", attributes: "Offers Catering") {
      total
      business {
        name
        phone
        price
        photos
        url
        reviews {
          id
          text
          rating
        }
        location {
          address1
          city
          state
          country
        }
        rating
      }
    }
  }`;

// const yelpAPIUrl = 'https://api.yelp.com/v3/graphql';
// const client = new GraphQLClient(yelpAPIUrl, {
//   headers: {
//     'content-type': 'application/graphql',
//     Authorization: `Bearer ${process.env.YELP_TOKEN}`,
//   },
// });
const YELP_TOKEN =
  'RanbOY5NRwsj61NTbTSYC5PusHxCsBee1r0iIBdwGueYurwZ_yIlZL1PD_H5zmaz59Uv8vQAE2rEQQY_wxUbHgjeCvXxfCwNhJS0UY6gDHzP6raJhQ9wGYnWnlN9Y3Yx';
const getCaterers = async () => {
  const options = {
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: {
      'content-type': 'application/graphql',
      Authorization: `Bearer ${YELP_TOKEN}`,
    },
    data: query,
  };
  return axios
    .request(options)
    .then(function (response) {
      const res = response.data;
      return res;
      //   console.log(res.data.search.business); // Response received from the API
    })

    .catch(function (error) {
      console.error(error);
    });
};

caterersRouter.post('/', async (req, res, next) => {
  try {
    const data = await getCaterers();
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
});

// caterersRouter.post('/', async (req, res, next) => {
//   try {
//     // users will select the params
//     const term = 'restaurant mexican';
//     const location = '11209';
//     const variables = { term, location };
//     const query = `{
//         query search($term: String!, $location: String!){
//         search(
//             term: $term,
//             location: $location,
//           ) {
//            total
//            business {
//              name
//              phone
//              price
//              photos
//              url
//              reviews {
//                id
//                text
//                rating
//              }
//              location {
//                address1
//                city
//                state
//                country
//              }
//              rating
//            }
//          }
//        }}`;
//     const data = await client.request(query, variables);
//     console.log(res.json(data));
//   } catch (error) {
//     throw error;
//   }
// });

// getCaterers();

module.exports = { caterersRouter };
