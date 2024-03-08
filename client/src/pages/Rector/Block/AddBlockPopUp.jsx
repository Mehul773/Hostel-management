import React, { useContext, useState } from "react";
import { UserContext } from "../../../../UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddBlockPopUp({ fetch, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [capacity, setCapacity] = useState(0);

  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

  const openModal = () => {
    setName("");
    setStart(0);
    setEnd(0);
    setCapacity(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function addBlock(ev) {
    ev.preventDefault();
    if (start > end) {
      toast.error("Provide correct range of rooms");
    } else if (capacity === 0) {
      toast.error("Please provide the capacity for the rooms.");
    } else {
      axios
        .post("/rector/allocate-block", { name, start, end, capacity })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Block added");
            setFetch(true);
            setIsModalOpen(false);
          } else {
            toast.error("Block already exists");
          }
        });
    }
  }

  return (
    <>
      <div className="" onClick={openModal}>
        <div className="rounded-2xl object-cover aspect-square mb-2 border-2 border-bg_dark_section hover:bg-bg_dark_section hover:text-bg_white">
          <div className="flex justify-center items-center h-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
            onSubmit={addBlock}
          >
            <div className="text-xl mb-4">Add Block</div>

            <div className="w-full">
              Block name
              <input
                type="text"
                value={name}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
                name="name"
                placeholder="Enter block name"
              />
            </div>
            <div className="w-full">
              Starting room number
              <input
                type="number"
                value={start}
                className="mt-1 mb-2"
                min={0}
                onChange={(ev) => {
                  setStart(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number starting"
              />
            </div>
            <div className="w-full">
              Ending room number
              <input
                type="number"
                value={end}
                min={0}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setEnd(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number end"
              />
            </div>
            <div className="w-full">
              Default Capacity of room
              <input
                type="number"
                value={capacity}
                min={0}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setCapacity(ev.target.value);
                }}
                name="name"
                placeholder="Enter room number end"
              />
            </div>

            <div className="flex justify-center gap-2 w-full">
              <button onClick={closeModal} className="btn">
                Close
              </button>
              <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddBlockPopUp;
