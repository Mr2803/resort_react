import React from "react";

import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <Hero>
      <Banner title="404" subtitle="Pagina non trovata">
        <Link to="/" className="btn-primary">
          Ritorna alla home
        </Link>
      </Banner>
    </Hero>
  );
}
