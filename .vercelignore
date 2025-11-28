// server.js - Payment Server (ES Modules)
import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Payment server is running',
    timestamp: new Date().toISOString()
  });
});

// Create Payment Intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { paymentMethodId, amount, currency, customerInfo, bookingInfo } = req.body;

    // Validate required fields
    if (!paymentMethodId) {
      return res.status(400).json({ 
        error: 'Missing payment method. Please provide card details.' 
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount. Amount must be greater than 0.' 
      });
    }

    console.log('📝 Creating payment intent:', {
      amount,
      currency: currency || 'php',
      customerName: customerInfo?.name,
      roomNumber: bookingInfo?.roomNumber
    });

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: currency || 'php',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
      metadata: {
        customerName: customerInfo?.name || 'N/A',
        customerEmail: customerInfo?.email || 'N/A',
        customerPhone: customerInfo?.phone || 'N/A',
        bookingId: String(bookingInfo?.id || 'N/A'),
        roomId: String(bookingInfo?.roomId || 'N/A'),
        roomNumber: bookingInfo?.roomNumber || 'N/A',
        rentalTerm: bookingInfo?.rentalTerm || 'N/A',
        tenantId: String(bookingInfo?.tenantId || 'N/A')
      },
      description: `BoardEase Booking - ${bookingInfo?.roomNumber || 'Room Rental'}`
    });

    console.log('✅ Payment Intent created:', {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount
    });

    // Return response based on payment status
    if (paymentIntent.status === 'succeeded') {
      return res.json({
        success: true,
        paymentIntentId: paymentIntent.id,
        requiresAction: false,
        clientSecret: paymentIntent.client_secret,
        status: 'succeeded',
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      });
    } 
    
    if (paymentIntent.status === 'requires_action') {
      return res.json({
        success: false,
        paymentIntentId: paymentIntent.id,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        status: 'requires_action'
      });
    }
    
    // Other statuses
    return res.status(400).json({
      error: `Payment is ${paymentIntent.status}. Please try again.`
    });

  } catch (error) {
    console.error('❌ Stripe error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ 
        error: error.message || 'Your card was declined. Please try another card.'
      });
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Invalid payment request. Please check your details and try again.'
      });
    }
    
    if (error.type === 'StripeAPIError') {
      return res.status(500).json({ 
        error: 'Payment service temporarily unavailable. Please try again in a moment.'
      });
    }
    
    if (error.type === 'StripeConnectionError') {
      return res.status(503).json({ 
        error: 'Network error. Please check your internet connection.'
      });
    }
    
    if (error.type === 'StripeAuthenticationError') {
      return res.status(500).json({ 
        error: 'Payment system configuration error. Please contact support.'
      });
    }
    
    // Generic error
    return res.status(500).json({ 
      error: error.message || 'An unexpected error occurred. Please try again.'
    });
  }
});

// Retrieve payment details
app.get('/payment/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({
      success: true,
      payment: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        created: paymentIntent.created,
        description: paymentIntent.description
      }
    });
  } catch (error) {
    console.error('Error retrieving payment:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve payment details' 
    });
  }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log('⚠️  Webhook secret not configured');
    return res.sendStatus(400);
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log('❌ Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      // Here you can update your database
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('❌ Payment failed:', failedPayment.id);
      // Handle failed payment
      break;
      
    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.url} not found`
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log('=================================');
  console.log('🚀 BoardEase Payment Server');
  console.log('=================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Stripe configured for PHP currency`);
  console.log(`📅 Started at: ${new Date().toLocaleString()}`);
  console.log('=================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  process.exit(0);
});