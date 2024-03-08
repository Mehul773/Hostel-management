import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import * as myContants from "../myConstants";
import IndexPage from "./pages/IndexPage";
import { UserContext, UserContextProvider } from "../UserContext";
import UserLogin from "./pages/UserLogin";
import AccountantDashboard from "./pages/Accountant/AccountantDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddFoodPopUp from "./pages/Rector/Food/AddFoodPopUp";
import AllFoods from "./pages/Rector/Food/AllFoods";
import EditFoodPopUp from "./pages/Rector/Food/EditFoodPopUp";

import StudentProfile from "./pages/Student/StudentProfile";
import RectorProfile from "./pages/Rector/RectorProfile";
import AccountantProfile from "./pages/Accountant/AccountantProfile";

import AddMeal from "./pages/Rector/Meal/AddMeal";
import AllNotices from "./pages/Rector/Notice/AllNotices";

import TodayMeal from "./components/TodayMeal";
import StudentNotices from "./pages/Student/Notice/StudentNotices";

import StudentReport from "./pages/Student/Report/StudentReport";

import StudentsProfile from "./pages/Accountant/StudentsProfile";

import RectorReport from "./pages/Rector/Report/RectorReport";
import AccountantReport from "./pages/Accountant/Report/AccountantReport";

import ResetPassword from "./components/ResetPassword";

import AllocateBlocks from "./pages/Rector/Block/AllocateBlocks";
import BlockPage from "./pages/Rector/Block/BlockPage";
import RectorHome from "./pages/Rector/RectorHome";

axios.defaults.baseURL = myContants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<UserLogin />} />

          <Route path="/rector/home" element={<RectorHome />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route
            path="/accountant/dashboard"
            element={<AccountantDashboard />}
          />

          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/rector/profile" element={<RectorProfile />} />
          <Route path="/accountant/profile" element={<AccountantProfile />} />

          <Route path="/rector/addfood" element={<AddFoodPopUp />} />
          <Route path="/rector/allfoods" element={<AllFoods />} />
          <Route path="/rector/allfoods/:id" element={<EditFoodPopUp />} />
          <Route path="/rector/addmeal" element={<AddMeal />} />

          <Route path="/student/report" element={<StudentReport />} />
          <Route path="/rector/report" element={<RectorReport />} />
          <Route path="/accountant/report" element={<AccountantReport />} />

          <Route path="/rector/allnotices" element={<AllNotices />} />
          <Route path="/accountant/allnotices" element={<AllNotices />} />
          <Route path="/student/notices" element={<StudentNotices />} />

          <Route path="/meal" element={<TodayMeal />} />

          <Route path="/accountant/students" element={<StudentsProfile />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/rector/allocate-blocks" element={<AllocateBlocks />} />
          <Route path="/rector/allocate-blocks/:id" element={<BlockPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
