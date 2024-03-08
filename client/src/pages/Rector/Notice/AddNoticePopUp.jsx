import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../../UserContext";

function AddNoticePopUp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Rector" && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function addNotice(ev) {
    ev.preventDefault();
    if (title == "" || description == null) {
      toast.error("Please fill all fields");
    } else {
      try {
        axios
          .post("/notice/add-notice", {
            title,
            description,
            author:user._id,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Added Successfully");
              setIsModalOpen(false);
              setTitle("");
              setDescription("");
            }
          });
      } catch (err) {
        if (err.response.status === 409) toast.error("Food already exists");
        console.log(err);
      }
    }
  }
  return (
    <>
      <div className="flex  w-full justify-center mb-3 ">
        <div
          className="flex justify-center items-center gap-2 bg-bg_red text-bg_white hover:scale-95 hover:transition-all hover:duration-200 px-2 py-1 rounded-lg cursor-pointer"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <div className="font-semibold">Add Notice</div>
        </div>
      </div>
     { isModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form
          className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
          onSubmit={addNotice}
        >
          <div className="text-xl mb-4 font-medium">Add Notice</div>

          <div className="w-full">
            Title
            <input
              type="text"
              value={title}
              className="mt-1 mb-2"
              onChange={(ev) => {
                setTitle(ev.target.value);
              }}
              name="name"
              placeholder="Enter title"
            />
          </div>
          <div className="w-full">
            Description
            <textarea
              value={description}
              className="mt-1 mb-2"
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
              name="name"
              placeholder="Enter description"
            />
          </div>

          
          <div className="flex justify-center gap-2 w-full">
            <button onClick={closeModal} className="btn">
              Close
            </button>
            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
      )}
    </>
  );
}

export default AddNoticePopUp;
