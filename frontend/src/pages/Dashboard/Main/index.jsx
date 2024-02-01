import React from "react";
import Card from "./Card/Card";
import "./index.css";
const MainDashboard = () => {
  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="card-container">
        <Card name="Users" count={10} />
        <Card name="Products" count={25} />
        <Card name="Orders" count={15} />
        <Card name="Categories" count={5} />
        <Card name="Complaints" count={8} />
      </div>
    </div>
  );
};

export default MainDashboard;
