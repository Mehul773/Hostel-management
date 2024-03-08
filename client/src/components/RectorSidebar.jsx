import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import user from "../assets/user.png";
import selected_user from "../assets/selected_user.png";
import food from "../assets/food.png";
import selected_food from "../assets/selected_food.png";
import home from "../assets/home.png";
import selected_home from "../assets/selected_home.png";
import report from "../assets/report.png";
import selected_report from "../assets/selected_report.png";
import room from "../assets/room.png";
import selected_room from "../assets/selected_room.png";
import food_menu from "../assets/food_menu.png";
import selected_food_menu from "../assets/selected_food_menu.png";
import notice from "../assets/notice.png";
import selected_notice from "../assets/selected_notice.png";
import logout from "../assets/logout.png";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";

const RectorSidebar = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const { setUser } = useContext(UserContext);

  /* LOGOUT */
  async function logoutHandle(ev) {
    ev.preventDefault();
    await axios.post("/logout");
    setUser(null);
  }

  return (
    <>
      <div className="sticky top-0 h-screen mr-4">
        <div
          className={`${
            open ? "w-60" : "w-20"
          } duration-300 h-screen p-5 pt-8 bg-bg_dark_section relative`}
        >
          <div
            className={`absolute cursor-pointer rounded-full -right-3 border-2 top-16 w-7 border-bg_dark_section bg-white text-bg_dark_section ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="flex gap-x-3 items-center ml-2 cursor-pointer">
            <img
              className={`h-6 border-2 border-bg_white bg-bg_white rounded-xl duration-500 ${
                open && "rotate-[360deg]"
              }`}
              src={logo}
              alt=""
            />
            <h1
              className={`text-lg font-semibold text-bg_white_font duration-300 origin-left hover:text-[#D90368] ${
                !open && "hidden"
              }`}
            >
              APC&nbsp;Nadiad
            </h1>
          </div>
          <ul className="pt-10">
            <Link
              to={"/rector/profile"}
              onClick={() => setSelectedItem("profile")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "profile"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "profile" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_user}
                />
              ) : (
                <img className="h-6" src={user} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "profile"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                My&nbsp;profile
              </span>
            </Link>

            <Link
              to={"rector/home"}
              onClick={() => setSelectedItem("home")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "home"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "home" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_home}
                />
              ) : (
                <img className="h-6" src={home} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "home"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              to="/rector/allfoods"
              onClick={() => setSelectedItem("foodMenu")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "foodMenu"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "foodMenu" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_food_menu}
                />
              ) : (
                <img className="h-6" src={food_menu} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "foodMenu"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Food&nbsp;Menu
              </span>
            </Link>

            <Link
              to="/rector/addmeal"
              onClick={() => setSelectedItem("todayMeal")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "todayMeal"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "todayMeal" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_food}
                />
              ) : (
                <img className="h-6" src={food} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "todayMeal"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Today's&nbsp;Meal
              </span>
            </Link>
            <Link
              to={"/rector/allocate-blocks"}
              onClick={() => setSelectedItem("roomAllocation")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "roomAllocation"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "roomAllocation" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_room}
                />
              ) : (
                <img className="h-6" src={room} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "roomAllocation"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Room&nbsp;allocation
              </span>
            </Link>

            <Link
              to={"/rector/allnotices"}
              onClick={() => setSelectedItem("notice")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "notice"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "notice" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_notice}
                />
              ) : (
                <img className="h-6" src={notice} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "notice"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Notice
              </span>
            </Link>
            <Link
              to={"/rector/report"}
              onClick={() => setSelectedItem("report")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "report"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "report" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_report}
                />
              ) : (
                <img className="h-6" src={report} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "report"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Report
              </span>
            </Link>
            <li
              onClick={logoutHandle}
              className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75 rounded-md"
            >
              <img className="h-6" src={logout} />
              <span className={`${!open && "hidden"} origin-left duration-500`}>
                Log&nbsp;out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RectorSidebar;
