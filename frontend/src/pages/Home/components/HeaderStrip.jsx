import React from "react";
import { useData } from "../../../contexts/DataProvider";
import { Link } from "react-router-dom";

const HeaderStrip = () => {
  const { state, dispatch } = useData();

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", background: "black", color: "white", padding: "10px" }}>
      <p
        onClick={() => {
          const anchor = document.querySelector("#categories-section");
          anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
        style={{ cursor: "pointer" }}
      >
        All Categories
      </p>
      {state?.allCategories?.map((category) => (
        <Link
          style={{ textDecoration: "none", color: "white" }}
          onClick={() =>
            dispatch({
              type: "ADD_CATEGORIES_FROM_HOME",
              payload: category?.categoryName,
            })
          }
          to="/product-listing"
        >
          {" "}
          <p style={{ cursor: "pointer" }}>{category?.categoryName}</p>
        </Link>
      ))}
    </div>
  );
};

export default HeaderStrip;
