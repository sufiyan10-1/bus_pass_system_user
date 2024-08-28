import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions for Payments</h1>
      <p className="text-sm mb-6">Last Updated: [Date]</p>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            These Terms and Conditions ("Terms") govern the payment services provided by [Your Company Name] ("we", "us", or "our") through our website/application. By making a payment through our platform, you ("User" or "you") agree to these Terms. Please read them carefully.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Payment Methods</h2>
          <p>We accept various payment methods, including but not limited to:</p>
          <ul className="list-disc list-inside">
            <li>Credit and Debit Cards</li>
            <li>UPI (Unified Payments Interface)</li>
            <li>Net Banking</li>
            <li>Wallets</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Pricing and Currency</h2>
          <p>
            All payments are processed in Indian Rupees (INR) unless otherwise specified. Prices displayed on our platform include applicable taxes unless stated otherwise.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Order Creation</h2>
          <p>
            When you initiate a payment, an order ID will be created and associated with your transaction. You must retain this order ID for future reference and queries.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">5. Payment Confirmation</h2>
          <p>
            After a successful payment, you will receive a confirmation via email or SMS. This confirmation will include the order ID, payment amount, and other relevant details.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">6. Payment Processing</h2>
          <p>
            Payments are processed through Razorpay, a third-party payment gateway. By making a payment, you agree to Razorpay's terms and conditions. We do not store your payment details, such as card numbers or UPI IDs.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">7. Refunds and Cancellations</h2>
          <p>
            <strong>Refunds:</strong> Refund requests must be submitted within [X] days of the payment date. Refunds will be processed within [Y] working days upon approval.
            <br />
            <strong>Cancellations:</strong> Payments once made cannot be canceled. Please ensure the accuracy of the payment details before proceeding.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">8. Failed Transactions</h2>
          <p>
            In the event of a failed transaction, the amount debited from your account will be automatically refunded to the original payment method within [Z] working days. If the refund is not processed within this period, please contact us at [Support Email].
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">9. Dispute Resolution</h2>
          <p>
            If there is a dispute regarding a payment, you must contact us within [X] days of the transaction date. We will investigate the issue and provide a resolution within [Y] days.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">10. Liability</h2>
          <p>
            We are not responsible for any losses or damages arising from unauthorized or fraudulent transactions. It is your responsibility to ensure the security of your payment information.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">11. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to update or modify these Terms at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to review these Terms periodically.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">12. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts of [City/State].
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please contact us at:
            <br />
            <strong>Email:</strong> [Support Email]
            <br />
            <strong>Phone:</strong> [Support Phone Number]
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
