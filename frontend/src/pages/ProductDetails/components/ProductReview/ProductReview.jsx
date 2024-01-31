import React, { useState } from "react";
import "./ProductReview.css"; // Your CSS file
import { useAuth } from "../../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { addProductReview, getAllProducts } from "../../../../services/services";
import { useData } from "../../../../contexts/DataProvider";
import StarRating from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";

const ProductReview = ({ selectedProduct, productId }) => {
  const [reviews, setReviews] = useState(selectedProduct?.reviewsData);
  const { dispatch } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    auth: { isAuth, firstName, lastName },
  } = useAuth();

  const [newReview, setNewReview] = useState({ rating: 5, feedback: "" });

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleFeedbackChange = (e) => {
    setNewReview({ ...newReview, feedback: e.target.value });
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      toast("Please login first!");
      navigate("/login", { state: { from: location } });
      return;
    }
    await addProductReview(productId, newReview);
    toast.success("Product Reviewed!");
    await refetchProducts();
    setReviews([
      ...reviews,
      {
        ...newReview,
        _id: reviews.length + 1,
        user: {
          firstName,
          lastName,
        },
        createdAt: Date.now(),
      },
    ]);
    setNewReview({ rating: 5, feedback: "" });
  };

  const refetchProducts = async () => {
    const response = await getAllProducts();
    if (response.request.status === 200) {
      dispatch({
        type: "GET_ALL_PRODUCTS_FROM_API",
        payload: [
          ...response?.data?.data
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => ({ ...value })),
        ],
      });
    }
  };

  return (
    <div className="product-review">
      <div className="review-cards-section">
        <h2>Product Reviews ({selectedProduct.reviews})</h2>
        <div className="review-cards-container">
          {reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((review) => (
              <div key={review._id} className="review-card">
                <div className="rating">
                  <p>{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
                  <StarRating value={review.rating} size={30} edit={false} />
                </div>
                <p className="feedback">{review.feedback}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="add-review-section">
        <h2>Add Your Review</h2>
        <form onSubmit={handleAddReview}>
          <label>Rating:</label>
          <StarRating name="rating" value={newReview.rating} onChange={handleRatingChange} size={34} />
          <label>Feedback:</label>
          <textarea value={newReview.feedback} onChange={handleFeedbackChange} required className="feedback-input" />
          <button type="submit" className="submit-btn">
            {isAuth ? "Submit Review" : "Please Login First"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
