import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import Loader from "../../../components/Loader";
import axios from "axios";
import { format } from "date-fns";
import * as myConstants from "../../../../myConstants";
import { Navigate } from "react-router-dom";

function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/notice/get-notices").then((res) => {
      const sortedNotices = res.data.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      setNotices(sortedNotices);
      setLoading(false);
    });
  }, [notices]);

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-center mb-6 text-2xl font-bold labels mt-4 mx-4">
        All notices
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-2 mx-6">
        {notices.length > 0 &&
          notices.map((notice) => (
            <div
              key={notice._id}
              className="flex flex-col gap-2 bg-bg_notice m-1 rounded-lg p-2  relative group break-words justify-between"
            >
              <div>
                <div className="flex justify-between">
                  <span className="font-bold">{notice.title}</span>
                  <div className="flex gap-1 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>

                    <span>
                      {format(new Date(notice.updatedAt), "dd-MM-yyyy")}
                    </span>
                  </div>
                </div>
                <hr />
                <div>
                  <p>{notice.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-serif">{notice.author.name}</div>
                <div>
                  {notice.author.profilePhoto && (
                    <img
                      className="rounded-full aspect-square object-cover h-10"
                      src={
                        myConstants.BACKEND_URL +
                        "/uploads/" +
                        notice.author.profilePhoto
                      }
                    ></img>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default StudentNotices;
