import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../UserContext";
import axios from "axios";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";
import AddNoticePopUp from "./AddNoticePopUp";
import EditNoticePopUp from "./EditNoticePopUp";
import * as myConstants from "../../../../myConstants";

function AllNotices() {
  const [notices, setNotices] = useState([]);
  const { user, setUser } = useContext(UserContext);
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

  if (!user || (user && user.role !== "Rector" && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  async function deleteNotice(id) {
    try {
      var a = confirm("Do you want to delete? ");
      if (a) {
        await axios
          .delete(`/notice/delete-notice/${id}`, {
            data: { editor_id: user._id },
          })

          .then((res) => {
            if (res.status === 200) {
              toast.success("Deleted Successfully");
            }
          });
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("jiiii");
        toast.error("You can't delete this notice");
        setIsModalOpen(false);
      }
      if (error.response.status === 404) toast.error("Notice not found");
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center mb-6 text-2xl font-bold labels mt-4 mx-4">
        All notices
      </div>

      <AddNoticePopUp />

      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-2 mx-6">
        {notices.length > 0 &&
          notices.map((notice) => (
            <>
              <div
                key={notice._id}
                className="flex flex-col gap-2 justify-between bg-bg_notice m-1 rounded-lg p-2 relative group break-words"
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

                <div className="hidden group-hover:block absolute bottom-3 right-3 bg-bg_dark_font bg-opacity-40 text-white p-1 rounded-xl hover:bg-bg_red cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                    onClick={(ev) => {
                      deleteNotice(notice._id);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <EditNoticePopUp notice={notice} />
                <div className="flex justify-between items-center ">
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
            </>
          ))}
      </div>
    </>
  );
}

export default AllNotices;
