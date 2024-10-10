'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
const Page = () => {
  const [status, setStatus] = useState('Loading...');
  const [username, setUsername] = useState('');

  // Fetching the current user if available
  useEffect(() => {
  const getUserDetail = async () => {
    try {
      const res = await axios.get('/api/me');
      console.log(res.data);
      setUsername(res.data.data.username);
    } catch (error) {
      console.error("Error fetching user details", error);
      toast({
        title: "Error!",
        description: "Failed to fetch user details.",
        variant: 'destructive'
      });
    }
  };

    getUserDetail();
  }, []);

  // Fetching the application status once userId is set
  useEffect(() => {
    if (!username) return; // Don't fetch if userId is not available

    const fetchStatus = async () => {
      try {
        const response = await axios.post('/api/application-status', { username });
        setStatus(response.data.message);

      } catch (error) {
        console.error("Error fetching status", error);
        setStatus('Error fetching status');
        toast({
          title: "Error!",
          description: "Failed to fetch application status.",
          variant: 'destructive'
        });
      }
    };

    fetchStatus();
  }, [username]); // Depend on userId

  const renderStatusMessage = () => {
    if(status === 'Pending'){
      return <p className="text-orange-500">Your application is currently pending. It will approved within 24 hours</p>;
    }
      else if (status === 'Accepted') {
      return <p className="text-green-500">Congratulations! Your application has been approved.</p>;
    } else if (status === 'Loading...') {
      return  <div className='flex justify-center'><Loader2 className='animate-spin'/></div> 
    } else {
      return (
        <p
          className="text-red-500"
          dangerouslySetInnerHTML={{ __html: status }}
        ></p>
      );
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
          Application Status
        </h1>
        <div className="text-center text-sm md:text-base">
          {renderStatusMessage()}
        </div>
      </div>
    </div>
  );
};

export default Page;
