import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from "../utils/apolloClient";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  return { data, loading };
};

export default useRepositories;
