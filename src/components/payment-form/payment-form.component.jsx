import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles.jsx";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const goToOrderConfirmationPage = () => {
    navigate('/order_success')
  }

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: cartAmount * 100 })
    }).then(res => res.json());

    // const clientSecret = response.paymentIntent.client_secret
    const { paymentIntent: { client_secret } } = response; 

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        navigate('/order_success');
      }
    }
  }

  return(
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Payment Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;