import React, { useContext, useState } from "react";
import { UserContext } from "../../../../UserContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../components/Loader";

function AddStudentPopup({
  blockId,
  roomNo,
  room,
  AllocatedRoomStudents,
  capacity,
  setFetch,
  setAllocatedRoomStudents,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rollNo, setRollNo] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [loading,setLoading] = useState(false);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function addStudent(ev) {
    ev.preventDefault();
    closeModal();
    setLoading(true)
    axios
      .post("/rector/allocate-student/" + blockId, {
        rollNo,
        roomNumber: roomNo,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false)
          toast.success("Student allocated successfully");
          setRollNo("");
          setAllocatedRoomStudents(res.data.roomInfo.allocatedStudents);
          setFetch(true);
        }
      });
  }

  
  return (
    <>
      <ToastContainer />
      {AllocatedRoomStudents.length < capacity && (
        <div
        onClick={openModal}
        className="flex justify-center h-full text-2xl items-center border-2 border-gray-400 rounded-md p-2 cursor-pointer hover:bg-gradient-to-t hover:from-gray-300 hover:to-gray-100"
        >
          {loading && (<Loader height={"200px"} />)}
          {!loading && "+"}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
            onSubmit={addStudent}
          >
            <div className="text-xl mb-4">Add Student</div>

            <div className="w-full">
              Roll Number
              <input
                type="text"
                value={rollNo}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setRollNo(ev.target.value);
                }}
                name="rollNo"
                placeholder="Enter Student Roll number"
              />
            </div>
            <div className="flex justify-center gap-2 w-full">
              <button onClick={closeModal} className="btn">
                Close
              </button>
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-95 hover:duration-200 hover:transition-all"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddStudentPopup;
