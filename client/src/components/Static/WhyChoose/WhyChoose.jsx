import React from "react";
import Image1 from "../../../assets/images/hospital/personalize.png";
import Image2 from "../../../assets/images/hospital/trust.png";
import Image3 from "../../../assets/images/hospital/empower.png";
import "./WhyChoose.css";

const cards = [
  {
    image: Image1,
    title: "Personalized Excellence",
    copy:
      "Tailored treatment plans built around your condition, history, and recovery goals.",
  },
  {
    image: Image2,
    title: "Trusted Care",
    copy:
      "A care approach grounded in transparency, medical integrity, and patient confidence.",
  },
  {
    image: Image3,
    title: "Empowered Wellness",
    copy:
      "Preventive guidance and follow-up support that help patients stay healthier for longer.",
  },
];

const WhyChoose = () => {
  return (
    <section className="why-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-eyebrow">Why Patients Choose Us</p>
          <h2>A cleaner experience from first visit to follow-up</h2>
        </div>

        <div className="why-container">
          {cards.map((card) => (
            <div className="why-card" key={card.title}>
              <img src={card.image} alt={card.title} width="150" />
              <h2>{card.title}</h2>
              <p>{card.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
