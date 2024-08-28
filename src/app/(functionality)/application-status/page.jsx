'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [status, setStatus] = useState('Loading...');
  const [username, setUsername] = useState('');

  // Fetching the current user if available
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

  useEffect(() => {
    getUserDetail();
  }, []);

  // Fetching the application status once userId is set
  useEffect(() => {
    if (!username) return; // Don't fetch if userId is not available

    const fetchStatus = async () => {
      try {
        const response = await axios.post('/api/application-status', { username });
        console.log(response.data);
        setStatus(response.data.message);

        if (!response.data.success) {
          toast({
            title: "Failed!",
            description: response.data.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: "Success!",
            description: response.data.message,
          });
        }
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
    switch (status.toLowerCase()) {
      case 'Pending':
        return<div> <p className="text-yellow-500">Your application is currently pending. Please check back later.</p><Link href='/view-identity'><Button>View Identity</Button></Link></div>;
      case 'Accepted':
        return <p className="text-green-500">Congratulations! Your application has been approved.</p>;
      case 'loading...':
        return <p className="text-gray-500">Loading your application status...</p>;
      default:
        return <p className="text-red-500">{status}</p>;
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
