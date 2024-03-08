import { React, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../../../../UserContext";
import * as myConstants from "../../../../myConstants";
import EditFoodPopUp from "./EditFoodPopUp";
import AddFood from "./AddFoodPopUp";
import Loader from "../../../components/Loader";

function AllFoods() {
  const [foods, setFoods] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    axios.get("/food/get-foods").then((res) => {
      setFoods(res.data);
      setLoading(false);
      setFetch(false);
    });
  }, [fetch]);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  async function deleteFood(id) {
    var a = confirm("Do you want to delete? ");
    if (a) {
      await axios.delete("/food/delete-food/" + id).then((res) => {
        if (res.status === 200) {
          setFetch(true);
          toast.success("Deleted Successfully");
        }
      });
    }
  }

  return (
    <>
      <div className="flex justify-center mb-6 text-2xl font-bold labels mx-4 mt-4">
        All food items
      </div>
      <div className="relative rounded-2xl mx-8 grid gap-x-6 gap-y-8 grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {foods.length > 0 &&
          foods.map((food) => (
            <div className="relative" key={food._id}>
              <div>
                <div className="rounded-2xl object-cover aspect-square mb-2 bg-gray-600">
                  {food.photo && (
                    <img
                      className="rounded-2xl aspect-square object-cover"
                      src={
                        myConstants.BACKEND_URL + "/uploadsFood/" + food.photo
                      }
                    ></img>
                  )}
                </div>
                <h2 className="text-sm font-bold mb-1 truncate">{food.name}</h2>
              </div>
              <div className="absolute bottom-9 right-1 bg-bg_dark_font bg-opacity-80 text-white p-1 rounded-xl hover:bg-bg_red cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                  onClick={(ev) => {
                    deleteFood(food._id);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <EditFoodPopUp food={food} />
            </div>
          ))}
        <AddFood />
      </div>
    </>
  );
}

export default AllFoods;
