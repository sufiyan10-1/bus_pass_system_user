'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const IdentitySearchPage = () => {
  const [identityDetails, setIdentityDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();
  // Get user details
  const getUserDetail = async () => {
    try {
      const res = await axios.get('/api/me');
      setUsername(res.data.data.username);
    } catch (error) {
      console.log("Error in page", error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const IdNumber = Number(data.IdNumber); // Convert IdNumber to a number format
      // Send data as JSON object
      const response = await axios.post('/api/detials-for-pass', { IdNumber, username });

      setIdentityDetails(response.data.message);
      setLoading(false);
       
    } catch (error) {
      console.error("Error during submission:", error.response ? error.response.data : error.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Identity Search
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
            <input
              type="number"
              id="id"
              {...register('IdNumber', { required: true })}
              className="w-full px-4 py-2 border-0 focus:ring-0 focus:border-0 rounded-l-md"
              placeholder="Enter ID number"
            />
        
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors duration-300"
            >
              Search
            </button>
           
          </div>
          {errors.IdNumber && <p className="text-red-500 text-sm mt-2">ID number is required.</p>}
        </form>
        {loading && <p className="text-center text-gray-500">Searching...</p>}
      
        {identityDetails ? (
          <div className="bg-gray-50 p-4 rounded-md shadow-inner mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Identity Details</h2>
            <p><strong>Identity Number:</strong> {identityDetails.IdNumber}</p>
            <p><strong>Student Name:</strong> {identityDetails.studentName}</p>
            <p><strong>Student Address:</strong> {identityDetails.studentAddress}</p>
            <p><strong>School or College Name:</strong> {identityDetails.nameOfCollegeOrSchool}</p>
            <p className='text-right mt-4'><Button 
            onClick={(e)=>{e.preventDefault(); router.push('/pass-payment')}}>Next <ChevronRight/></Button></p> 
          </div>
        ):  <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default IdentitySearchPage;
