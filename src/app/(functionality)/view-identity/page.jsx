'use client'
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [identityData, setIdentityData] = useState([]);
  const [username, setUsername] = useState('');
  const [isIdentityAvailable, setIsIdentityAvailable] = useState('');
console.log(identityData)
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
  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-200">
     {
      isIdentityAvailable === "Accepted"?(
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
        <Image height={40} width={120} src={identityData.studentPhoto} alt="Student Photo"/>
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
          <Image height={20} width={20} src="/controller-signature.png" alt="Student Photo" className='bg-white h-14 w-40' />
          <h3 className='font-bold text-lg'>Controler Signature</h3>
        </div>
        <div>
          <Image height={20} width={20} src={identityData.studentSign} alt="Student Photo" className='bg-white h-14 w-40'/>
          <h3 className='font-bold text-lg'>Student Signature</h3>
        </div>
        
        </div>

      </div>
      ):(
        isIdentityAvailable === "Not Found"?(
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
              Application Status
            </h1>
            <div className="text-center text-sm md:text-base">
                 There is no Identity Found. Please send Application For Identity  
            </div>
          </div>
        </div>
        ):(
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
              Application Status
            </h1>
            <div className="text-center text-sm md:text-base">
               Identity Not Avalible Check Your Application Status <Link href='/application-status' className='text-blue-800 hover:underline'>Click here</Link>
            </div>
          </div>
        </div>
        )
      )
     }
    </div>
 
  );
};

export default Page;
