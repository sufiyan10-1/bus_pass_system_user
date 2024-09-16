'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useLocalStorage } from 'usehooks-ts';

const features = [
  { title: "Online Bus Pass Application", description: "Users can easily apply for bus passes by filling out forms online.", icon: "/icons/technology.png" },
  { title: "Digital Bus Pass Generation", description: "Passes are generated in digital format with a QR code that can be scanned for verification on buses.", icon: "/icons/comfort.png" },
  { title: "Multiple Payment Options", description: "Users can pay for bus passes via various payment methods such as UPI, net banking, etc", icon: "/icons/technology.png" },
  { title: "Pass Usage History", description: "Users can view detailed records of their bus pass usage, including trip history.", icon: "/icons/support.png" },
  { title: "reducing the need for physical cards.", description: "User reducing the need to carry physical cards they can show pass using mobile phone.", icon: "/icons/eco.png" },
  
];

const HomePage = () => {
  const router = useRouter();
  const [isUserPresent, setIsUserPresent] = useState(false);
  const [isIdentityAvalible, setIsIdentityAvalible] = useState('')
  const [username, setUsername] = useState('');

  //getting current user
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const res = await axios.get('api/me');
        

        if (res.data.message === 'User found') {
          setIsUserPresent(true);
          setUsername(res.data.data.username)
        }
      } catch (error) {
        console.log("error in page", error);
      }
    };

    getUserDetail();
  }, []); 
 

  useEffect( ()=>{
    const getIdentity = async() =>{
      
    try {
      const response = await axios.post('/api/application-status', { username });
      console.log(response)
      if(response.data.message){
        setIsIdentityAvalible(response.data.message)
      }else{
        setIsIdentityAvalible('')
      }
 
    } catch (error) {
      console.error("Error fetching status", error);
      toast({
        title: "Error!",
        description: "Failed to fetch application status.",
        variant: 'destructive'
      });
    }
  }
 getIdentity();
  },[username])
    
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* Main Content */}
      <main className="pt-16 container mx-auto py-8 px-4">
        {/* Hero Section */}
        <section className="bg-white text-slate-800 px-4 py-24 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-10 -z-10 animate-pulse" />
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight transition-transform transform hover:scale-105 hover:text-gray-900">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-green-300 opacity-20 rounded-lg animate-pulse"></span>
                Discover the Best of MSRTC
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 opacity-90 transition-opacity duration-300 hover:opacity-100">
              Experience the ultimate comfort and convenience in travel with our comprehensive services.
            </p>
            <Link href="/sign-up">
              <Button className="bg-black text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:brightness-125">
                Get Started <ChevronRight />
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex justify-around  w-full gap-8 mt-12 bg-slate-100 py-8 rounded-lg">
           
          <div   className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
              <Image src="/identity-backgroud.png" alt="studend-detial-for-identity" width={100} height={100} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Create Identity</h3>
              <p className="text-slate-600 mb-4">Easily create your travel identity for personalized services.</p>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  isUserPresent ? (isIdentityAvalible==='No Application Found'?router.push('/studend-detial-for-identity') :router.push('/view-identity')) : router.push('sign-in');
                }}
                className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
              >
                Get Started
              </Button>
            </div>

            <div   className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
              <Image src="/bus-pass-backgroud.jpg" alt="Bus Pass" width={100} height={100} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Bus Pass</h3>
              <p className="text-slate-600 mb-4">Apply for your bus pass quickly and conveniently online.</p>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  isUserPresent ?(isIdentityAvalible==='Accepted'? router.push('/pass-payment'): router.push('/application-status') ): router.push('sign-in');
                }}
                className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
              >
                Apply Now
              </Button>
            </div>
        </section>

        {/* Unique Features Section */}
        <section className="mt-12 bg-white py-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-12 text-black">Why Choose Our Bus Services?</h2>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="absolute border-l-4 border-gray-300 h-full top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="flex flex-col gap-12">
              {features.map((feature, index) => (
                <Link key={index} href={`/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex items-start relative group">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="ml-6 bg-white shadow-xl rounded-lg p-8 w-full transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
                      <h3 className="text-2xl font-semibold text-black">{feature.title}</h3>
                      <p className="mt-4 text-gray-800">{feature.description}</p>
                      <div className="absolute top-0 left-0 bg-blue-500 text-white rounded-lg p-2 transform -translate-x-full group-hover:translate-x-0 transition-transform">
                        Learn More
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-5 text-center text-sm">
        <div className="flex flex-col sm:flex-row justify-around flex-wrap mb-4">
          <div className="m-2">
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Home</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">About Us</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Contact Us</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">FAQs</a>
          </div>
          <div className="m-2">
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">E-Pass Application</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Tracking System</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Document Upload</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">E-Pass Validity</a>
          </div>
          <div className="m-2">
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Terms of Service</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">User Guide</a>
            <a href="#" className="text-white no-underline block my-1 px-1 py-1 transition-colors duration-300 hover:text-blue-400">Support</a>
          </div>
        </div>

        <div className="mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2 text-lg no-underline transition-colors duration-300 hover:text-blue-400 p-1 rounded-full">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        <div className="border-t border-white pt-2 text-xs mt-4">
          © 2024 Government Bus E-Pass Generation. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
