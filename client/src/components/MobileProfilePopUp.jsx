import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import * as myConst from "../../myConstants";
import logout from "../assets/logout.png";
import axios from "axios";

const ProfileUpdatePopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUser, user } = useContext(UserContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function logoutHandle(ev) {
    ev.preventDefault();
    await axios.post("/logout");
    setUser(null);
  }

  return (
    <>
      <div>
        <span className="flex items-center gap-1">
          <label>
            {user.profilePhoto && (
              <>
                <img
                  src={myConst.BACKEND_URL + "/uploads/" + user.profilePhoto}
                  alt=""
                  className="rounded-full object-cover aspect-square h-[2rem] hover:bg-black hover:opacity-70 cursor-pointer"
                />
              </>
            )}
          </label>
          <svg
            onClick={openModal}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-bg_white cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 content-none"
            onClick={closeModal}
          ></div>
          <div className="fixed top-[70px] right-5 flex items-center justify-center bg-bg_dark_section rounded-lg duration-200 z-10">
            <div className="p-4">
              <div className="flex flex-col items-center gap-2">
                {user.profilePhoto && (
                  <>
                    <img
                      src={
                        myConst.BACKEND_URL + "/uploads/" + user.profilePhoto
                      }
                      alt=""
                      className="rounded-full object-cover aspect-square h-[2rem] hover:bg-black hover:opacity-70 cursor-pointer"
                    />
                  </>
                )}
                <span className="text-bg_white">{user.name}</span>
              </div>
              <div className="h-[2px] my-2 bg-bg_white"></div>
              <ul>
                <li
                  onClick={logoutHandle}
                  className="text-white text-sm flex items-center gap-x-2 cursor-pointer mt-6 p-2 hover:scale-105 duration-75"
                >
                  <img className="h-6" src={logout} />
                  <span className={`origin-left underline`}>Log&nbsp;out</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileUpdatePopUp;
