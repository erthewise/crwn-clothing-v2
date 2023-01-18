import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { 
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from './checkout.styles';

const Checkout = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quality</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => 
        <CheckoutItem key={item.id} checkoutItem={item} />
      )}
      <Total>{`Total: $${totalAmount}`}</Total>
    </CheckoutContainer>
  )
}

export default Checkout;