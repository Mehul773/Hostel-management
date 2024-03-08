import React, { useContext, useState } from "react";
import { UserContext } from "../../../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function EditNoticePopUp({ notice }) {
  const [title, setTitle] = useState(notice.title);
  const [description, setDescription] = useState(notice.description);
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

  async function editNotice(ev) {
    ev.preventDefault();
    if (title === "" || description === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        await axios
          .put(`/notice/edit-notice/${notice._id}`, {
            title,
            description,
            author: notice.author,
            editor_id: user._id,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Updated Successfully");
              setIsModalOpen(false);
            }
          });
      } catch (error) {
        if (error.response.status === 401) {
          console.log("jiiii");
          toast.error("You can't change this notice");
          setIsModalOpen(false);
        }
        if (error.response.status === 404) toast.error("Notice not found");
        console.log(error);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        onClick={openModal}
        className="hidden group-hover:block absolute bottom-3 left-3 bg-bg_dark_font bg-opacity-40 text-white p-1 rounded-xl hover:bg-bg_red cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
            onSubmit={editNotice}
          >
            <div className="text-xl mb-4 font-medium">Edit Notice</div>

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
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditNoticePopUp;
