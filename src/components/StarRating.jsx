import React from "react";
import { FaStar } from "react-icons/fa";
import '../static/style.css'

export default function StarRating(object, rating, setRating) {
  return (
    <div>
      {Object.keys(object).map((ratingValue) => (
        <label key={ratingValue}>
          <input type="radio" name="rating" />
          <FaStar size={40} className="star" />
        </label>
      ))}
    </div>
  );
}
