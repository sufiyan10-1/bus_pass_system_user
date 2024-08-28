'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { identitySchema } from '@/schemas/identitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
const [isSubmitting, setIsSubmitting] = useState(false);
const [username, setUsername] = useState('')

const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
      //  resolver: zodResolver(identitySchema), // Apply the schema
     })

  
  const getUserDetail = async ()=>{
    try {
      const res = await axios.get('api/me')
      console.log(res.data)
      setUsername(res.data.data.username)
     if(res.mesaaage == "User found"){
       
     }
    
    } catch (error) {
      console.log("error in page",error)
    }
    }
   useEffect(()=>{
     getUserDetail();
 
   }, [])
  

   const onSubmit = async (data)=>{
    console.log(data)
    setIsSubmitting(true)
  const formData = new FormData();
  
  // Append each form field to the FormData object
  formData.append('username', username);
  formData.append('studentName', data.studentName);
  formData.append('studentAddress', data.studentAddress);
  formData.append('studentDOB', data.studentDOB);
  formData.append('nameOfCollegeOrSchool', data.nameOfCollegeOrSchool);
  formData.append('addressOfCollegeOrSchool', data.addressOfCollegeOrSchool);
  formData.append('studClass', data.studClass);
  formData.append('distanceFrom', data.distanceFrom);
  formData.append('distanceTo', data.distanceTo);
  
  // Append files
  formData.append('studentSign', data.studentSign[0]);
  formData.append('studentPhoto', data.studentPhoto[0]); 
  formData.append('aadharCard', data.aadharCard[0]);
  formData.append('bonafied', data.bonafied[0]);
  formData.append('feesRecipt', data.feesRecipt[0]);

  
  try {
    const response = await axios.post('/api/student-detial-for-identity', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
     toast({
      title: "Success !",
      description: response.data.message,   
     })
     router.push('/')
  } catch (error) {
    console.log('Error in detail page', error);
    toast({
      title: "Failed !",
      description: "Error while sending identity Detials",   
      variant: 'destructive',
     })
  }
  
  setIsSubmitting(false)
}  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-lg  p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Identity
          </h1>
          <p className="mb-4">Fill all the fields for your Identification</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' encType='multipart/from-data'>
         <Label htmlFor="studentName"><span className='text-red-600'>*</span> Student Name</Label>
         <Input type="text" {...register("studentName")}/>
         {errors.studentName && (
            <p className="text-red-500 text-sm">{errors.studentName.message}</p>
          )}

         <Label htmlFor="studentAddress"><span className='text-red-600'>*</span> Student Address</Label>
         <Input type="text" {...register("studentAddress")}/>
         {errors.studentAddress && (
            <p className="text-red-500 text-sm">{errors.studentAddress.message}</p>
          )}


         <Label htmlFor="studentDOB"><span className='text-red-600'>*</span> Student Date Of Birth</Label>
         <Input type="date" {...register("studentDOB")}/>
         {errors.studentDOB && (
            <p className="text-red-500 text-sm">{errors.studentDOB.message}</p>
          )}

        
         <Label htmlFor="nameOfCollegeOrSchool"><span className='text-red-600'>*</span> Name Of College/School</Label>
         <Input type="text"  {...register("nameOfCollegeOrSchool")}/> 
         {errors.nameOfCollegeOrSchool && (
            <p className="text-red-500 text-sm">{errors.nameOfCollegeOrSchool.message}</p>
          )}

         
         <Label htmlFor="addressOfCollegeOrSchool"><span className='text-red-600'>*</span> Address Of College/School</Label>
         <Input type="text"  {...register("addressOfCollegeOrSchool")}/>  
         {errors.addressOfCollegeOrSchool && (
            <p className="text-red-500 text-sm">{errors.addressOfCollegeOrSchool.message}</p>
          )}


         <Label htmlFor="class"><span className='text-red-600'>*</span> Class</Label>
         <Input type="text"  {...register("studClass")}/> 
         {errors.studClass && (
            <p className="text-red-500 text-sm">{errors.studClass.message}</p>
          )}


        
         <Label htmlFor="travelDistance"><span className='text-red-600'>*</span> Travel Distance</Label>
         <div className='flex justify-between gap-3'>
         <select
         {...register("distanceFrom")}
          className="w-full flex py-3 border rounded-md"
        >
        <option value="Ardhpur">Ardhpur</option>
        <option value="Hingoli">Busmat</option>
        <option value="kandhar">Kandhar</option>
      </select>


      <select
       {...register("distanceTo")}
           className="w-full flex py-3 border rounded-md"
       >
      
        
        <option value="Nanded">Nanded</option>
        <option value="Hingoli">Hingoli</option>
        

      </select>
        {errors.distanceFrom && (
            <p className="text-red-500 text-sm">{errors.distanceFrom.message}</p>
          )}

        {errors.distanceTo && (
            <p className="text-red-500 text-sm">{errors.distanceTo.message}</p>
          )}


          </div>  
          <p className='text-red-700 text-center font-bold'>* make sure file size mut be 50kb to 150kb</p>
          <Label htmlFor="studentSign"><span className='text-red-600'>*</span> Student Sign</Label>
          <Input type="file" name="studentSign" {...register("studentSign")}/>
          

          <Label htmlFor="studentPhoto"><span className='text-red-600'>*</span> Student Photo</Label>
          <Input type="file" name="studentPhoto" {...register("studentPhoto")}/>
          


          <Label htmlFor="aadharCard"><span className='text-red-600'>*</span> Aadhar Card</Label>
          <Input type="file"  {...register("aadharCard")}/> 
          

          <Label htmlFor="bonafied"><span className='text-red-600'>*</span> Bonafied</Label>
          <Input type="file"  {...register("bonafied")}/>
           


          <Label htmlFor="feesRecipt"><span className='text-red-600'>*</span> Fees Recipt</Label>
          <Input type="file" {...register("feesRecipt")}/>
          


          
            <Button type="submit">
              {isSubmitting?(<Loader2 className="animate-spin">submiting</Loader2>):('Submit')}
            </Button>
          
         </form>
      </div>
    </div>
  )
}

export default page
