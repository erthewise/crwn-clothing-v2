import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <span>Product</span>
      <span>Description</span>
      <span>Quality</span>
      <span>Price</span>
      <span>Remove</span>

      <div>
        {cartItems.map((item) => 
          <CheckoutItem key={item.id} checkoutItem={item} />
        )}
      </div>
    </div>
  )
}

export default Checkout;