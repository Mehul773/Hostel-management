import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentViewPopUp from "./StudentViewPopUp";
import { Navigate } from "react-router-dom";
import StudentAddReportPopUp from "./StudentAddReportPopUp";

function StudentReport() {
  const [fetch, setFetch] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("report/get-report").then((res) => {
      const sortedReports = res.data.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      setReports(sortedReports);
      setFetch(false);
      setLoading(false);
    });
  }, [fetch]);

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <StudentAddReportPopUp setFetch={setFetch} />
      <div className="flex justify-center mb-6 text-2xl font-bold labels mx-4 mt-4">
        All Reports
      </div>
      <div className="flex flex-col gap-2 relative mx-2">
        {reports.length > 0 &&
          reports.map((report) => <StudentViewPopUp report={report} />)}
      </div>
    </>
  );
}

export default StudentReport;
