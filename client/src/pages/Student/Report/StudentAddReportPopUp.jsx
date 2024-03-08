import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../../UserContext";

function StudentAddReportPopUp({ setFetch }) {
  const [title, setTitle] = useState("");
  const [receiver, setReceiver] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function addReport(ev) {
    ev.preventDefault();
    if (title == "" || receiver == "" || description === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("title", title);
        formData.append("receiver", receiver);
        formData.append("description", description);

        await axios
          .post("/report/add-report", formData, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Added Successfully");
              setIsModalOpen(false);
              setTitle("");
              setDescription("");
              setReceiver("");
              setPhoto("");
              setFetch(true);
            }
          });
      } catch (err) {
        if (err.response.status === 409) toast.error("Report already exists");
        console.log(err);
      }
    }
  }
  return (
    <div>
      <ToastContainer />
      <div
        onClick={openModal}
        className="bg-bg_red text-bg_white_font w-40 justify-center rounded-lg flex gap-2 p-2 font-bold mx-auto my-4 hover:bg-bg_dark_section cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add report
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
            onSubmit={addReport}
          >
            <div className="text-xl mb-4 font-bold">Add Report</div>

            <div className="w-full flex gap-2">
              <span className="font-semibold">To:</span>
              <select
                value={receiver}
                className="w-full border-black border rounded-sm"
                onChange={(ev) => {
                  if (ev.target.value === "Select receiver") {
                    setReceiver("");
                  } else {
                    setReceiver(ev.target.value);
                  }
                }}
              >
                <option>Select receiver</option>
                <option>Accountant</option>
                <option>Rector</option>
              </select>
            </div>

            <div className="w-full">
              <span className="font-semibold">Subject:</span>{" "}
              <input
                type="text"
                value={title}
                onChange={(ev) => {
                  setTitle(ev.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <span className="font-semibold">Description:</span>{" "}
              <textarea
                type="text"
                value={description}
                onChange={(ev) => {
                  setDescription(ev.target.value);
                }}
              />
            </div>

            <label className="flex flex-col w-full">
              <div className="">
                <div className="flex items-center  gap-4">
                  <div className="font-semibold">
                    Upload&nbsp;item&nbsp;photo
                  </div>
                  <div className="grow">
                    <input
                      type="file"
                      onChange={(ev) => {
                        setPhoto(ev.target.files[0]);
                      }}
                      name="photo"
                      className="hidden mt-1 mb-2"
                    />
                    <div className="mt-1 bg-bg_red hover:bg-bg_dark_section w-full p-1 rounded-md py-2 px-4 text-bg_white flex justify-center items-center cursor-pointer hover:scale-95 hover:transition-all duration-75">
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
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="truncate w-40 mx-auto mt-2">
                  {photo && photo.name}
                </div>
              </div>
            </label>
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
    </div>
  );
}

export default StudentAddReportPopUp;
