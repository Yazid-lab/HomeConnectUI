import axios from "axios";
import { useMutation } from "react-query";
const apiUrl = "https://localhost:7262/api";
const logout = async (): Promise<string> => {
  const { data } = await axios.post(`${apiUrl}/auth/logout`);
  return data;
};

export function useLogout() {
  const { isLoading, mutateAsync } = useMutation(logout);
  return { isLoggingOut: isLoading, logout: mutateAsync };
}
