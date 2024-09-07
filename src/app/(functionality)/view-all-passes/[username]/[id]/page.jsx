'use client'

import React, { useEffect, useState } from 'react';
import './main.css';  // Add your CSS in a separate file
import { MoveLeft, MoveRight } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

const BusPass = () => {
  const [identityData, setIdentityData] = useState([]);
  const [username, setUsername] = useState('');
  const [isIdentityAvailable, setIsIdentityAvailable] = useState('');

//id from url
  const urlParams = new URLSearchParams(window.location.pathname.split('/').pop());
  let idFromUrl = urlParams.toString();
  idFromUrl = idFromUrl.substring(0, idFromUrl.length - 1); // Adjust if there's an extra character
console.log(idFromUrl)

  //getting current user
  useEffect(() => {
  const getUserDetail = async () => {
    try {
      const res = await axios.get('/api/me');
      setUsername(res.data.data.username);

    } catch (error) {
      console.error("Error fetching user details", error);
      
    }
  };
    getUserDetail();
  }, []);

 //getting identity
 useEffect(() => {
    
  const fetchData = async () => {
    if(!username) return;
    try {
      const response = await axios.post('/api/view-identity', { username });
       if(!response){
         console.log("identity not found")
       }
       else{
       setIdentityData(response.data.data)
       setIsIdentityAvailable(response.data.data.status)
      } 
    }catch(error){
      console.log(error);
      setIsIdentityAvailable("Identity Not Found")
    }   
    }
  fetchData();
}, [username]); 

console.log(identityData)

  //date making and 3d fliping of pass 
  const dateMaker = () => {
    let datesContainer = document.querySelectorAll('.dates');
    datesContainer.forEach(dates => {
      let heightForDate = dates.getBoundingClientRect().height / 12;
      dates.innerHTML = ''; // Clear previous dates to avoid duplication
      for (let i = 1; i <= 33; i++) {
        let elm = document.createElement('span');
        elm.innerHTML = `${i}`;
        elm.classList.add('date');
        elm.style.height = `${heightForDate}px`;
        elm.style.width = `${heightForDate}px`;

        if (i <= 10) {
          elm.classList.add('date-fill');
        }

        if (!(i > 31)) {
          dates.appendChild(elm);
        }
      }
    });
  };

  useEffect(() => {
    dateMaker();

    const backIcon = document.querySelector('#back-icon');
    const goIcon = document.querySelector('#go-icon');
    
    const handleBackIconClick = () => {
      document.querySelector('.pass-container').style.transform = 'rotateY(0deg)';
    };
    
    const handleGoIconClick = () => {
      document.querySelector('.pass-container').style.transform = 'rotateY(180deg)';
    };

    backIcon.addEventListener('click', handleBackIconClick);
    goIcon.addEventListener('click', handleGoIconClick);

    // Clean up event listeners when the component unmounts
    return () => {
      backIcon.removeEventListener('click', handleBackIconClick);
      goIcon.removeEventListener('click', handleGoIconClick);
    };
  }, []);

  return (
    <div className="main">
      <div className="pass-container">
        {/* Front Card */}
        <div className="front-card">
          <span id="go-icon">
            <MoveRight size={32} />
          </span>
          <div className="details-card">
            <div className="profile">
              <span className="student-name-container">
                <span className="student-name">{identityData.studentName}</span>
                <span className="student-class">{identityData.studClass}</span>
              </span>
            </div>

            <div className="locations">
              <div className="from-to-container">
                <div className="from">
                  <span>From</span>
                  <span className="from-name">{identityData.distanceFrom}</span>
                  <span className="from-address">Ardhapur, 431704</span>
                </div>

                <div className="location-logo">
                  <i className="ri-bus-fill"></i>
                </div>

                <div className="to">
                  <span>To</span>
                  <span className="to-name">{identityData.distanceTo}</span>
                  <span className="to-address">Nanded, 431605</span>
                </div>
              </div>

              <div className="start-end-dates">
                <div className="start-date">{identityData && Array.isArray(identityData.monthlyPass) && identityData.monthlyPass.length > idFromUrl ?identityData.monthlyPass[idFromUrl]?.startDate:'No start date available'}</div>
                <span>To</span>
                <div className="end-date">{identityData && Array.isArray(identityData.monthlyPass) && identityData.monthlyPass.length > idFromUrl ?identityData.monthlyPass[idFromUrl]?.endDate:'No start date available'}</div>
              </div>
            </div>

            <div className="basic-details">
              <span className="age-c">
                <span>Age:</span>
                <span id="age">20</span>
              </span>
              <span className="pass-id-c">
                <span>Pass Id:</span>
                <span id="padd-id">{identityData.IdNumber}</span>
              </span>
              <span className="fees-c">
                <span>Pass Fees:</span>
                <span id="fees">{identityData && Array.isArray(identityData.monthlyPass) && identityData.monthlyPass.length > idFromUrl ?identityData.monthlyPass[idFromUrl]?.passFees:'No start date available'}</span>
              </span>
              <span className="institute-name">
                <span>Institute Name:</span>
                <span id="institute-name">{identityData.nameOfCollegeOrSchool}</span>
              </span>
              <span className="institute-address">
                <span>Institute Address:</span>
                <span id="institute-address">{identityData.addressOfCollegeOrSchool}</span>
              </span>
            </div>

            <div className="qr">
               <img src="/pass-qr.jpeg" />
            </div>

            <div className="sign-container">
              <div>
                <span id="controller-sign">
                <img src="/controller-signature.png" />
                </span>
                <span>Controller Sign</span>
              </div>
              <div>
                <span id="student-sign">
                <img src={identityData.studentSign} />
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
            <MoveLeft size={32} />
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

export default BusPass;
