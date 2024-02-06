import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou: React.FC = () => {
  const navigate=useNavigate()
  const handClick=()=>{
    navigate("/contact")
  }
  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-screen">
      <div className="text-4xl font-normal">Thank you for registering</div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
