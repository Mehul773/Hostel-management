import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import * as myConstants from "../../../../myConstants";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllMealPopUp from "./AllMealPopUp";
import Loader from "../../../components/Loader";
import axios from "axios";

function AddMeal() {
  const { user, setUser } = useContext(UserContext);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/meal/get-meal").then((res) => {
      setBreakfast(res.data.breakfast);
      setLunch(res.data.lunch);
      setDinner(res.data.dinner);
      setLoading(false);
    });
  }, []);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <Loader />;
  }

  async function updateMeal() {
    var a = confirm("Do you want to update? ");
    if (a) {
      await axios
        .post("/meal/add-meal/", { breakfast, lunch, dinner })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Updated Successfully");
          }
        });
    }
  }

  return (
    <>
      <div className="flex justify-center mb-6 mt-4">
        <button
          className="flex items-center gap-2 bg-bg_red px-4 py-2 text-bg_white_font rounded-md hover:bg-bg_dark_section duration-200"
          onClick={updateMeal}
        >
          <div className="font-bold">Update Meal</div>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-6 max-w-7xl">
        <div className="border-2 border-bg_dark_section p-4 rounded-md shadow-md shadow-bg_dark_section">
          <div className="mb-6 text-2xl font-bold text-center labels">
            Breakfast
          </div>
          <AllMealPopUp meal={breakfast} setMeal={setBreakfast} />

          <div className="grid grid-cols-3 gap-4">
            {breakfast &&
              breakfast.length > 0 &&
              breakfast.map((food) => (
                <div
                  className="group rounded-md overflow-hidden shadow-lg border-2 border-bg_dark_section"
                  key={food._id}
                >
                  <div className="bg-bg_dark_section aspect-square relative">
                    {food.photo && (
                      <div
                        className="bg-bg_dark_section aspect-square relative cursor-pointer"
                        onClick={() => {
                          var a = confirm("Do you want to remove item ? ");
                          if (!a) {
                            setBreakfast([...meal, food]);
                          } else {
                            setBreakfast(
                              breakfast.filter((item) => item._id !== food._id)
                            );
                          }
                        }}
                      >
                        <img
                          className="object-cover w-full h-full border-b-2 group-hover:opacity-30 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
                        <div className=" absolute hidden group-hover:block text-bg_white_font top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2 className="mx-1 text-xs font-bold my-1 text-center break-words">
                    {food.name}
                  </h2>
                </div>
              ))}
          </div>
        </div>

        <div className="border-2 border-bg_dark_section p-4 rounded-md shadow-md shadow-bg_dark_section">
          <div className="mb-6 text-2xl font-bold text-center labels">
            Lunch
          </div>
          <AllMealPopUp meal={lunch} setMeal={setLunch} />

          <div className="grid grid-cols-3 gap-4">
            {lunch &&
              lunch.length > 0 &&
              lunch.map((food) => (
                <div
                  className="group rounded-md overflow-hidden shadow-lg border-2 border-bg_dark_section"
                  key={food._id}
                >
                  <div className="bg-bg_dark_section aspect-square relative">
                    {food.photo && (
                      <div
                        className="bg-bg_dark_section aspect-square relative cursor-pointer"
                        onClick={() => {
                          var a = confirm("Do you want to remove item ? ");
                          if (!a) {
                            setLunch([...meal, food]);
                          } else {
                            setLunch(
                              lunch.filter((item) => item._id !== food._id)
                            );
                          }
                        }}
                      >
                        <img
                          className="object-cover w-full h-full border-b-2 group-hover:opacity-30 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
                        <div className=" absolute hidden group-hover:block text-bg_white_font top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2 className="mx-1 text-xs font-bold my-1 text-center break-words">
                    {food.name}
                  </h2>
                </div>
              ))}
          </div>
        </div>

        <div className="border-2 border-bg_dark_section p-4 rounded-md shadow-md shadow-bg_dark_section">
          <div className="mb-6 text-2xl font-bold text-center labels">
            Dinner
          </div>
          <AllMealPopUp meal={dinner} setMeal={setDinner} />

          <div className="grid grid-cols-3 gap-4">
            {dinner &&
              dinner.length > 0 &&
              dinner.map((food) => (
                <div
                  className="group rounded-md overflow-hidden shadow-lg border-2 border-bg_dark_section"
                  key={food._id}
                >
                  <div className="bg-bg_dark_section aspect-square relative">
                    {food.photo && (
                      <div
                        className="bg-bg_dark_section aspect-square relative cursor-pointer"
                        onClick={() => {
                          var a = confirm("Do you want to remove item ? ");
                          if (!a) {
                            setDinner([...meal, food]);
                          } else {
                            setDinner(
                              dinner.filter((item) => item._id !== food._id)
                            );
                          }
                        }}
                      >
                        <img
                          className="object-cover w-full h-full border-b-2 group-hover:opacity-30 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
                        <div className=" absolute hidden group-hover:block text-bg_white_font top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2 className="mx-1 text-xs font-bold my-1 text-center break-words">
                    {food.name}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMeal;
