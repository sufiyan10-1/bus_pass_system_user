'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [identityData, setIdentityData] = useState({});
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();


  // Fetch current user details
  useEffect(() => {
  const getUserDetail = async () => {
    try {
      const res = await axios.get('/api/me');
      setUsername(res.data.data.username);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  // Fetch identity data based on the username

    getUserDetail();
  }, []);

  useEffect(() => {
    const accessDistance = async () => {
      try {
        const response = await axios.post('/api/view-identity', { username });
        setIdentityData(response.data.data);
      } catch (error) {
        console.log("Error fetching identity data:", error);
      }
    };
    if (username) {
      accessDistance();
    }
  }, [username]);
 
  let amount = 0;
  if (identityData.distanceFrom === "Ardhpur" && identityData.distanceTo === "Nanded" || identityData.distanceFrom === "Nanded" && identityData.distanceTo === "Ardhapur") {
    amount = 580;
  }
  if (identityData.distanceFrom === "Kandhar" && identityData.distanceTo === "Nanded" || identityData.distanceFrom === "Nanded" && identityData.distanceTo === "Kandhar") {
    amount = 1080;
  }
  if (identityData.distanceFrom === "Busmat" && identityData.distanceTo === "Nanded" || identityData.distanceFrom === "Nanded" && identityData.distanceTo === "Busmat") {
    amount = 880;
  }
  if (identityData.distanceFrom === "Ardhpur" && identityData.distanceTo === "Hingoli" || identityData.distanceFrom === "Hingoli" && identityData.distanceTo === "Ardhapur") {
    amount = 1160;
  }
  if (identityData.distanceFrom === "Kandhar" && identityData.distanceTo === "Hingoli" || identityData.distanceFrom === "Hingoli" && identityData.distanceTo === "Kandhar") {
    amount = 2050;
  }
  if (identityData.distanceFrom === "Busmat" && identityData.distanceTo === "Hingoli" && identityData.distanceFrom === "Hingoli" && identityData.distanceTo === "Busmat") {
    amount = 1280;
  }


 


 
  // Create Razorpay order ID
  const createOrderId = async () => {
    try {
      const response = await axios.post('/api/order', {
        amount: amount * 100, // Convert to paise
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data.orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Order creation failed');
    }
  };
 
  // Process payment with Razorpay
  const processPayment = async (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      const orderId = await createOrderId();
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Your Product Description',
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const result = await axios.post('/api/verify-payment', data, {
              headers: { 'Content-Type': 'application/json' },
            });
           
            if (result.data.isOk) {
              alert('Payment succeeded');
            
              const response = await axios.post('api/store-data-of-payment', {username, paymentId: orderId});
              console.log(response)
              if(response.data){
                toast({
                  title: "Success",
                  description: "Pass genrated Successfull view your Pass",
                })
                router.push('/view-pass')
              }
              else{
              toast({
                title: "Faild",
                description: "Pass genration Faild due abnormal Problem",
              })
            }
            } else {
              alert(result.data.message);
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: '', // Optional: Pre-fill customer details if needed
          email: '', // Optional: Pre-fill customer details if needed
        },
        method: {
          upi: true, // Enable UPI payment method
        },
        theme: {
          color: '#23300a3',
        },
      };
      const paymentObject = new Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTermsChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v2/checkout.js"
      />

      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Payment Details</h1>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">From:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {identityData.distanceFrom || 'Loading...'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">To:</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                {identityData.distanceTo || 'Loading...'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
            <div className="mt-2 p-3 bg-gray-100 border border-gray-300 rounded-md text-lg font-bold text-center">
              ₹{amount}
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input
              id="termsCondition"
              type="checkbox"
              className="mr-3 w-6 h-6"
              onChange={handleTermsChange}
            />
            <label htmlFor="termsCondition" className="text-sm text-gray-700">
              I agree to the <a href="/terms-conditions" className="text-blue-500 hover:underline">terms and conditions</a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800"
            onClick={processPayment}
            disabled={!isTermsAccepted || loading}
          >
            {loading ? 'Processing...' : `Pay ₹${amount}`}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
