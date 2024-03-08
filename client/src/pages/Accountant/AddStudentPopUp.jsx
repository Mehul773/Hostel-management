import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

function AddStudentPopUp({ fetch, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    axios.get("/accountant/getrollno").then((res) => {
      setRollNo(res.data.current);
    });
  }, [fetch]);

  if (!user || (user && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  if (!rollNo) {
    return <Loader />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function addStudent(ev) {
    ev.preventDefault();
    if (email === "" || password === "" || phone === "" || name === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        await axios
          .post("/accountant/createstudent", {
            name,
            email,
            phone,
            password,
            rollNo,
          })
          .then((res) => {
            if (res.status === 200) {
              axios.get("/accountant/allocaterollno");
              setFetch(true);
              setIsModalOpen(false);
              setName("");
              setEmail("");
              setPassword("");
              setPhone("");
              toast.success("Successfully created");
            } else {
              toast.error("Failed to create student");
            }
          })
          .catch((err) => {
            toast.error("Failed to create student");
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <div className="flex justify-center mx-auto w-full">
        <button
          className="flex items-center gap-2 mb-6  bg-bg_red px-4 py-1 text-bg_white_font rounded-md hover:bg-bg_dark_section duration-200"
          onClick={openModal}
        >
          <div className="text-4xl">+</div>
          <div className="font-bold">Add Student</div>
        </button>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow w-96">
              <form onSubmit={addStudent}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 "
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(ev) => {
                      setName(ev.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Eamil:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(ev) => {
                      setPassword(ev.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Phone"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(ev) => {
                      setPhone(ev.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rollNo"
                  >
                    Roll No:
                  </label>
                  <input
                    disabled
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
                <div className="flex justify-center gap-2">
                  <button
                    onClick={closeModal}
                    className="w-full bg-bg_red rounded-md py-2.5 px-4 text-bg_white  hover:scale-95 hover:bg-bg_dark_red duration-200"
                  >
                    Close
                  </button>
                  <button className="btn hover:bg-bg_dark_section">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStudentPopUp;
