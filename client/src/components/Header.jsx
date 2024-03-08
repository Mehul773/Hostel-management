import { useContext, useState } from "react";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import BeforeLoginNavBtns from "./BeforeLoginNavBtns";
import AccountantNavbar from "./AccountantSidebar";
import StudentSidebar from "./StudentSidebar";
import RectorSidebar from "./RectorSidebar";

function Header() {
  const { user } = useContext(UserContext);
  const [menuButtonToggel, setMenuButtonToggel] = useState(false);

  function menuToggel() {
    let list = document.querySelector("ul");

    // For menu button -> close button
    menuButtonToggel === true
      ? (setMenuButtonToggel(false), list.classList.remove("top-[56px]"))
      : (setMenuButtonToggel(true),
        list.classList.add("top-[56px]"),
        list.classList.add("opacity-100"));
  }

  return (
    <>
      {!user && (
        <div className="sticky py-2 shadow-md bg-bg_dark_section">
          <header className="flex justify-between items-center">
            <div className="flex justify-between items-center my-1">
              <Link
                to={"/"}
                className="flex items-center gap-2 cursor-pointer px-2"
              >
                <img
                  className="p-1 h-10 w-10 border-2 border-bg_white bg-bg_white rounded-full"
                  src={logo}
                  alt=""
                />
                <span className="text-lg font-semibold text-bg_white_font">
                  APC Nadiad
                </span>
              </Link>
            </div>
            <div className="mx-3">
              <a
                className="py-2 px-4 bg-bg_white rounded-md hover:bg-bg_red hover:text-bg_white_font duration-200"
                href={"/login"}
              >
                Log in
              </a>
            </div>
            {/* <BeforeLoginNavBtns /> */}
          </header>
        </div>
      )}
    </>
  );
}

export default Header;
