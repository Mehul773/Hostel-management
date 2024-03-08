import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../../UserContext";
import * as myConstants from "../../../../myConstants";

function EditFoodPopUp({ food }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(food.name);
  const [photo, setPhoto] = useState(food.photo);
  const [fromDB, setFromDB] = useState(true);

  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function updateFood(ev) {
    ev.preventDefault();
    if (name == "" || photo == null) {
      toast.error("Please fill all fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);

        await axios
          .put("/food/edit-food/" + id, formData, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Updated Successfully");
              setIsModalOpen(false);
            }
          });
      } catch (err) {
        if (err.response.status === 409) toast.error("User already exists");
        console.log(err);
      }
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        className="absolute bottom-9 left-1 bg-bg_dark_font bg-opacity-80 text-white p-1 rounded-xl hover:bg-bg_red cursor-pointer"
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
          <div className="">
            <form
              className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
              onSubmit={updateFood}
            >
              <div className="text-xl mb-4">Edit Food item</div>

              <div className="w-full">
                Item name
                <input
                  type="text"
                  value={name}
                  className="mt-1 mb-2"
                  onChange={(ev) => {
                    setName(ev.target.value);
                  }}
                  name="name"
                  placeholder="Enter food item name"
                />
              </div>

              <label className="flex flex-col w-full">
                <div className="flex items-center gap-4">
                  <div>
                    Upload&nbsp;item&nbsp;photo
                    <input
                      type="file"
                      onChange={(ev) => {
                        setPhoto(ev.target.files[0]);
                        setFromDB(false);
                      }}
                      name="photo"
                      className="hidden mt-1 mb-2"
                    />
                  </div>
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
              </label>
              {photo && fromDB && (
                <div className="grid">
                  <img
                    className="aspect-square object-cover h-60 w-60"
                    src={myConstants.BACKEND_URL + "/uploadsFood/" + photo}
                  ></img>
                  <div className="truncate w-40 mx-auto mt-2">{photo}</div>
                </div>
              )}
              {photo && !fromDB && (
                <div className="truncate w-40 mx-auto mt-2">{photo}</div>
              )}
              <div className="flex justify-center gap-2 w-full">
                <button onClick={closeModal} className="btn">
                  Close
                </button>
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditFoodPopUp;
