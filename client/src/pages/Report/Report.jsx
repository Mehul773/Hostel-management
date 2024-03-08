import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import ViewPopUp from "./ViewPopUp";

function Report({ role }) {
  const [fetch, setFetch] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("report/get-reports").then((res) => {
      const sortedReports = res.data.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      setReports(sortedReports);
      setFetch(false);
      setLoading(false);
    });
  }, [fetch]);

  if (!user || (user && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center mb-6 text-2xl font-bold labels mt-4 mx-4">
        All Reports
      </div>
      <div className="flex flex-col gap-2 relative mx-2">
        {reports.length > 0 &&
          reports.map((report) => (
            <ViewPopUp report={report} setFetch={setFetch} />
          ))}
      </div>
    </div>
  );
}

export default Report;
