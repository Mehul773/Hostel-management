import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";
import Header from "../components/Header";
import Loader from "../components/Loader";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  if (user) {
    if (user.role == "Student") {
      return <Navigate to="/student/dashboard" />;
    } else if (user.role == "Rector") {
      return <Navigate to="/rector/home" />;
    } else if (user.role == "Accountant") {
      return <Navigate to="/accountant/dashboard" />;
    }
  }

  async function loginUser(ev) {
    ev.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        await axios
          .post(
            "/login",
            {
              email,
              password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 201) {
              setUser(res.data);
              if (user) {
                if (user.role == "Student") { 
                  return <Navigate to="/student/dashboard" />;
                } else if (user.role == "Rector") {
                  return <Navigate to="/rector/dashboard" />;
                } else if (user.role == "Accountant") {
                  return <Navigate to="/accountant/dashboard" />;
                }
              }
            }
          });
      } catch (err) {
        if (err.response.status === 401)
          toast.error("Provide correct credentials");
        else if (err.response.status === 404)
          toast.error("User does not exists");
        console.log(err);
      }
    }
  }

  async function handleForgotPassword(ev) {
    ev.preventDefault();
    setLoading(true);
    if (email === "") {
      toast.error("Please enter your email");
      setLoading(false);
    } else {
      try {
        await axios.post("/forgot-password", { email: email }).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toast.success("Password reset link sent to your email");
            setEmail("");
          }
        });
      } catch (error) {
        toast.error("Could not send link");
      }
    }
  }

  return (
    <>
      <Header />
      <div className="give-height flex justify-center items-center mt-24 text-bg_white_font font-semibold text-sm">
        {loading && <Loader height={"h-[70vh]"} />}
        {!loading && (
          <form
            onSubmit={loginUser}
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
          >
            <div className="text-xl mb-4">Log In</div>

            <div className="w-full">
              Email
              <input
                type="text"
                value={email}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
                name="email"
                placeholder="Enter your email "
              />
            </div>

            <div className="w-full">
              <div className="flex">
                <div className="grow">Password</div>
                <div
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </div>
              </div>
              <input
                type="password"
                value={password}
                className="mt-1 mb-2"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                name="password"
                placeholder="Enter the password"
              />
            </div>

            <button className="btn">Login</button>
          </form>
        )}
      </div>
    </>
  );
}

export default UserLogin;
