import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await axios
        .post(`/reset-password/${token}`, {
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Password reset successfully");
            setRedirect(true);
          } else {
            toast.error("Provide correct email or request again");
          }
        });
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Provide correct email or request again");
    }
  };

  return (
    <>
      <Header />
      <div className="give-height flex justify-center items-center mt-24 text-bg_white_font font-semibold text-sm">
        <form
          onSubmit={handleResetPassword}
          className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
        >
          <div className="text-xl mb-4">Reset Password</div>

          <div className="w-full">
            <div className="flex">
              <div className="grow">New Password</div>
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
          <div>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              className="mt-1 mb-2"
              onChange={(ev) => {
                setConfirmPassword(ev.target.value);
              }}
              name="confirmPassword"
              placeholder="Repeat the password"
            />
          </div>

          <button type="submit" className="btn">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
