import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import * as myConstants from "../../../../myConstants";

function StudentViewPopUp({ report }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div key={report._id} onClick={openModal}>
        <div className="flex justify-between bg-bg_report rounded-sm p-1 mx-6 cursor-pointer relative ">
          <div className="min-w-[125px]">To: {report.receiver}</div>
          <div className="flex-1  truncate max-w-3xl">{report.title}</div>
          <div>{format(new Date(report.updatedAt), "dd-MM-yyyy")}</div>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-96 bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2">
              <div className="w-full">
                <span className="font-semibold">To:</span> {report.receiver}
              </div>
              <div className="w-full">
                <span className="font-semibold">Subject:</span> {report.title}
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
                      myConstants.BACKEND_URL + "/uploadsReport/" + report.photo
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
    </>
  );
}

export default StudentViewPopUp;
