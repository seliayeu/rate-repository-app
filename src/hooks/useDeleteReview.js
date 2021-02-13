import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../utils/apolloClient";


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({ variables: { id } });
  };

  return [ deleteReview, result ];
};

export default useDeleteReview;