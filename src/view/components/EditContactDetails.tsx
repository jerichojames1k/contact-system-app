import React, { useEffect, useState } from "react";
//import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const EditContactDetails = () => {
  const modules = useSelector((state: RootState) => state.credentialReducer);
  const [data, setData] = useState<any>({
    id:"",
    name: "",
    userId:modules?.id,
    company: "",
    phone: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id= searchParams.get('id') 
  const mode = searchParams.get('mode') as 'insert' | 'edit'
  const navigate = useNavigate()
  const handleDataChange = (value: string, key: string) => {
    setData({ ...data, [key]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
  
    if(mode=='edit'){
      try {
        const response = await axiosPrivate.put("/contact/edit", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        navigate(-1)
       return response;
      } catch (err: any) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("UserEmail Taken");
        } else {
          setErrMsg("Edit Contact is failed");
        }
    }
  }
  else{
    try {
      const response = await axiosPrivate.post("/contact/add", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
         navigate(-1)
        return response;
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("UserEmail Taken");
      } else {
        setErrMsg("AddContact is failed");
      }
    }
  }
  };



  useEffect(()=>{
    if(Object.keys(location.state ?? []).length){
      setData({...data,...location?.state})
    }
  },[])
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white shadow-current shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-auto">
        <div className="mb-2 flex items-center justify-end">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="none"
          >
            {""}
          </label>
          <div className="w-full py-2 px-3 text-gray-700">
            <h2 className="text-2xl font-bold mb-4">{mode=='edit' ? "Edit Contact":'Add Contact'}</h2>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            value={data?.name ?? ''}
            placeholder=""
            onChange={(e) => {
              handleDataChange(e.target.value, "name");
            }}
          />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="name"
          >
            Company
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="company"
            placeholder=""
            value={data?.company ?? ''}
            onChange={(e) => {
              handleDataChange(e.target.value, "company");
            }}
          />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="phone"
            value={data?.phone ?? ''}
            placeholder=""
            onChange={(e) => {
              handleDataChange(e.target.value, "phone");
            }}
          />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label
            className="w-40 text-gray-700 text-sm font-bold text-right"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder=""
            value={data?.email ?? ''}
            onChange={(e) => {
              handleDataChange(e.target.value, "email");
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

export default EditContactDetails;
