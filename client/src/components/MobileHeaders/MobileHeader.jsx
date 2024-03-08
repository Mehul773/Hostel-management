import { useContext, useState } from "react";
import { UserContext } from "../../../UserContext";
import RectorMobileHeader from "./RectorMobileHeader";
import AccountantMobileHeader from "./AccountantMobileHeader";
import StudentMobileHeader from "./StudentMobileHeader";

function SideBar() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.role === "Rector" && <RectorMobileHeader />}
      {user && user.role === "Accountant" && <AccountantMobileHeader />}
      {user && user.role === "Student" && <StudentMobileHeader />}
    </>
  );
}

export default SideBar;
