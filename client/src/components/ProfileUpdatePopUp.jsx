import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ProfileUpdatePopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function updateUser(ev) {
    ev.preventDefault();
    if (name === "" || phone === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        await axios
          .put(`/update-profile/${user._id}`, {
            name,
            phone,
          })
          .then((res) => {
            if (res.status == 200) {
              setIsModalOpen(false);
              window.location.reload(false);
            } else if (res.status === 404) {
              toast.error("User not found");
            }
          });
      } catch (err) {}
    }
  }

  return (
    <>
      
      <button onClick={openModal} className="btn">
        Edit Profile
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={updateUser}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(ev) => {
                    setName(ev.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="name"
                  name="phone"
                  value={phone}
                  onChange={(ev) => {
                    setPhone(ev.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={closeModal}
                  className="w-full bg-bg_red rounded-md py-2.5 px-4 text-bg_white  hover:scale-95 hover:bg-bg_dark_red duration-200"
                >
                  Close
                </button>
                <button className="btn hover:bg-bg_dark_section">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileUpdatePopUp;
