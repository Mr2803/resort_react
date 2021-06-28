import React from "react";
import Room from "./Room";
export default function RoomsList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>
          Sfortunatamente non abbiamo stanze disponibili con i parametri di
          ricerca selezionati
        </h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((room) => {
          return <Room key={room.id} room={room}></Room>;
        })}
      </div>
    </section>
  );
}
