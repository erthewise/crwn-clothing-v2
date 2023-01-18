import { useDispatch } from 'react-redux';

import { removeItem, addItemToCart, clearItemFromCart  } from '../../store/cart/cartSlice';
import { 
  CheckoutItemContainer, 
  ImageContainer, 
  Arrow,
  RemoveButton 
} from './checkout-item.styles';

const CheckoutItem = ({checkoutItem}) => {
  const dispatch = useDispatch();
  const { imageUrl, name, quantity, price } = checkoutItem;

  const removeItemHandler = () => dispatch(removeItem(checkoutItem));
  const addItemHandler = () => dispatch(addItemToCart(checkoutItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(checkoutItem));
  
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={`${imageUrl}`} alt={`${name}`}/>
      </ImageContainer>
      <span className="name">{name}</span>
      <span className="quantity">
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <span className="value">{quantity}</span>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </span>
      <span className="price">{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;