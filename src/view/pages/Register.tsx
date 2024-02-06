import React, { useRef, useState } from 'react';
import axios from '../../api/axios'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux';
import {contactInsert,contactDataDetails} from '../../actions/contactActions'
import { useNavigate } from 'react-router-dom';
//const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register:React.FC = () => {
    const navigate=useNavigate()
    const [data,setData]=useState<any>({user:'',email:'',pwd:''})
  //  const userRef = useRef();
//const errRef = useRef<any>();
  //  const [user, setUser] = useState('');
   // const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // if button enabled with JS hack
      //const v1 = USER_REGEX.test(user);
       // const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post("/register",
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(Object.keys(response ?? {}).length){
              return navigate("/thankyou")
            }

        } catch (err:any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
         //   errRef.current.focus();
        }
    }
const handleDataChange=(value:string,key:string)=>{
     setData({...data,[key]:value})
 }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    
      <form className="bg-white shadow-current shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-auto">
         <div className="mb-2 flex items-center justify-end">
          <label className="w-48 text-gray-700 text-sm font-bold text-right" htmlFor="signIn">
           {""}
          </label>
          <div className='w-full py-2 px-3 text-gray-700'>
             <h2 className="text-2xl font-bold mb-4">Registration</h2>
          </div>
          
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-48 text-gray-700 text-sm font-bold text-right" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            value={data?.name}
            placeholder=""
            onChange={(e)=>{handleDataChange(e.target.value,'user')}}
          />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-48 text-gray-700 text-sm font-bold text-right" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder=""
            value={data?.email}
            onChange={(e)=>{handleDataChange(e.target.value,'email')}}
          />
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <label className="w-48 text-gray-700 text-sm font-bold text-right m" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder=""
            value={data?.password}
            onChange={(e)=>{handleDataChange(e.target.value,'pwd')}}
          />
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <label className="w-48 text-gray-700 text-sm font-bold text-right m" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            value={data?.confirmPassword}
            placeholder=""
          onChange={(e)=>{handleDataChange(e.target.value,'confirmPassword')}}
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

export default Register;
