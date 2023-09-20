import axios from "axios";
import { useMutation } from "react-query";
type loginResponse = {
  id: string;
  token: string;
};
const apiUrl = 'https://localhost:7262/api'
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<loginResponse | null> => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  if (response.status === 200) {
    return response.data
  }
  return null

};

export function useLogin() {
  const { isLoading, mutateAsync,isSuccess} = useMutation(login);
  return { isLoggingIn: isLoading,isLoggedIn:isSuccess,login: mutateAsync };
}
