import "./ProductDetails.css";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useData } from "../../contexts/DataProvider";
import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";
import ProductReview from "./components/ProductReview/ProductReview";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();
  const { loading } = useData();
  const navigate = useNavigate();

  const selectedProduct = state.allProductsFromApi?.find(({ _id }) => _id === productId);

  useEffect(() => {
    if (!state.allProductsFromApi.length) {
      navigate("/product-listing");
    }
  }, []);
  return (
    !loading &&
    selectedProduct && (
      <>
        <div className="products-page-container">
          <ProductImage selectedProduct={selectedProduct} />
          <ProductDescription selectedProduct={selectedProduct} />
        </div>
        <ProductReview selectedProduct={selectedProduct} productId={productId} />
      </>
    )
  );
};
