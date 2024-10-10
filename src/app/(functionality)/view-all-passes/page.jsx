'use client'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';




const PassList = () => {
     
    const [isIdentityAvailable, setIsIdentityAvailable] = useState('Loading')
    const [username, setUsername] = useState('');
    const [passData, setPassData] = useState('');
    const router = useRouter();
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

 //getting identity data 
  useEffect(() => { 
    const fetchData = async () => {
      if(!username) return;
      try {
        const response = await axios.post('/api/view-identity', { username });
         if(!response){
           console.log("identity not found")
         }
         else{
        
         setPassData(response.data.data.monthlyPass)
         setIsIdentityAvailable(response.data.data.status)
   
        } 
      }catch(error){
        console.log(error);
        setIsIdentityAvailable("Identity Not Found")
      }   
      }
    fetchData();
  }, [username]); 
 
console.log(passData)
  const PassBox = ({ paymentId, startDate, endDate, passFees, id}) => {
    return (
      <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        
        <p className="text-gray-600 mb-1">
          <strong>Payment Id:</strong> {paymentId}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Start Date:</strong> {startDate}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>End Date:</strong> {endDate}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Pass Fees:</strong> {passFees}
        </p>
        <button
          className="bg-gray-700 text-white px-4 py-2 mt-4 rounded hover:bg-gray-500 transition-colors duration-300 ease-in-out"
          onClick={(e)=>{e.preventDefault(); router.push(`view-all-passes/${username}/${id}`)}}
        >
          View Pass
        </button>
      </div>
    );
  };

const viewPasses = ()=>{
  if(isIdentityAvailable === "Loading"){
    return ( <div className='flex justify-center mt-56'><Loader2 className='animate-spin w-24 h-24'/></div>)
  }
  else if(isIdentityAvailable==="Accepted"){
  if(passData.length !== 0){
    return(
    <div className="container mx-auto p-6">
    <h1 className='text-3xl text-center pb-10'>All Passes You Created</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {passData.map((pass, index) => (
         <PassBox
           key={index}
           paymentId={pass.paymentId}
           startDate={pass.startDate}
           endDate={pass.endDate}
           passFees={pass.passFees} 
           id={index}
         />
       ))}
     </div>
   </div>
    )
  }
  else{
    return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
          Passes Status
        </h1>
        <div className="text-center text-sm md:text-base">
           <p>There Is No Pass Please Make Pass from <Link href='/detials-for-pass' className='text-blue-800 hover:underline'>From Here</Link> </p>
        </div>
      </div>
    </div>
    )
  }
}
else{
  return(
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
      Passes Status
    </h1>
    <div className="text-center text-sm md:text-base">
       <p>Identity Not Found Check your Identity <Link href='/application-status' className='text-blue-800 hover:underline'>Click here</Link> </p>
    </div>
  </div>
</div>
)
}
}
  

  
  

  return (
   <div>
    {viewPasses()}
   </div>
  );
};

export default PassList;
