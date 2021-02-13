import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER } from "../utils/apolloClient";

const useGetUser = (includeReviews) => {
  const {data, loading, refetch} = useQuery(CURRENT_USER, {     fetchPolicy: 'cache-and-network',
  variables: { includeReviews } });
  return [ data, loading, refetch ];
};

export default useGetUser;