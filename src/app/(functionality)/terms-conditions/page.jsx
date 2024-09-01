import React from 'react';

const page = () => {
  return (
    <div className="p-6 bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-4">MSRTC Student Bus Pass Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
        <ul className="list-disc list-inside ml-4">
          <li>The user must be a student enrolled in a recognized educational institution and provide valid proof of enrollment to apply for the MSRTC student bus pass.</li>
          <li>The bus pass is non-transferable and is intended solely for the use of the student whose details are provided during the application process.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Payment Process</h2>
        <ul className="list-disc list-inside ml-4">
          <li>The payment process is initiated once the user has successfully filled out the application form and chosen the desired pass type.</li>
          <li>Users can select their preferred bank from the list of available options to make the payment.</li>
          <li>The user must enter a valid phone number linked to their bank account to receive the OTP (One-Time Password) for payment authentication.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. OTP Verification</h2>
        <ul className="list-disc list-inside ml-4">
          <li>The OTP sent to the user’s registered phone number must be entered correctly to proceed with the payment.</li>
          <li>The payment will not be processed if the OTP is incorrect or not entered within the stipulated time.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payment Confirmation</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Upon successful OTP verification and payment, a confirmation message will be displayed on the screen.</li>
          <li>A receipt of the payment and confirmation of the pass application will be sent to the user’s registered email address.</li>
          <li>The payment status can be checked at any time through the user’s account dashboard.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Refund Policy</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Payments once made are generally non-refundable, except in cases of system error, multiple payments for the same transaction, or other valid reasons.</li>
          <li>In the event of an error, users can request a refund by sending an email to our customer care team at [customer care email address].</li>
          <li>The email must include the user’s name, transaction ID, payment date, and a brief description of the issue.</li>
          <li>Refund requests must be made within 24 hours of the payment.</li>
          <li>Once the refund request is received, it will be reviewed by our customer care team.</li>
          <li>If the request is approved, the refund will be processed and credited back to the user’s bank account within 24 hours.</li>
          <li>A confirmation email will be sent to the user once the refund has been successfully processed.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Security</h2>
        <ul className="list-disc list-inside ml-4">
          <li>All payment transactions are encrypted and secured using industry-standard protocols.</li>
          <li>Users are responsible for ensuring that their bank details and phone numbers are correctly entered and that they are not shared with unauthorized individuals.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Disputes</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Any disputes regarding payment should be reported to the MSRTC within 48 hours of the transaction.</li>
          <li>MSRTC reserves the right to investigate and resolve disputes at its discretion.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
        <ul className="list-disc list-inside ml-4">
          <li>MSRTC is not responsible for any loss or damage resulting from unauthorized access to the user’s account or payment details.</li>
          <li>MSRTC will not be liable for any technical issues or interruptions in service that may affect the payment process.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <ul className="list-disc list-inside ml-4">
          <li>These terms and conditions are governed by the laws of the state of Maharashtra. Any disputes arising from these terms will be subject to the jurisdiction of the courts in Maharashtra.</li>
        </ul>
      </section>
    </div>
  );
};

export default page;
