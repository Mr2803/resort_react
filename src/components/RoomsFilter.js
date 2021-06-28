import React from "react";
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "../components/Title";
//get all unique values
const getUniqueValue = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};
export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);
  //   console.log(context);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;
  // get unique value of type for dropdown
  let types = getUniqueValue(rooms, "type");
  //add "all"
  types = ["all", ...types];
  //map to jsx
  types = types.map((type, index) => {
    return (
      <option value={type} key={index}>
        {type}
      </option>
    );
  });
  let guests = getUniqueValue(rooms, "capacity");

  guests = guests.map((guest, index) => {
    return (
      <option value={guest} key={index}>
        {guest}
      </option>
    );
  });

  //   console.log(types);
  return (
    <section className="filter-container">
      <Title title="Cerca stanze"></Title>
      <form className="filter-form">
        {/*select type */}
        <div className="form-group">
          <label htmlFor="type">Tipo di stanza</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
          {/*end type */}
          {/*select guest */}
        <div className="form-group">
          <label htmlFor="capacity">Ospiti</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {guests}
          </select>
        </div>
         {/*end guest */}
          {/*room price */}
        <div className="form-group">
          <label htmlFor="capacity">Prezzo €{price}</label>
          <input
          type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            className="form-control"
            onChange={handleChange}
          >
            
          </input>
        </div>
         {/*end room price */}
         {/*room size */}
         <div className="form-group">
          <label htmlFor="size">Grandezza</label>
          <div className="size-inputs">
            <input type="number" name="minSize" id="minSize" value={minSize} onChange={handleChange} className="size-input"></input>
            <input type="number" name="maxSize" id="maxSize" value={maxSize} onChange={handleChange} className="size-input"></input>
          </div>
        </div>
        {/*end room size */}
        {/*extras */}
        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}></input>
            <label htmlFor="breakfast">Colazione </label>
          </div>
        
          <div className="single-extra">
            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}></input>
            <label htmlFor="breakfast">Animali </label>
          </div>
        </div>
        {/*end extras */}
      </form>
    </section>
  );
}
