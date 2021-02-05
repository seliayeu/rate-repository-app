import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../utils/apolloClient";
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';


const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    console.log(data);
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
  };

  return [ signIn, result ];
};

export default useSignIn;