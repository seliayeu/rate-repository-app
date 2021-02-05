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