import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

function RoomContainer({ context }) {
  const { loading, sortedRoom, rooms } = context;
  //   console.log(context);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <RoomsFilter rooms={rooms}></RoomsFilter>
      <RoomsList rooms={sortedRoom}></RoomsList>
    </>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from "react";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";
// export default function RoomsContainer() {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         const { loading, sortedRooms, rooms } = value;
//         console.log(value);
//         if (loading) {
//           return <Loading></Loading>;
//         }
//         return (
//           <div>
//             Hello froms container
//             <RoomsFilter rooms={rooms}></RoomsFilter>
//             <RoomsList rooms={sortedRooms}></RoomsList>
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
