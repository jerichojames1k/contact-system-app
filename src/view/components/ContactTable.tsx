import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import axios from "../../api/axios";
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Cookies from 'js-cookie';
import useAuth from "../../hooks/useAuth";
const ContactTable: React.FC = () => {
  const {  auth } = useAuth() as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, showDeleteModal] = useState<Boolean>(false);
  const [contactData, setContactData] = useState<any>();
  const [dataId, setDataId] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [err, setErrMsg] = useState<string>("");
  const handleInputChange = async (e: any) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axios.post(
        "/contact/search",
        JSON.stringify({ searchTerm: e.target.value,userId:auth?.userId}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setContactData(response?.data);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };

  const handleClearClick = async () => {
    try {
      const response = await axios.post(
        "/contact/search",
        JSON.stringify({ searchTerm: "" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setContactData(response?.data);
      setSearchTerm("");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  const handleEdit = (id?: string, data?: Object) => {
    navigate("/contact/edit?mode=" + (id ? "edit" : "insert") + "&id=" + id, {
      state: data,
    });
  };

  const handleGetContacts = async () => {
    try {
      const response = await axiosPrivate.post("/contact", JSON.stringify({userId:auth?.userId}), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setContactData(response?.data);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  const handleClose = () => {
    showDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.post(
        "/contact/delete",
        JSON.stringify({ id: dataId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (Object.keys(response ?? {}).length) {
        showDeleteModal(false);
        handleGetContacts();
        return;
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };

  const handleShowDeleteModal = (id: string) => {
    setDataId(id);
    showDeleteModal(true);
  };



  const logout = useLogout();

  const signOut = async () => {
    await logout();
     navigate("/signIn");
  };
  useEffect(() => {
    handleGetContacts();
  }, [auth?.userId]);

  
  return (
    <div>
      {deleteModal && (
        <DeleteModal handleClose={handleClose} handleDelete={handleDelete} />
      )}
      <div className="flex flex-col space-y-4 items-center justify-center h-screen">
        <div className="flex flex-row justify-between">
          <div className="relative text-2xl right-28">Contacts</div>
          <div className="relative flex flex-row space-x-0.5 left-28">
            <p
              className="text-blue-500 underline"
              onClick={() => {
                handleEdit();
              }}
            >
              Add Contact
            </p>
            <p>|Contacts|</p>
            <p onClick={signOut} className="text-blue-500 underline">
              Logout
            </p>
          </div>
        </div>

        <div className="flex relative left-36">
          <input
            type="text"
            className="block w-full italic border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm leading-5 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {searchTerm && (
            <button
              onClick={handleClearClick}
              className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent text-gray-600 hover:text-gray-800"
            >
              <CiCircleRemove className="w-6 h-6" />
            </button>
          )}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearch />
          </div>
        </div>

        <table className="abosolute border-collapse border border-solid  text-left">
          <caption className="caption-bottom mt-5">
            <div className="flex items-center space-x-4 justify-center">
              <span className="text-base text-blue-500 underline">1</span> <p>|</p>
              <span className="">2</span> <p>|</p>
              <span className="">3</span> <p>|</p>
              <span className="text-base text-blue-500 underline">Next</span>
            </div>
          </caption>
          <thead className="bg-gray-200">
            <tr className="">
              <th className="border border-black ...">NAME</th>
              <th className="border border-black ...">COMPANY</th>
              <th className="border border-black ...">PHONE</th>
              <th className="border border-black ...">EMAIL</th>
              <th className="border border-black ...">{""}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(contactData ?? []).length ? (
              contactData.map((item: any) => {
                return (
                  <tr key={item?.id}>
                    <td className="border border-slate-700 ...">
                      {item?.name}
                    </td>
                    <td className="border border-slate-700 ...">
                      {item?.company}
                    </td>
                    <td className="border border-slate-700 ...">
                      {item?.phone}
                    </td>
                    <td className="border border-slate-700 ...">
                      {item?.email}
                    </td>
                    <td className="border border-slate-700 ...">
                      <div className="flex flex-row space-x-2">
                        <p
                          className={"hover:text-blue-300"}
                          onClick={() => {
                            handleEdit(item?.id, item);
                          }}
                        >
                          Edit
                        </p>
                        <p className="text-base">|</p>
                        <p
                          className={"hover:text-blue-300"}
                          onClick={() => {
                            handleShowDeleteModal(item?.id);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-12 border border-black">
                There is no data available
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContactTable;
