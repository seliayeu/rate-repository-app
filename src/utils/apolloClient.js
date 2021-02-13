import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import Constants from "expo-constants";

export const GET_REPOSITORIES = gql`
  query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $search: String, $first: Int, $after: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $search, first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
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
  query GetRepo($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }  
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

export const CURRENT_USER = gql`
  query($includeReviews: Boolean = false) {
      authorizedUser {
        id
        username
        reviews @include(if: $includeReviews) {
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
              repository {
                id
              }
            }
          }
        }
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