'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
 

const features = [
  { title: "Innovative Technology", description: "Utilizing the latest technology to enhance your travel experience with real-time updates and easy booking.", icon: "/icons/technology.png" },
  { title: "24/7 Customer Support", description: "Our dedicated team is available around the clock to assist you with any queries or concerns.", icon: "/icons/support.png" },
  { title: "Eco-Friendly Solutions", description: "Commitment to sustainability with our eco-friendly buses and practices that reduce our carbon footprint.", icon: "/icons/eco.png" },
  { title: "Comfortable Rides", description: "Enjoy a comfortable journey with our well-maintained buses and amenities.", icon: "/icons/comfort.png" },
];

const HomePage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 bg-slate-100 py-8 rounded-lg">
          {/* Service Cards */}
          {[
            { href: "/studend-detial-for-identity", imgSrc: "/identity-backgroud.png", title: "Create Identity", description: "Easily create your travel identity for personalized services.", buttonText: "Get Started" },
            { href: "/detials-for-pass", imgSrc: "/bus-pass-backgroud.jpg", title: "Bus Pass", description: "Apply for your bus pass quickly and conveniently online.", buttonText: "Apply Now" },
            { href: "/live-tracking", imgSrc: "/live-tracking-backgroud.jpg", title: "Live Tracking", description: "Track your bus in real-time to know exactly when it will arrive.", buttonText: "Track Now" },
            { href: "/bus-timing", imgSrc: "/timing-background.jpg", title: "Bus Timing", description: "Check the bus schedules and plan your journey accordingly.", buttonText: "View Timings" }
          ].map(({ href, imgSrc, title, description, buttonText }, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
              <Image src={imgSrc} alt={title} width={100} height={100} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
              <p className="text-slate-600 mb-4">{description}</p>
              <Link href={href}>
                <Button className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700">
                  {buttonText}
                </Button>
              </Link>
            </div>
          ))}
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
      <footer className="bg-slate-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MSRTC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
