import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Header from './Header';
import Footer from './footer';

// Initialize Stripe - Replace with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

const PaymentForm = ({ userInfo, onShowConfirmation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      if (paymentMethod === 'card') {
        // Handle card payment with Stripe
        const cardElement = elements.getElement(CardElement);
        const { error: stripeError, paymentMethod: pm } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: userInfo.fullName,
            email: userInfo.email,
            phone: userInfo.phoneNumber,
          },
        });

        if (stripeError) {
          setError(stripeError.message);
          setProcessing(false);
          return;
        }

        // Here you would send paymentMethod.id to your backend to create a payment intent
        // For now, we'll simulate success
        console.log('Payment Method created:', pm.id);
        
        // Show confirmation screen instead of directly processing
        onShowConfirmation(pm.id);
      } else {
        // Handle E-Wallet payment (GCash, PayMaya, PayPal)
        // This would typically redirect to the e-wallet provider
        console.log('E-Wallet payment selected:', paymentMethod);
        // Show confirmation screen
        onShowConfirmation('ewallet_' + paymentMethod);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-3">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* E-Wallet Option */}
            <div
              onClick={() => setPaymentMethod('ewallet')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === 'ewallet'
                  ? 'border-white bg-white/10'
                  : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
            >
              <p className="text-white font-semibold mb-3">E-Wallet</p>
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                    GCash
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-blue-300 rounded flex items-center justify-center text-blue-900 font-bold text-xs">
                    PayMaya
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
                    PayPal
                  </div>
                </div>
              </div>
            </div>

            {/* Card Option */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === 'card'
                  ? 'border-white bg-white/10'
                  : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
            >
              <p className="text-white font-semibold mb-3">Card</p>
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[8px]">
                    AMEX
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="w-12 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-[8px]">
                    MC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Element (only shown when card is selected) */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Card Details
            </label>
            <CardElement options={cardElementOptions} />
          </div>
        )}

        {/* E-Wallet Selection (only shown when e-wallet is selected) */}
        {paymentMethod === 'ewallet' && (
          <div className="space-y-3">
            <label className="block text-white font-semibold mb-2">
              Select E-Wallet
            </label>
            <select className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="gcash">GCash</option>
              <option value="paymaya">PayMaya</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        )}
      </div>

      {/* User Information Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Full name</label>
          <input
            type="text"
            value={userInfo.fullName}
            readOnly
            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            value={userInfo.email}
            readOnly
            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            value={userInfo.phoneNumber}
            readOnly
            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Pay Now Button */}
      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full bg-white text-[#061A25] font-semibold py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

// Payment Successful Component
const PaymentSuccessful = ({ onTrackBooking }) => {
  return (
    <div className="text-center text-white">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <div className="w-32 h-32 rounded-full bg-white border-2 border-gray-300 flex flex-col items-center justify-center p-4">
          <div className="text-xs font-bold text-black mb-1">BoardEase</div>
          <svg
            className="w-12 h-12 text-black mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </div>

      {/* Payment Successful Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
        PAYMENT SUCCESSFUL
      </h1>

      {/* Instruction Text */}
      <p className="text-gray-300 text-sm sm:text-base mb-4">
        CLICK THE BUTTON TO SEE BOOKINGS
      </p>

      {/* Downward Arrow */}
      <div className="mb-8 flex justify-center">
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Track Booking Button */}
      <button
        onClick={onTrackBooking}
        className="bg-white text-[#061A25] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Track Booking
      </button>
    </div>
  );
};

// Booking Confirmation Component
const BookingConfirmation = ({ onConfirmPayment }) => {
  return (
    <div className="text-center text-white">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <div className="w-32 h-32 rounded-full bg-white border-2 border-gray-300 flex flex-col items-center justify-center p-4">
          <div className="text-xs font-bold text-black mb-1">BoardEase</div>
          <svg
            className="w-12 h-12 text-black mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </div>

      {/* Booking Confirmation Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
        BOOKING CONFIRMATION
      </h1>

      {/* Instruction Text */}
      <p className="text-gray-300 text-sm sm:text-base mb-4">
        CLICK THE BUTTON TO CONFIRM PAYMENT
      </p>

      {/* Downward Arrow */}
      <div className="mb-8 flex justify-center">
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Payment Confirm Button */}
      <button
        onClick={onConfirmPayment}
        className="bg-[#061A25] hover:bg-[#0a2535] text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-white/20"
      >
        Payment Confirm
      </button>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking/room data from location state or use defaults
  const [userInfo, setUserInfo] = useState({
    fullName: location.state?.fullName || 'Allyn Dumapias',
    email: location.state?.email || 'Admin@gmail.com',
    phoneNumber: location.state?.phoneNumber || '0955522001100',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  const handleShowConfirmation = (id) => {
    setPaymentId(id);
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    // Process the actual payment confirmation
    setShowConfirmation(false);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show payment successful screen
    setPaymentSuccess(true);
  };

  const handleTrackBooking = () => {
    // Navigate to bookings page
    navigate('/profile#my-bookings', {
      state: { paymentSuccess: true, paymentId }
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-[#061A25] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-white/10">
            {paymentSuccess ? (
              <PaymentSuccessful onTrackBooking={handleTrackBooking} />
            ) : showConfirmation ? (
              <BookingConfirmation onConfirmPayment={handleConfirmPayment} />
            ) : (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  userInfo={userInfo}
                  onShowConfirmation={handleShowConfirmation}
                />
              </Elements>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Payment;

