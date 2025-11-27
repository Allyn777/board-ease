// payment.jsx - UPDATED handleSubmit function
// Replace lines 67-85 with this:

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!stripe || !elements) {
    setError('Stripe has not loaded yet. Please wait.');
    return;
  }

  setProcessing(true);
  setError(null);
  setDebugInfo('Step 1: Creating payment method...');

  try {
    const cardElement = elements.getElement(CardElement);
    
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
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
      setDebugInfo('❌ Failed at creating payment method');
      setProcessing(false);
      return;
    }

    setDebugInfo('Step 2: Contacting payment server...');

    const requestData = {
      paymentMethodId: paymentMethod.id,
      amount: bookingData?.amount || 5000,
      currency: 'php',
      customerInfo: {
        name: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phoneNumber,
      },
      bookingInfo: bookingData,
    };

    // ✅ CHANGED: Use Vercel serverless function instead of localhost
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || 'Server error';
      } catch {
        errorMessage = `Server error (${response.status})`;
      }
      
      setError(errorMessage);
      setDebugInfo(`❌ Server error: ${errorMessage}`);
      setProcessing(false);
      return;
    }

    setDebugInfo('Step 3: Processing response...');
    const paymentResult = await response.json();

    if (paymentResult.error) {
      setError(paymentResult.error);
      setDebugInfo('❌ Payment failed: ' + paymentResult.error);
      setProcessing(false);
      return;
    }

    if (paymentResult.requiresAction) {
      setDebugInfo('Step 4: Completing 3D Secure authentication...');
      
      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentResult.clientSecret
      );

      if (confirmError) {
        setError(confirmError.message);
        setDebugInfo('❌ 3D Secure failed');
        setProcessing(false);
        return;
      }
    }

    setDebugInfo('✅ Payment successful!');
    onShowConfirmation(paymentResult.paymentIntentId, paymentResult);
    
  } catch (err) {
    const errorMessage = err.message || 'An unexpected error occurred';
    setError(errorMessage);
    setDebugInfo(`❌ Error: ${errorMessage}`);
    onError(errorMessage);
  } finally {
    setProcessing(false);
  }
};