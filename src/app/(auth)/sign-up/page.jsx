'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import { Label } from '@/components/ui/label';
 

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema), // Apply the schema
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
         
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Sign up
      const response = await axios.post('/api/sign-up', data);
    
      if (response) {
       const login = await axios.post('api/sign-in',{identifier: data.username, password: data.password})
       if(login){
        toast({
          title: 'Success',
          description: response.data.message,
        });
       }
      }
      setIsSubmitting(false);
      router.push('/');
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error;
      let errorMessage =
        axiosError.response?.data.message ??
        'There was a problem with your sign-up. Please try again.';

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign Up
          </h1>
          <p className="mb-4">Sign up to start our services</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            {...register('username')}
            onChange={(e) => debounced(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
          <div>
            {isCheckingUsername && <Loader2 className="animate-spin" />}
            {!isCheckingUsername && usernameMessage && (
              <p
                className={`text-sm ${
                  usernameMessage === 'Username is unique'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input type="number" {...register('phoneNo')} />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
          )}
          <Label htmlFor="password">Password</Label>
          <Input type="password" {...register('password')} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="flex items-center justify-between">
            <p>
              Already a member?{' '}
              <Link
                href="/sign-in"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
            <Button type="submit">
              {isSubmitting ? (
                <Loader2 className="animate-spin">Submitting</Loader2>
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
