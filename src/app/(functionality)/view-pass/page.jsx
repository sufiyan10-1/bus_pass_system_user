'use client'
import React, { useEffect } from "react";
 

const BusPassCard = () => {
  // Function to create date blocks
  const dateMaker = () => {
    let datesContainer = document.querySelectorAll(".dates");
    console.log(datesContainer);

    datesContainer.forEach((dates) => {
      let heightForDate = dates.getBoundingClientRect().height / 12;
      for (let i = 1; i <= 33; i++) {
        const elm = document.createElement("span");
        elm.innerHTML = `${i}`;
        elm.classList = "date";
        elm.style.height = heightForDate + "px";
        elm.style.width = heightForDate + "px";

        if (i <= 10) {
          elm.classList += " date-fill";
        }

        if (!(i > 31)) {
          dates.appendChild(elm);
        }
      }
    });
  };

  useEffect(() => {
    dateMaker();

    document.querySelector("#back-icon").addEventListener("click", () => {
      document.querySelector(".pass-container").style.transform = "rotateY(0deg)";
    });

    document.querySelector("#go-icon").addEventListener("click", () => {
      document.querySelector(".pass-container").style.transform = "rotateY(180deg)";
    });
  }, []);

  return (
    <div className="main">
      <div className="pass-container">
        {/* Front Card */}
        <div className="front-card">
          <span id="go-icon">
            <i className="ri-arrow-right-line"></i>
          </span>
          <div className="details-card">
            <div className="profile">
              <span className="student-name-container">
                <span className="student-name">Abdul Aquib</span>
                <span className="student-class">TYBCA</span>
              </span>
            </div>

            <div className="locations">
              <div className="from-to-container">
                <div className="from">
                  <span>From</span>
                  <span className="from-name">Ardhapur</span>
                  <span className="from-address">Ardhapur, 431704</span>
                </div>

                <div className="location-logo">
                  <i className="ri-bus-fill"></i>
                </div>

                <div className="to">
                  <span>To</span>
                  <span className="to-name">Nanded</span>
                  <span className="to-address">Nanded, 431605</span>
                </div>
              </div>

              <div className="start-end-dates">
                <div className="start-date">23,Aug,2024</div>
                <span>To</span>
                <div className="end-date">21,Sep,2024</div>
              </div>
            </div>

            <div className="basic-details">
              <span className="age-c">
                <span>Age:</span>
                <span id="age">20</span>
              </span>
              <span className="pass-id-c">
                <span>Pass Id:</span>
                <span id="pass-id">30988723</span>
              </span>
              <span className="fees-c">
                <span>Pass Fees:</span>
                <span id="fees">580</span>
              </span>
              <span className="institute-name">
                <span>Institute Name:</span>
                <span id="institute-name">Mgm's College CS & IT Nanded</span>
              </span>
              <span className="institute-address">
                <span>Institute Address:</span>
                <span id="institute-address">Near Namaskar Chowk, Airport road, Nanded</span>
              </span>
            </div>

            <div className="qr">
              <img src="" alt="" id="qr-img" />
            </div>

            <div className="sign-container">
              <div>
                <span id="controller-sign">
                  <img src="" alt="Sign" id="controller-sign" />
                </span>
                <span>Controller Sign</span>
              </div>
              <div>
                <span id="student-sign">
                  <img src="" alt="sign" />
                </span>
                <span>Student Sign</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div className="back-card">
          <div className="upper"></div>
          <span id="back-icon">
            <i className="ri-arrow-left-line"></i>
          </span>

          <div className="back-main">
            <div className="on-going">
              <span>On Going</span>
              <div className="dates" id="on-going-dates"></div>
            </div>
            <div className="on-coming">
              <span>On Coming</span>
              <div className="dates" id="on-coming-dates"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusPassCard;
