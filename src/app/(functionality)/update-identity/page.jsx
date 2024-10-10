'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import passTravelingData from '@/pass-traveling-data.json';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';



const Page = () => {
  const [identityData, setIdentityData] = useState({});
  const [username, setUsername] = useState('');
  const [isIdentityPresent, setIsIdentityPresent] = useState('loading');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [distanceFromNames, setDistanceFromNames] = useState([]);
  const [distanceToNames, setDistanceToNames] = useState([]);
  const router= useRouter();

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

  // Fetching details of identity if the user is present
  useEffect(() => {
    if (username) {
      const findIdentityData = async () => {
        try {
          const res = await axios.post('/api/view-identity', { username });
          setIdentityData(res.data.data);
          setIsIdentityPresent(res.data.data ? 'present' : 'not present');
        } catch (error) {
          console.error("Error fetching identity details", error);
          setIsIdentityPresent('not present');
        }
      };

      findIdentityData();
    }
  }, [username]);

  //default values of identity
  const { register, handleSubmit, reset, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      studentName: '',
      studentAddress: '',
      studClass: '',
      studentDOB: '',
      nameOfCollegeOrSchool: '',
      studentAddress: '',
      distanceFrom: '',
      distanceTo: '',
      studentSign: '',
      studentPhoto: '',
      aadharCard: '',
      bonafied: '',
      feesRecipt: '',
    },
  });

  // Update form values once identityData is fetched
  useEffect(() => {
    if (identityData && Object.keys(identityData).length > 0) {
      reset({
        studentName: identityData.studentName || '',
        studentAddress: identityData.studentAddress || '',
        studClass: identityData.studClass || '',
        studentDOB: identityData.studentDOB || '',
        nameOfCollegeOrSchool: identityData.nameOfCollegeOrSchool || '',
        addressOfCollegeOrSchool: identityData.addressOfCollegeOrSchool || '',
        distanceFrom: identityData.distanceFrom || '',
        distanceTo: identityData.distanceTo || '',
        studentSign: identityData.studentSign || '',
        studentPhoto: identityData.studentPhoto || '',
        aadharCard: identityData.aadharCard || '',
        bonafied: identityData.bonafied || '',
        feesRecipt: identityData.feesRecipt || '',
      });
    }
  }, [identityData, reset]);

  //distance from to name render from JSON file
  useEffect(() => {
    setDistanceFromNames(Object.keys(passTravelingData));
  }, []);

  const DocumentUpload = ({ label, imageUrl, setValue, name, altText }) => {
    const [image, setImage] = useState(imageUrl);
  
    const handleImageUpload = (file) => {
      // Create a URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);  // Display the image preview
      setValue(name, file); // Store the file in form data (to be uploaded)
    };
  
    return (
      <div className="flex flex-row py-7 justify-between items-center">
        <dt className="text-sm font-bold leading-6 text-gray-900">{label}</dt>
        {image && (
          <img src={image} className="w-1/2 h-full" alt={altText} />
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(`${name}-fileInput`).click();
          }}
        >
          <Pencil />
        </button>
        <input
          id={`${name}-fileInput`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
      </div>
    );
  };
  


  const onSubmit = async (data) => {
    setIsSubmiting(true)
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
  // Append files conditionally only if they exist
if (data.studentSign instanceof File) formData.append('studentSign', data.studentSign);
if (data.studentPhoto instanceof File) formData.append('studentPhoto', data.studentPhoto);
if (data.aadharCard instanceof File) formData.append('aadharCard', data.aadharCard);
if (data.bonafied instanceof File) formData.append('bonafied', data.bonafied);
if (data.feesRecipt instanceof File) formData.append('feesRecipt', data.feesRecipt);

    
    try {
      const response = await axios.post('/api/update-identity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Success!',
        description: "identity Update Successfully!",
      });
      router.push('/');
    } catch (error) {
      console.log('Error in update of identity', error);
      toast({
        title: 'Failed!',
        description: 'Error while sending identity details: ' + error.message,
        variant: 'destructive',
      });
    }
     
    setIsSubmiting(false)
  };

  const controlOfJsx = () => {
    if (isIdentityPresent === 'present') {
      return (
        <div>
        {isSubmiting? <div className='bg-white flex justify-center items-center h-screen'><Loader2 className="animate-spin h-20 w-20" /></div>:
          
          <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-32 my-7'>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-xl font-semibold leading-7 text-gray-900">Applicant Information</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Your Personal details and Documents</p>
          </div>

          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Student Name */}
              <div className="flex flex-row py-7 justify-between items-center">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">Student Name</dt>
                <Input
                  className="w-full"
                  id="studentName"
                  type="text"
                  {...register('studentName')} // Register the input    
                />
              </div>

              <div className="flex flex-row py-7 justify-between items-center">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">Student Address</dt>
                <Input
                  className="w-full"
                  id="studentAddress"
                  type="text"
                  {...register('studentAddress')} // Register the input    
                />
              </div>

              <div className=" flex flex-row py-7 justify-between">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">Student Class</dt>
                <Input
                  className="w-full"
                  id="studClass"
                  type="text"
                  {...register('studClass')} // Register the input    
                />
              </div>

              <div className=" flex flex-row py-7 justify-between">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">Student Date of Birth</dt>
                <Input
                  className="w-full"
                  id="studentDOB"
                  type="date"
                  {...register('studentDOB')}
                />
              </div>

              {/* College Name */}
              <div className=" flex flex-row py-7 justify-between">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">College or School Name</dt>
                <Input
                  className="w-full"
                  id="nameOfCollegeOrSchool"
                  type="text"
                  {...register('nameOfCollegeOrSchool')} // Register the input    
                />
              </div>

              <div className=" flex flex-row py-7 justify-between">
                <dt className="w-1/4 text-sm font-bold leading-6 text-gray-900">Address of College or School</dt>
                <Input
                  className="w-full"
                  id="addressOfCollegeOrSchool"
                  type="text"
                  {...register('addressOfCollegeOrSchool')} // Register the input    
                />
              </div>

              {/* Distance */}
              <div className="flex flex-row py-7 justify-between">
                <dt className="text-sm font-bold leading-6 text-gray-900">Distance</dt>
                <div className='flex gap-10'>
                  <span className='font-bold mx-4'>From:</span>
                  <select
                    {...register('distanceFrom')}
                    className="w-full flex py-3 border rounded-md"
                    onChange={(e) => {
                      const selectedValue = e.target.value; // Get the selected value
                      const data = passTravelingData[selectedValue]; // Use selectedValue instead of value
                      setDistanceToNames(data);
                    }}
                  >
                    {distanceFromNames.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <span className='font-bold mx-4'>To:</span>
                  <select
                    {...register('distanceTo')}
                    className="w-full flex py-3 border rounded-md"
                  >
                    <option value='' disabled>--Select To--</option>
                    {distanceToNames.map(name => (
                      <option key={name.to} value={name.to}>{name.to}</option>
                    ))}
                  </select>
                </div>
              </div>

               
               <DocumentUpload
                label="Student Sign"
                imageUrl={identityData.studentSign || ''}
                setValue={setValue} // Pass setValue here
                name="studentSign"
                altText="Student Sign"
              />
              <DocumentUpload
                label="Student Photo"
                imageUrl={identityData.studentPhoto || ''}
                control={control}
                setValue={setValue}
                name="studentPhoto"
                altText="Student Photo"
              />
              <DocumentUpload
                label="Aadhar Card"
                imageUrl={identityData.aadharCard || ''}
                control={control}
                setValue={setValue}
                name="aadharCard"
                altText="Aadhar Card"
              />
              <DocumentUpload
                label="Bonafide"
                imageUrl={identityData.bonafied || ''}
                control={control}
                setValue={setValue}
                name="bonafied"
                altText="Bonafide"
              />
              <DocumentUpload
                label="Fees Receipt"
                imageUrl={identityData.feesRecipt || ''}
                control={control}
                setValue={setValue}
                name="feesRecipt"
                altText="Fees Receipt"
              />
            </dl>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="mt-4 py-2 px-24 bg-black text-white rounded-lg">
              Submit
            </button>
          </div>

        </div>
      </form>}
      </div>  
      );
      
    } else if (isIdentityPresent === 'not present') {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center mb-6">
              Update Identity
            </h1>
            <div className="text-center text-sm md:text-base">
              <p className="text-orange-500">Identity cannot be updated. Check status <Link href="/application-status" className='text-blue-600 underline'>click here</Link></p>
            </div>
          </div>
        </div>
      );
    } else if (isIdentityPresent === 'loading') {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin h-20 w-20" />
        </div>
      );
    }
  };

  return (
    <>
      {controlOfJsx()}
    </>
  );
};

export default Page;
