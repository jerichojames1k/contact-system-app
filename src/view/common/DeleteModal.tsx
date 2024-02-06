import React from "react";
export interface IDleteModal{
  handleClose?:(data:boolean)=>void
  handleDelete?:()=>void
}
const DeleteModal: React.FC<any> = props => {
  const {handleClose,handleDelete}=props ?? {}
  const handleExit=()=>{
    handleClose()
  }
  const handleRemove=()=>{
    handleDelete()
  }
  return (
    <div
    data-te-modal-init
    className='fixed left-0 top-0 z-[1055] h-full w-full outline-none  bg-slate-700 bg-opacity-75'
    id='exampleModalCenter'
    aria-labelledby='exampleModalCenterTitle'
    aria-modal='true'
    role='dialog'
  >
    <div className="flex flex-col items-center justify-center h-screen ">
      <form className="flex flex-col space-y-4 bg-white shadow-current border border-none outline outline-offset-1 outline-2  rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-auto">
      <div className="relative">Are you sure you want to DELETE</div>
      <div className="flex items-center space-x-4 justify-between">
        <button
          className="text-black border border-black hover:bg-blue-700 hover:text-white  font-bold py-2 px-4 w-1/2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleExit}
        >
          No
        </button>
        <button
          className="text-black border border-black hover:bg-red-500  hover:text-white font-bold py-2 px-4 w-1/2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleRemove}
        >
          Yes
        </button>
      </div>
      </form>

      </div>
    </div>
  );
};

export default DeleteModal;
