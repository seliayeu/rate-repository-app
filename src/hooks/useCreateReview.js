import { useMutation } from "@apollo/react-hooks";
import { CREATE_REVIEW } from "../utils/apolloClient";

const createReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const create = async ({name, owner, rating, review}) => {
    console.log(name);
    const { data } = await mutate({ variables: {name, owner, rating: parseInt(rating), review} });
    return data;
  };

  return [ create, result ];
};

export default createReview;