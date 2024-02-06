import { useDispatch } from "react-redux";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { contactLoginDetails } from "../actions/contactActions";

const useLogout = () => {
    const { setAuth } = useAuth() as any;

    //const dispatch = useDispatch()

    const logout = async () => {
      setAuth({});
    //   dispatch(
    //     contactLoginDetails({
    //       id:"",
    //       user:"",
    //       pwd: "",
    //       roles: [],
    //       accessToken:""
    //     })
    //   );
        try {
           
            const response = await axios.get('/logout', {
                withCredentials: true
            });
            return  response;
      
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout