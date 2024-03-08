import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as myConstants from "../../myConstants";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../UserContext";
import Loader from "../components/Loader";
import axios from "axios";

function TodayMeal() {
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

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto max-w-7xl mt-10 mr-4 ml-4">
        <div className="border-2 border-bg_dark_section p-4 rounded-md shadow-md shadow-bg_dark_section">
          <div className="mb-6 text-2xl font-bold text-center labels">
            Breakfast
          </div>

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
                      <div className="bg-bg_dark_section aspect-square relative">
                        <img
                          className="object-cover w-full h-full border-b-2 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
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
                      <div className="bg-bg_dark_section aspect-square relative">
                        <img
                          className="object-cover w-full h-full border-b-2 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
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
                      <div className="bg-bg_dark_section aspect-square relative">
                        <img
                          className="object-cover w-full h-full border-b-2 border-bg_dark_section"
                          src={
                            myConstants.BACKEND_URL +
                            "/uploadsFood/" +
                            food.photo
                          }
                          alt={food.name}
                        />
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

export default TodayMeal;
