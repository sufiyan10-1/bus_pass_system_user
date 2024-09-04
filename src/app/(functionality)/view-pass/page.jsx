'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
 

export default function BusPass() {
  const [isFront, setIsFront] = useState(true);
  const [identityData, setIdentityData] = useState([]);
  const [username, setUsername] = useState('');
  const [isIdentityAvailable, setIsIdentityAvailable] = useState('');

  // Fetching the current user if available
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
        setIsIdentityAvailable("Not Found")
      }   
      }
    fetchData();
  }, [username]);

 console.log(isIdentityAvailable)
 console.log(identityData)
  useEffect(() => {
    const dateMaker = () => {
      const datesContainers = document.querySelectorAll('.dates');
      datesContainers.forEach(dates => {
        const heightForDate = dates.getBoundingClientRect().height / 12;
        for (let i = 1; i <= 33; i++) {
          const elm = document.createElement('span');
          elm.innerHTML = `${i}`;
          elm.classList.add('date');
          elm.style.height = `${heightForDate}px`;
          elm.style.width = `${heightForDate}px`;

          if (i <= 10) {
            elm.classList.add('date-fill');
          }

          if (i <= 31) {
            dates.appendChild(elm);
          }
        }
      });
    };

    dateMaker();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div
        className={`relative w-[27.5vw] h-[90vh] transform-style-3d transition-transform duration-1000 ${
          isFront ? '' : 'rotate-y-180'
        }`}
      >
        {/* Front Card */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-blue-700 rounded-xl flex items-center justify-center transform-style-3d backface-hidden z-20">
          <div className="bg-white w-[90%] h-[90%] rounded-lg flex flex-col">
            <div className="flex items-center justify-center gap-4 p-3">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{identityData.studentName}</span>
                <span className="text-sm text-gray-600">{identityData.studClass}</span>
              </div>
            </div>

            <div className="flex flex-col px-3">
              <div className="flex justify-between border border-dashed border-black rounded-lg p-4 bg-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">From</span>
                  <span className="text-sm">{identityData.distanceFrom}</span>
                  <span className="text-xs">Ardhapur, 431704</span>
                </div>
                <div className="text-2xl text-black">
                  <i className="ri-bus-fill"></i>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">To</span>
                  <span className="text-sm">{identityData.distanceTo}</span>
                  <span className="text-xs">Nanded, 431605</span>
                </div>
              </div>

              <div className="flex justify-between mt-6 gap-2">
                <div className="flex items-center justify-center text-sm font-roboto">23,Aug,2024</div>
                <span>To</span>
                <div className="flex items-center justify-center text-sm font-roboto">21,Sep,2024</div>
              </div>
            </div>

            <div className="flex flex-col flex-wrap justify-between gap-1.5 mt-2 border-t border-gray-300 pt-2 mx-3">
              <span className="flex gap-1 items-center">
                <span className="text-xs text-gray-700">DOB:</span>
                <span className="font-bold text-xs">{identityData.studentDOB}</span>
              </span>
              <span className="flex gap-1 items-center">
                <span className="text-xs text-gray-700">Pass Id:</span>
                <span className="font-bold text-xs">{identityData.IdNumber}</span>
              </span>
              <span className="flex gap-1 items-center">
                <span className="text-xs text-gray-700">Pass Fees:</span>
                <span className="font-bold text-xs">580</span>
              </span>
              <span className="flex gap-1 items-center">
                <span className="text-xs text-gray-700">Institute Name:</span>
                <span className="font-bold text-xs">{identityData.nameOfCollegeOrSchool}</span>
              </span>
              <span className="flex gap-1 items-center">
                <span className="text-xs text-gray-700">Institute Address:</span>
                <span className="font-bold text-xs">{identityData.addressOfCollegeOrSchool}</span>
              </span>
            </div>

            <div className="self-center mt-2 h-20 w-20 border border-black"></div>

            <div className="flex justify-between items-center p-3">
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 w-full border border-black"></div>
                <span className="text-xs">Controller Sign</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 w-full border border-black"></div>
                <span className="text-xs">Student Sign</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsFront(false)}
            className="absolute top-2 right-4 text-white text-lg"
          >
            Go to Back
          </button>
        </div>

        {/* Back Card */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl transform rotate-y-180 backface-hidden">
          <div className="relative w-full h-full flex flex-col justify-between p-3 bg-white rounded-xl">
            <div className="flex justify-between items-center">
              <div className="text-center w-1/2">
                <span className="block font-bold">On Going</span>
                <div className="dates h-64 w-full flex flex-wrap justify-center gap-1.5"></div>
              </div>
              <div className="text-center w-1/2">
                <span className="block font-bold">On Coming</span>
                <div className="dates h-64 w-full flex flex-wrap justify-center gap-1.5"></div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsFront(true)}
            className="absolute top-2 left-4 text-white text-lg"
          >
            Back to Front
          </button>
        </div>
      </div>
    </div>
  );
}
