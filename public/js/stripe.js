/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51L05aBSFSSEEOcmgbfd2HjkslvA06gAP7bP5Da0rM2Rim1Q1JStCmcZ6MTeYK00aZId0aXi6sZoqNpfMo6z2QF3j00fve6spWN'
);

export const bookTour = async (tourId) => {
  try {
    // 1> Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.table(session);
    // 2> Create checkout form + Charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.error(error);
    showAlert('success', error);
  }
};
