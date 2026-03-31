import React from "react";
import ReviewData from "./PatentReviews.json";
import "./PatentReviews.css";

const PatentReviews = () => {
  return (
    <section className="review-container">
      <div className="container">
        <div className="heading-container">
          <p className="section-eyebrow">Testimonials</p>
          <h2>What our patients say about their care experience</h2>
        </div>

        <div className="review-grid">
          {ReviewData.map((d) => (
            <article className="review-card" key={d.id}>
              <img src={d.pic} alt={`${d.name} profile`} className="review-avatar" />
              <p className="review-name">
                <strong>{d.name}</strong>
                <small>{d.address}</small>
              </p>
              <div className="review-stars">
                <span className="fas fa-star"></span>
                <span className="fas fa-star"></span>
                <span className="fas fa-star"></span>
                <span className="fas fa-star"></span>
                <span className="fas fa-star-half-alt"></span>
              </div>
              <h5>{d.commentTitle || d.commentTile}</h5>
              <p className="review-copy">"{d.commentDescription}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatentReviews;
