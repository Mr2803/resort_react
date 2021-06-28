import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log("queste sono le props", this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
    };
  }
  static contextType = RoomContext;

  // componentDidMount() {}
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    // console.log(room);
    if (!room) {
      return (
        <div className="error" style={{ marginTop: 150 + "px" }}>
          <h3>Nessuna stanza trovata</h3>
          <Link to="/rooms" className="btn-primary">
            Torna alle stanze
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      extras,
      images,
      pets,
      price,
      size,
      type,
      breakfast,
    } = room;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name}`}>
            <Link to="/rooms" className="btn-primary">
              Ritorna alle stanze
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((img, index) => (
              <img key={index} src={img} alt={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>Dettagli</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>Informazioni</h3>
              <h6>Prezzo : €{price}</h6>
              <h6>
                Grandezza : {size} m<sup>2</sup>
              </h6>
              <h6>
                Capienza massima :{" "}
                {capacity > 1 ? `${capacity} persone` : `${capacity} persona`}
              </h6>
              <h6>{pets ? "Animali ammessi" : "Animali non ammessi"}</h6>
              <h6>{breakfast && "Colazione compresa"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>Servizi aggiuntivi</h6>
          <ul className="extras">
            {extras.map((extra, index) => (
              <li key={index}>- {extra}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}
