import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import Constants from "expo-constants";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          openIssuesCount
          ownerAvatarUrl
          description
          language
          authorizedUserHasReviewed
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($name: String!, $owner: String!, $rating: Int!, $review: String){
  createReview(review: {
    repositoryName: $name,
    ownerName: $owner,
    rating: $rating,
    text: $review
  }) {
    repository {
      id
    }
  }
}
`;

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    createUser(user: {
      username: $username,
      password: $password
    }) {
      id
    }

  }
`;

export const GET_REPOSITORY = gql`
  query GetRepo($id: ID!) {
    repository(id: $id) {
      id
      name
      ownerName
      createdAt
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      openIssuesCount
      ownerAvatarUrl
      description
      language
      authorizedUserHasReviewed
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }  
    }
  }
`;
export const CURRENT_USER = gql`
  query {
      authorizedUser {
        id
        username
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!){
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: Constants.manifest.extra.uri,
  });
};

export default createApolloClient;