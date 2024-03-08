import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../UserContext";
import * as myConstants from "../../../../myConstants";
import axios from "axios";

function AllMealPopUp({ setMeal, meal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foods, setFoods] = useState(null);
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("/food/get-foods").then((res) => {
      setFoods(res.data);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center mx-auto w-full">
        <button
          className="flex items-center gap-2 mb-6  bg-bg_red px-4 py-1 text-bg_white_font rounded-md hover:bg-bg_dark_section duration-200"
          onClick={openModal}
        >
          <div className="text-4xl">+</div>
          <div className="font-bold">Add Food</div>
        </button>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-bg_white border-2 border-bg_dark_section fixed">
              <div
                className="absolute p-1 bg-bg_red rounded-full text-bg_white_font right-6 top-2 z-50 hover:bg-bg_dark_section cursor-pointer"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="relative max-w-3xl overflow-auto max-h-[80vh]  text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section p-7 justify-center items-center gap-2 grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {foods &&
                  foods.length > 0 &&
                  foods.map((food) => (
                    <div
                      className="border-2 border-bg_dark_section p-2 rounded-md hover:bg-bg_dark_section hover:text-bg_white_font cursor-pointer"
                      key={food._id}
                      onClick={() => {
                        if (!meal.some((item) => item._id === food._id)) {
                          setMeal([...meal, food]);
                        }
                      }}
                    >
                      <div>
                        <div className="rounded-2xl object-cover aspect-square mb-2 bg-gray-600">
                          {food.photo && (
                            <img
                              className="rounded-2xl aspect-square object-cover"
                              src={
                                myConstants.BACKEND_URL +
                                "/uploadsFood/" +
                                food.photo
                              }
                            ></img>
                          )}
                        </div>
                        <h2 className="text-sm font-bold mb-1 truncate">
                          {food.name}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMealPopUp;
