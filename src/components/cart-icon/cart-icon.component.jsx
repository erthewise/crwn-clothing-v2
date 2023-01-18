import { useDispatch, useSelector } from "react-redux";

import { toggleIsCartOpen } from '../../store/cart/cartSlice';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const { cartTotalItems, isCartOpen } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  
  const toggleCart = () => dispatch(toggleIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartTotalItems}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;