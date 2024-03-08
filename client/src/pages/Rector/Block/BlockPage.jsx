import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import roomIcon from "../../../assets/room.png";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../UserContext";
import { Navigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import * as myConstants from "../../../../myConstants";
import AddStudentPopup from "./AddStudentPopup";

const BlockPage = () => {
  const { id } = useParams();
  const [block, setBlock] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [AllocatedRoomStudents, setAllocatedRoomStudents] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [room, setRoom] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/rector/get-block/" + id).then((res) => {
        if (res.status === 200) {
          setBlock(res.data);
          setLoading(false);
          setFetch(false);
        }
      });
    }
  }, [fetch]);

  if (!user || (user && user.role !== "Rector")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  function roomOccupancy(capacity, allocatedStudents) {
    let boxes = [];

    for (let i = 0; i < capacity; i++) {
      if (allocatedStudents.length > i) {
        // If there is an allocated student at this index
        boxes.push(
          <div
            key={i}
            className="w-4 h-4 m-1 rounded-full bg-bg_dark_red"
          ></div>
        );
      } else {
        // Otherwise, the box is empty
        boxes.push(
          <div key={i} className="w-4 h-4 m-1 rounded-full bg-green-500"></div>
        );
      }
    }

    return <div className="flex flex-wrap">{boxes}</div>;
  }

  return (
    <>
      {block && (
        <div className="">
          <div className="flex justify-center mb-6 mr-2 mt-2 text-2xl font-bold labels">
            Block {block.name}
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3 ml-2 mr-4 h-[40vh] overflow-y-scroll border-2 border-black p-4 rounded-md">
            {block.rooms.map((room) => (
              <>
                <div
                  onClick={() => {
                    setAllocatedRoomStudents(room.allocatedStudents);
                    setCapacity(room.capacity);
                    setRoom(room);
                    setSelectedRoomNumber(room.number);
                  }}
                  className={`bg-gray-200 border border-black rounded-lg p-2 flex flex-col items-center cursor-pointer h-fit duration-100 hover:bg-gradient-to-t hover:from-gray-300 hover:to-gray-200 ${
                    selectedRoomNumber && selectedRoomNumber === room.number
                      ? "bg-gradient-to-t from-gray-300 to-gray-200 border-b-4 border-bg_dark_section"
                      : "bg-gray-200"
                  } `}
                  key={room.number}
                >
                  <div>{room.number}</div>
                  <div className="">
                    {roomOccupancy(room.capacity, room.allocatedStudents)}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 items-center border-2 border-black rounded-lg p-3 mt-4 ml-4 mr-6">
            {AllocatedRoomStudents &&
              AllocatedRoomStudents.map((student) => (
                <>
                  <div key={student._id}>
                    <div className="flex flex-col sm:flex-row items-center border-2 border-gray-400 rounded-md p-2">
                      <div className="">
                        {
                          <img
                            className="aspect-square object-cover h-20 md:h-32 lg:h-32 border-2 border-gray-400 rounded-md"
                            src={
                              myConstants.BACKEND_URL +
                              "/uploads/" +
                              student.profilePhoto
                            }
                          ></img>
                        }
                      </div>
                      <div className="flex flex-col items-center md:items-start gap-1 mx-3 mt-1">
                        <div className="text-base md:text-2xl lg:text-2xl font-medium">
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
                          <div className="flex gap-2 items-center labels_3">
                            <img className="h-4" src={roomIcon} />
                            {student.roomNumber}
                          </div>
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
                </>
              ))}

            <div className="h-full">
              <AddStudentPopup
                blockId={block._id}
                roomNo={selectedRoomNumber}
                room={room}
                AllocatedRoomStudents={AllocatedRoomStudents}
                capacity={capacity}
                setFetch={setFetch}
                setAllocatedRoomStudents={setAllocatedRoomStudents}
                setCapacity={setCapacity}
                setRoom={setRoom}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockPage;
