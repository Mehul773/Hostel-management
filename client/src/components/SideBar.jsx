import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import AccountantNavbar from "./AccountantSidebar";
import StudentSidebar from "./StudentSidebar";
import RectorSidebar from "./RectorSidebar";

function SideBar() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.role === "Rector" && <RectorSidebar />}
      {user && user.role === "Accountant" && <AccountantNavbar />}
      {user && user.role === "Student" && <StudentSidebar />}
    </>
  );
}

export default SideBar;
