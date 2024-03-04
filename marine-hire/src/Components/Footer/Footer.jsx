import React, { useEffect, useState } from "react";
import { FaGoogle, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const fetchYear = () => {
      const year = new Date().getFullYear();
      setCurrentYear(year);
    };

    fetchYear();
  }, []);

  const services = [
    { text: "Routes", link: "/routes" },
    { text: "Freight", link: "/#" },
    { text: "Weather", link: "/weather" },
    // Add more services as needed
  ];
  return (
    <footer className="footer footer-section pt-5">
      <div className="container-footer">
        <section className="links">
          <div className="row text-center d-flex justify-content-center">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/" className="btn btn-footer">
                  Home
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/services" className="btn btn-footer">
                  Services
                </Link>
                <ul className="dropdown-menu">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link to={service.link}>{service.text}</Link>
                    </li>
                  ))}
                </ul>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/about" className="btn btn-footer">
                  About Us
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link className="btn btn-footer">Careers</Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link className="btn btn-footer">Contact</Link>
              </h6>
            </div>
          </div>
        </section>
        <hr className="my-5" />
        <section className="text">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                Pioneering maritime solutions, we lead in optimizing cargo
                transportation through cutting-edge technologies. Specializing
                in efficient route planning and cost-effective strategies, we
                are dedicated to industry success.
              </p>
            </div>
          </div>
        </section>
        <section className="social mb-5">
          <div className="text-center">
            <p className="btn btn-social">
              <FaMeta />
            </p>
            <p className="btn btn-social">
              <FaXTwitter />
            </p>
            <p className="btn btn-social">
              <FaGoogle />
            </p>
            <p className="btn btn-social">
              <FaInstagram />
            </p>
            <p className="btn btn-social">
              <FaLinkedin />
            </p>
            <p className="btn btn-social">
              <FaGithub />
            </p>
          </div>
        </section>
      </div>
      <div className="text-center p-3 footer-bottom">
        <span>&copy; {currentYear} Copyright Marine Hire Ltd.</span>
      </div>
    </footer>
  );
};

export default Footer;
