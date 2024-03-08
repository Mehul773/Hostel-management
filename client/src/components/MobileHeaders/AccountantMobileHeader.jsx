import React, { useContext, useState } from "react";
// import * as myConst from "../../myConstants";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import User from "../../assets/user.png";
import student from "../../assets/stdnt.png";
import home from "../../assets/home.png";
import report from "../../assets/report.png";
import fine from "../../assets/fine.png";
import notice from "../../assets/notice.png";
import logout from "../../assets/logout.png";
import MobileProfilePopup from "../MobileProfilePopUp";

function AccountantMobileHeader() {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuButtonToggel, setMenuButtonToggel] = useState(false);

  function menuToggel() {
    let list = document.querySelector("ul");
    setOpen((open) => !open);

    // For menu button -> close button
    menuButtonToggel === true
      ? setMenuButtonToggel(false)
      : setMenuButtonToggel(true);
  }

  return (
    <>
      {user && (
        <>
          <nav className="p-4 bg-bg_dark_section shadow">
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <span className="text-3xl cursor-pointer block">
                  {menuButtonToggel ? (
                    <span
                      className="text-3xl cursor-pointer block"
                      onClick={menuToggel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-bg_white_font"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-3xl cursor-pointer md:hidde block`}
                        onClick={menuToggel}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-bg_white_font"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </span>
                    </>
                  )}
                  <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
                </span>
                <Link
                  to={"/"}
                  className="flex items-center gap-2 cursor-pointer px-4"
                >
                  <img
                    className="h-6 w-6 border-2 border-bg_white bg-bg_white rounded-full"
                    src={logo}
                    alt=""
                  />
                  <span className="text-lg font-semibold text-bg_white_font">
                    APC Nadiad
                  </span>
                </Link>
              </div>
              <div className="mx-1">
                <MobileProfilePopup />
              </div>
            </div>
          </nav>
          {open && (
            <div>
              <ul
                className={`absolute bg-bg_dark_section w-1/2 pl-7 h-screen transition-all ease-in z-10`}
              >
                <Link
                  to={"/accountant/profile"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 mt-4 rounded-md`}
                >
                  <img className="h-6" src={User} />
                  <span className="text-bg_white">My&nbsp;profile</span>
                </Link>
                <li
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={home} />
                  <span className="text-bg_white">Home</span>
                </li>
                <Link
                  to={"/accountant/students"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={student} />
                  <span className="text-bg_white">Student&nbsp;Info</span>
                </Link>
                <li
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={fine} />
                  <span className="text-bg_white">Fine</span>
                </li>
                <Link
                  to={"/accountant/report"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={report} />
                  <span className="text-bg_white">Report</span>
                </Link>
                <Link
                  to={"/accountant/allnotices"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={notice} />
                  <span className="text-bg_white">Notice</span>
                </Link>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AccountantMobileHeader;
