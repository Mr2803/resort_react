import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful"
// Client.getEntries({
//   content_type : "resortReact"
// })
// .then((response) => console.log(response.items))
const RoomContext = React.createContext();
// <RoomContext.Provider value={"hello"}
class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRoom: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  //getData
  getData = async() =>{
    try {
      let response = await Client.getEntries({
  content_type : "resortReact",
  // order : "sys.createdAt"
  order:"fields.price"
  // order:"-fields.price" reverse
});
let rooms = this.formatData(response.items);
    console.log(rooms);
    let featuredRooms = rooms.filter((room) => room.featuredRoom === true);
    console.log(featuredRooms);
    let maxPrice = Math.max(...rooms.map((room) => room.price));
    let maxSize = Math.max(...rooms.map((room) => room.size));
    // let minPrice = Math.min(...rooms.map((room) => room.price))
    // console.log(maxPrice);
    // console.log(maxSize);
    this.setState({
      rooms,
      featuredRooms,
      sortedRoom: rooms,
      loading: false,
      price: 600,
      // minPrice,
      maxPrice,
      maxSize,
    });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData()
    
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };
  handleChange = (e) => {
    // const type = e.target.type;
    // const name = e.target.name;
    // const value = e.target.value
    // console.log(`this is type : ${type}, this is name : ${name}, this is value :${value}`);
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    // console.log(e.target)
    const name = e.target.name;
    this.setState({
      [name] : value,
      
    },this.filterRooms)
  };
  filterRooms = () => {
    let {
      rooms,type,capacity,price,minSize,maxSize,breakfast,pets
    } = this.state
    //all rooms
    let tempRooms = [...rooms]
  // transform value
  capacity = parseInt(capacity)
  price = parseInt(price)
  // filter by type
    if(type !=="all"){
      tempRooms = tempRooms.filter(room=> room.type === type)
    }
    // filter by capacity
    if(capacity !== 1){

      tempRooms = tempRooms.filter(room=> room.capacity >= capacity)
    }
    // filter by price
    tempRooms = tempRooms.filter(room=> room.price <= price)
    // filter by size
    tempRooms = tempRooms.filter(room=> room.size >= minSize && room.size <= maxSize)
     // filter by breakfast
     if(breakfast){
       tempRooms = tempRooms.filter(room=> room.breakfast === true)
     }
     // filter by pets
     if(pets){
       tempRooms = tempRooms.filter(room=> room.pets === true)
     }
    // change state
    this.setState({
      sortedRoom : tempRooms
    })
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value}></Component>}
      </RoomConsumer>
    );
  };
}
export { RoomProvider, RoomConsumer, RoomContext };
