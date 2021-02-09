import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from "../utils/apolloClient";

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, { fetchPolicy: "cache-and-network", variables: { id } });

  return { data, loading };
};

export default useRepository;
