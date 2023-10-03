import axios from "axios";
import { useMutation } from "react-query";
import { UserInfo } from "../types/userInfo";
type registerResponse = {
  userId: string;
};
const register = async (
  userInfo: Partial<UserInfo>
): Promise<registerResponse> => {
  const apiUrl = 'https://localhost:7262/api'
  const response = await axios.post(`${apiUrl}/auth/register`, userInfo);
  return response.data;
};

export function useRegister() {
  const { isLoading, mutateAsync, isSuccess } = useMutation(register);
  return {
    isRegistering: isLoading,
    register: mutateAsync,
    isRegistered: isSuccess,
  };
}
