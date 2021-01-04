import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51I5R1uL3C1EaPYFCjD7vp5PQLu750rMqUctEl8AJVLAgrUZfRx7fhnCOVoaDEIkvoIHAWYfjfIlXauKfC9XysAe000yKnf6veL'
  );
  try {
    //1) get checkout session from API
    const session = (
      await axios(
        `${window.location.origin}/api/v1/bookings/checkout-session/${tourId}`
      )
    ).data.session;
    console.log(session);

    // 2) use stripe object to create checkout form + charge credit card for us
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (err) {
    showAlert(
      'error',
      'There was an error processing your order. Please contact support'
    );
  }
};
