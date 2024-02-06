import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
export const useRefreshToken = () => {
  const { setAuth } = useAuth() as any;
  const navigate=useNavigate()
  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth((prev: any) => {
        return {
          ...prev,
          roles: response.data.roles.split(),
          accessToken: response.data.accessToken,
          userId:response?.data?.userId ?? ''
        };
      });
      return response.data.accessToken;
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate("/signIn");
      }
    }
  };
  return refresh;
};
