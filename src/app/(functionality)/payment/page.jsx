'use client';
import { useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function Payment() {
 const [loading, setLoading] = useState(false);
 const amount = 580; // Set amount to 580

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
   console.error('There was a problem with your axios operation:', error);
  }
 };

 const processPayment = async (e) => {
  e.preventDefault();
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

     const result = await axios.post('/api/verify', data, {
      headers: { 'Content-Type': 'application/json' },
     });

     if (result.data.isOk) alert('Payment succeeded');
     else {
      alert(result.data.message);
     }
    },
    prefill: {
     name: '', // Optional: Pre-fill customer details if needed
     email: '', // Optional: Pre-fill customer details if needed
    },
    method: {
     upi: true,  // Enable UPI payment method
    },
    theme: {
     color: '#23300a3',
    },
   };
   const paymentObject = new Razorpay(options);
   paymentObject.on('payment.failed', function (response) {
    alert(response.error.description);
   });
   paymentObject.open();
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v2/checkout.js"
   />

   <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36">
    <form
     className="flex flex-col gap-6 w-full sm:w-80"
     onSubmit={processPayment}
    >
     <div className="space-y-1">
      <p className="text-lg">Amount to Pay: ₹580</p>
     </div>
     <Button type="submit">Pay ₹580</Button>
    </form>
   </section>
  </>
 );
}

export default Payment;
