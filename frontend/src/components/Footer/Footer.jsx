import React from "react";
import './Footer.css';
import stationimg from '../../assets/img/Logo.jpg';

export default function Footer() {
  return (
    <footer id="footer" className="footer">

      <div className="container">
        <div className="row gy-4">
          <div className=" col-md-12 footer-info">
            <a href="index.html" className="logo d-flex align-items-center">
              <span>
                <img src={stationimg} alt="logo" />
              </span>
            </a>
            
            <div className="container_contact">
            <h2>Contact Us</h2><br />
              <div className="contact">
                <div className="contact_info">
                  <div>
                    <p>
                      <strong>Address:</strong><br />
                      A108 Adam Street <br />
                      New York, NY 535022<br />
                      United States <br /><br />
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Phone:</strong><br /> +1 5589 55488 55
                    </p>
                  </div>
                  <div className="email">
                    <p>
                      <strong>Email:</strong> <br/> Ontibici@email.com<br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="social_container">
                <div className="social-links d-flex ">
                  <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>
                <div className="copyright">
                  &copy; Copyright <strong><span>Logis</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mt-4"> */}
      {/* <div className="copyright">
          &copy; Copyright <strong><span>Logis</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div> */}
      {/* </div> */}

    </footer>
  )
}