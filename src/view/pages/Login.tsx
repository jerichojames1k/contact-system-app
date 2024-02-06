import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { useDispatch} from "react-redux";
import { IDataAuth } from "../../context/AuthProvider";
import { contactLoginDetails } from "../../actions/contactActions";
const Login: React.FC = () => {
  const dispatch = useDispatch();
 const { setAuth } = useAuth()
  
  const [data, setData] = useState<any>({ email: "", pwd: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/contact";
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth && setAuth({ email:response?.data?.user, pwd:response?.data?.pwd, roles:roles.split(), accessToken,userId:response?.data?.userId });
      dispatch(
        contactLoginDetails({
          id:response?.data?.id,
          user: response?.data?.user,
          pwd: response?.data?.pwd,
          roles: roles.split(),
          accessToken
        })
      );
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  const handleDataChange = (value: string, key: string) => {
    setData({ ...data, [key]: value });
  };

  const [categories, setCategories] = useState([]);
  console.log("%c 💬: categories ", "font-size:16px;background-color:#e0a267;color:white;", categories)

  const fetchData = async () => {
    try {
      // Make GET request to the API endpoint
      const response = await axios.get(
        'https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories?sortBy=createdAt&order=desc'
      );

      // Update state with the fetched data
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post('https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories', { name: 'jericho' });
      // Refresh categories after adding
      fetchData();
      // Clear input field
     // setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async () => {
    try {
      const deleteID=[56,57,58,59,60]
      deleteID.forEach(async (item)=>{
      console.log("%c 👱‍♂️: deleteCategory -> item ", "font-size:16px;background-color:#95d39c;color:black;", item)
        return await axios.delete(`${'https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories'}/${item}`);
      })
    
      // Refresh categories after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  useEffect(() => {
    deleteCategory();
  }, []);



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white shadow-current shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-auto">
        <div className="mb-2 flex items-center justify-end">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="signIn"
          >
            {""}
          </label>
          <div className="w-full py-2 px-3 text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder=""
            onChange={(e) => {
              handleDataChange(e.target.value, "email");
            }}
          />
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right m"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder=""
            onChange={(e) => {
              handleDataChange(e.target.value, "pwd");
            }}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
