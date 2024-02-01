import React from "react";
import "./Card.css";
const Card = ({ name, count }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{name}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default Card;
