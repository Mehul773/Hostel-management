import { React, useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { UserContext } from "../../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as myConstants from "../../../myConstants";
import axios from "axios";
import AddStudentPopUp from "./AddStudentPopUp";
import Loader from "../../components/Loader";
import roomIcon from "../../assets/room.png";

function StudentsProfile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3; // Number of students to display per page

  useEffect(() => {
    axios.post("/accountant/all-students", { rollNo }).then((res) => {
      setStudents(res.data);
      setLoading(false);
      setFetch(false);
    });
  }, [fetch, rollNo]);

  if (!user || (user && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    students && students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil((students && students.length) / studentsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="flex justify-center mb-6 text-2xl font-bold labels mt-4 mx-4">
        All Students
      </div>
      <AddStudentPopUp fetch={fetch} setFetch={setFetch} />
      <div className="mx-6">
        <div className="font-semibold">Search student</div>
        <input
          type="text"
          id="rollNo"
          name="rollNo"
          value={rollNo}
          onChange={(ev) => {
            setRollNo(ev.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        {loading && <Loader height={"400px"} />}
        {students && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2 items-center border-2 border-black rounded-lg p-3 mt-4 ml-4 mr-6">
              {currentStudents.map((student) => (
                <div key={student._id}>
                  <div className="flex flex-col sm:flex-row lg:flex-col items-center border-2 border-gray-400 rounded-md p-2">
                    <div className="">
                      {
                        <img
                          className="aspect-square object-cover h-20 md:h-32 lg:h-32 border-2 border-gray-400 rounded-md"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploads/" +
                            student.profilePhoto
                          }
                          alt="Profile"
                        />
                      }
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1 mx-3 mt-1">
                      <div className="text-base md:text-2xl lg:text-2xl font-medium mx-auto">
                        {student.name}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex gap-2 items-center labels_2 w-fit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                          {student.rollNo}
                        </div>
                        {student.blockId && student.roomNumber && (
                          <div className="flex gap-2 items-center labels_3">
                            <img className="h-4" src={roomIcon} alt="Room" />
                            {student.blockId.name}-{student.roomNumber}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex gap-2 items-center labels_2 w-fit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                          </svg>
                          {student.phone}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center labels_3 w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        {student.email}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {students && students.length > studentsPerPage && (
          <div className="flex justify-center mt-4">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === pageNumber
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

export default StudentsProfile;
