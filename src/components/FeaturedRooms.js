import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";
export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    // const { name, greeting } = this.context;
    // console.log(name, greeting);
    let { loading, featuredRooms: rooms } = this.context;
    // console.log(rooms);
    rooms = rooms.map((room) => {
      return <Room key={room.id} room={room}></Room>;
    });
    return (
      <>
        <section className="featured-rooms">
          <Title title="Le più scelte"></Title>
          <div className="featured-rooms-center">
            {loading ? <Loading></Loading> : rooms}
          </div>
        </section>
        ;
      </>
    );
  }
}
