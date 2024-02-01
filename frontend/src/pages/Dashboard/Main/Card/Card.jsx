import React from "react";
import "./Card.css";
const Card = ({ name, count }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-count">{count}</p>
      </div>
    </div>
  );
};

export default Card;
