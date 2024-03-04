import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Landing.css";
import logo1 from "../../Assets/2.png";
import logo2 from "../../Assets/1.png";
import logo3 from "../../Assets/3.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const joinUsButtonClick = () => {
    navigate("/register");
  };

  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-section-one">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 section-text">
            <div className="section-one-text">
              <h1>Marine Hire</h1>
              <br />
              <p>
                Welcome to Marine Hire, your gateway to exciting career
                opportunities in the marine sector. Whether you're an
                experienced professional or just starting your journey, we
                connect talented individuals with leading shipping companies
                worldwide.
              </p>
              <br />
              <button className="button-4" onClick={() => joinUsButtonClick()}>
                Join Us
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 image-section">
            <img className="image-1" src={logo1} alt="image-1" />
          </div>
        </div>
      </div>
      <div className="landing-section-two">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 image-section">
            <img className="image-1" src={logo2} alt="image-2" />
          </div>
          <div className="col-lg-6 col-md-6 col-12 section-text">
            <div className="section-one-text">
              <p>
                Reach a global pool of skilled professionals in the marine
                sector. Our platform connects your job openings with talent from
                around the world.
              </p>
              <br />
              <button className="button-4">Post Job</button>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-section-three">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 section-text">
            <div className="section-one-text">
              <p>
                Apply to your dream job with just a few clicks. Our platform
                ensures a smooth and secure application process, connecting you
                directly with hiring companies.
              </p>
              <br />
              <button className="button-4">Apply on Job</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 image-section">
            <img className="image-1" src={logo3} alt="image-3" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
