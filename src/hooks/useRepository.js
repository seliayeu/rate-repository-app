import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from "../utils/apolloClient";

const useRepository = ({ id, first }) => {
  const { data, loading, error, fetchMore  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {id, first} });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor, id, first
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
            repository: {
              ...fetchMoreResult.repository,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ]
          }
        };

        return nextResult;
      },
    });
  };

  return {     
    data,
    loading,
    fetchMore: handleFetchMore,};
};

export default useRepository;
