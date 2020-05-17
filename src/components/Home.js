import React from "react";
import { Link } from "react-router-dom";
import pizza1 from "./pizza1.jpg"

const Home = () => (
  <div className="home">
    <div className="bigTitle">
      <h1>Your Favorite Food, Delivered While Coding</h1>
      <div>
      <Link to='/pizza'>
      <button type="button" className="btn btn-info">Pizza?</button>
      </Link>
      </div>
    </div>
    <div className="pizzaList">
      <h2>Food Delivery in Gotham City</h2>
    </div>
    <div className="pizzaPlaces1">
        <div className="pizza1">
            <img width="200px" src={pizza1} alt="Pizza" />
            

        </div>
    </div>
  </div>
);
export default Home;
