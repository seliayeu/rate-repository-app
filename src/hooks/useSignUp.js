import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../utils/apolloClient";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({username, password}) => {
    const { data } = await mutate({ variables: {username, password } });
    return data;
  };

  return [ signUp, result ];
};

export default useSignUp;