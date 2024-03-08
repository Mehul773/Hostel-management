import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import * as myConstants from "../../../myConstants";
import axios from "axios";

function ViewPopUp({ report, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  async function markAsRead(event) {
    event.stopPropagation();
    var a = confirm("Do you want to mark it as read? ");
    if (a) {
      await axios.delete("/report/delete-report/" + report._id).then((res) => {
        if (res.status === 200) {
          setFetch(true);
          setIsModalOpen(false);
          toast.success("Deleted Successfully");
        }
      });
    }
  }

  return (
    <>
      <>
        {report.author && (
          <div key={report._id} onClick={openModal}>
            <div className="flex justify-between bg-bg_report rounded-sm p-1 mx-6 cursor-pointer relative ">
              <div className="mr-5 min-w-[125px]">
                From: {report.author.rollNo}
              </div>
              <div className="flex-1 truncate max-w-2xl ">{report.title}</div>
              <div>{format(new Date(report.updatedAt), "dd-MM-yyyy")}</div>
            </div>
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-96 bg-bg_white relative text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2">
                  <div
                    className="absolute  top-4 right-4 hover:text-green-500"
                    onClick={markAsRead}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex justify-start gap-3 items-center">
                    <span className="font-semibold">From:</span>{" "}
                    {report.author.rollNo}
                    <div className="flex gap-3 items-center">
                      <span className="text-xl">{report.author.name}</span>
                      <img
                        className="w-12  aspect-square object-cover rounded-full"
                        src={
                          myConstants.BACKEND_URL +
                          "/uploads/" +
                          report.author.profilePhoto
                        }
                      />{" "}
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="font-semibold">Subject:</span>{" "}
                    {report.title}
                  </div>
                  <div className="w-full">
                    <span className="font-semibold">Description:</span>{" "}
                    {report.description}
                  </div>
                  {report.photo && (
                    <div className="w-full">
                      <img
                        className="w-full aspect-square object-cover"
                        src={
                          myConstants.BACKEND_URL +
                          "/uploadsReport/" +
                          report.photo
                        }
                      />
                    </div>
                  )}
                  <div className="flex justify-center gap-2 w-full">
                    <button onClick={closeModal} className="btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </>
  );
}

export default ViewPopUp;
