import "./ProductDetails.css";
import React from "react";
import { useParams } from "react-router-dom";

import { useData } from "../../contexts/DataProvider";
import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();
  const { loading } = useData();

  const selectedProduct = state.allProductsFromApi?.find(({ _id }) => _id === productId);

  return (
    !loading && (
      <>
        <div className="products-page-container">
          <ProductImage selectedProduct={selectedProduct} />
          <ProductDescription selectedProduct={selectedProduct} />
        </div>
      </>
    )
  );
};
