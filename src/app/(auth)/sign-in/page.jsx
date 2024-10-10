'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import axios from 'axios';



function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  //Toggle password function
  const [passwordType, changePasswordType] = useState('password'); 
  const [passwordIcon, changePasswordIcon] = useState('ri-eye-off-line')

 const togglePassword = () => {
const isPassword = passwordType == 'password';
changePasswordType(isPassword ? 'text' : 'password');
changePasswordIcon(isPassword ? 'ri-eye-line' : 'ri-eye-off-line');
};

  
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/sign-in', data);
      setIsSubmitting(false);

      if (response.status === 200) {
        toast({
          title: 'Successful Login',
          description: "User has successfully logged in to their account.",
        });
        router.replace('/');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: 'An Error Occurred',
        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign In
          </h1>
          <p className="mb-4">Sign In to start our services</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label htmlFor="identifier">
            Phone Number <span className="text-red-500">or</span> Username
          </Label>
          <Input type="text" {...register('identifier')} />

          <div className='relative'>
          <Input type={passwordType} {...register('password')} />
          <i className={`${passwordIcon}  absolute top-1/2 right-2.5 -translate-y-1/2 text-xl cursor-pointer`} onClick={togglePassword}></i>
          </div>




          <div className="flex items-center justify-between">
            <p>
              Are you a new user?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                Sign Up
              </Link>
            </p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
