'use client'
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [identityData, setIdentityData] = useState([]);
  const [username, setUsername] = useState('');

  // Fetching the current user if available
  const getUserDetail = async () => {
    try {
      const res = await axios.get('/api/me');
      setUsername(res.data.data.username);

    } catch (error) {
      console.error("Error fetching user details", error);
      
    }
  };

  useEffect(() => {
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
         setIdentityData(response.data.data) 
      }catch(error){
        console.log(error)
      }   
      }
    fetchData();
  }, [username]);
 console.log(identityData)
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="max-w-sm w-full h-auto bg-[#1a2338] rounded-xl shadow-xl text-white overflow-hidden text-center">
        <div className="bg-gradient-to-br from-[#0033cc] to-[#3366ff] p-4 flex flex-row items-center object-contain">
          
            <Image
              src="/msrtc-logo.jpg"
              height={50}
              width={70}
              alt="Company Logo"
              className="object-contain"
            />
           
          <h2 className="mt-2 text-sm md:text-lg font-bold uppercase">
            Maharashtra State Road Transport Corporation.
          </h2>
        </div>
        <div className="my-4 mx-auto w-[120px] h-[120px] rounded-full overflow-hidden">
        <img src={identityData.studentPhoto} alt="Student Photo"/>
        </div>
        <h1 className="mt-2 text-base md:text-xl font-bold uppercase">{identityData.IdNumber}</h1>
        
        <div className="text-left px-4 md:px-5">
        <p className="mb-1 text-xs md:text-sm">
            Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{identityData.studentName} 
          </p>
          <p className="mb-1 text-xs md:text-sm">
            Student Address :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{identityData.studentAddress}
          </p>
          <p className="mb-1 text-xs md:text-sm">
            Date Of Birth : &nbsp;&nbsp;{identityData.studentDOB}
          </p>
          <p className="text-xs md:text-sm">
            College Name : &nbsp;{identityData.nameOfCollegeOrSchool}
          </p>
          <p className="text-xs md:text-sm">
            College Address : &nbsp;{identityData.addressOfCollegeOrSchool}
          </p>
        </div>
        <div className='flex justify-between py-6 px-2'>

          <div>
          <img src="/controller-signature.png" alt="Student Photo" className='bg-white h-14 w-40' />
          <h3 className='font-bold text-lg'>Controler Signature</h3>
        </div>
        <div>
          <img src={identityData.studentPhoto} alt="Student Photo" className='bg-white h-14 w-40'/>
          <h3 className='font-bold text-lg'>Student Signature</h3>
        </div>
        
        </div>

      </div>
    </div>
  );
};

export default Page;
