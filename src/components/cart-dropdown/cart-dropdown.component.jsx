import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { 
  CartDropdownContainer, 
  EmptyMessage, 
  CartItems 
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  
  const goToCheckoutPage = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutPage}>Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;